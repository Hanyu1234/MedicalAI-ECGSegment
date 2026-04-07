"""
Encoder–decoder segmentation + sequence modeling (LSTM) for ECG waves.
Resume: CNN/SegNet-style + LSTM for temporal context.
"""

from __future__ import annotations

import torch
import torch.nn as nn


class ConvBlock(nn.Module):
    def __init__(self, c_in: int, c_out: int) -> None:
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv1d(c_in, c_out, kernel_size=7, padding=3),
            nn.BatchNorm1d(c_out),
            nn.ReLU(inplace=True),
            nn.Conv1d(c_out, c_out, kernel_size=7, padding=3),
            nn.BatchNorm1d(c_out),
            nn.ReLU(inplace=True),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.net(x)


class EcgSegNetLSTM(nn.Module):
    """Lightweight SegNet-style encoder–decoder with bidirectional LSTM bottleneck."""

    def __init__(self, in_ch: int = 1, base: int = 32, num_classes: int = 4) -> None:
        super().__init__()
        self.enc1 = ConvBlock(in_ch, base)
        self.pool1 = nn.MaxPool1d(2)
        self.enc2 = ConvBlock(base, base * 2)
        self.pool2 = nn.MaxPool1d(2)
        self.bottleneck = nn.LSTM(
            input_size=base * 2,
            hidden_size=base * 2,
            num_layers=1,
            batch_first=True,
            bidirectional=True,
        )
        self.proj_b = nn.Conv1d(base * 4, base * 2, kernel_size=1)
        self.up2 = nn.Upsample(scale_factor=2, mode="linear", align_corners=False)
        self.dec2 = ConvBlock(base * 4, base * 2)
        self.up1 = nn.Upsample(scale_factor=2, mode="linear", align_corners=False)
        # decoder1: upsampled (base*2) + skip e1 (base) channels
        self.dec1 = ConvBlock(base * 2 + base, base)
        self.head = nn.Conv1d(base, num_classes, kernel_size=1)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # x: [B, 1, T]
        e1 = self.enc1(x)
        p1 = self.pool1(e1)
        e2 = self.enc2(p1)
        p2 = self.pool2(e2)
        b, c, t = p2.shape
        y = p2.transpose(1, 2)  # [B, T', C]
        y, _ = self.bottleneck(y)
        y = y.transpose(1, 2)
        y = self.proj_b(y)
        y = self.up2(y)
        y = torch.cat([y, e2], dim=1)
        y = self.dec2(y)
        y = self.up1(y)
        y = torch.cat([y, e1], dim=1)
        y = self.dec1(y)
        return self.head(y)
