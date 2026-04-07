"""
Configurable training / inference entrypoint for ECG segmentation experiments.
Wire your dataset loaders and label maps here.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import torch
import torch.nn as nn
from torch.utils.data import DataLoader, Dataset

from model import EcgSegNetLSTM


class DummyEcgDataset(Dataset):
    """Placeholder tensors for smoke-testing the training loop."""

    def __init__(self, n: int = 64, length: int = 1024, num_classes: int = 4) -> None:
        self.n = n
        self.length = length
        self.num_classes = num_classes

    def __len__(self) -> int:
        return self.n

    def __getitem__(self, idx: int) -> tuple[torch.Tensor, torch.Tensor]:
        x = torch.randn(1, self.length)
        y = torch.randint(0, self.num_classes, (self.length,))
        return x, y


def train_one_epoch(
    model: nn.Module,
    loader: DataLoader,
    device: torch.device,
    optimizer: torch.optim.Optimizer,
    criterion: nn.Module,
) -> float:
    model.train()
    total = 0.0
    for x, y in loader:
        x = x.to(device)
        y = y.to(device)
        optimizer.zero_grad(set_to_none=True)
        logits = model(x)
        loss = criterion(logits, y)
        loss.backward()
        optimizer.step()
        total += float(loss.detach().cpu())
    return total / max(1, len(loader))


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--epochs", type=int, default=2)
    p.add_argument("--batch", type=int, default=8)
    p.add_argument("--lr", type=float, default=1e-3)
    p.add_argument("--out", type=Path, default=Path("runs/default"))
    args = p.parse_args()

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    ds = DummyEcgDataset()
    loader = DataLoader(ds, batch_size=args.batch, shuffle=True)
    model = EcgSegNetLSTM(num_classes=4).to(device)
    opt = torch.optim.AdamW(model.parameters(), lr=args.lr)
    crit = nn.CrossEntropyLoss()

    args.out.mkdir(parents=True, exist_ok=True)
    metrics: list[dict[str, float]] = []
    for epoch in range(args.epochs):
        loss = train_one_epoch(model, loader, device, opt, crit)
        metrics.append({"epoch": float(epoch), "loss": loss})
        print(f"epoch {epoch} loss={loss:.4f}")

    torch.save(model.state_dict(), args.out / "weights.pt")
    (args.out / "metrics.json").write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    print(f"Saved to {args.out}")


if __name__ == "__main__":
    main()
