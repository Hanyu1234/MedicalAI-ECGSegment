"""
ECG preprocessing: windowing, filtering, normalization — aligned with resume project.
"""

from __future__ import annotations

import numpy as np
from scipy import signal as sig


def sliding_windows(x: np.ndarray, win: int, stride: int) -> np.ndarray:
    """Non-overlapping or overlapping windows for sequence batches."""
    if len(x) < win:
        return x[np.newaxis, :]
    n = 1 + (len(x) - win) // stride
    out = np.empty((n, win), dtype=np.float32)
    for i in range(n):
        out[i] = x[i * stride : i * stride + win]
    return out


def bandpass_ecg(x: np.ndarray, fs: float, low: float = 0.5, high: float = 40.0) -> np.ndarray:
    nyq = 0.5 * fs
    b, a = sig.butter(3, [low / nyq, high / nyq], btype="band")
    return sig.filtfilt(b, a, x).astype(np.float32)


def zscore(x: np.ndarray, eps: float = 1e-6) -> np.ndarray:
    m = float(np.mean(x))
    s = float(np.std(x)) + eps
    return ((x - m) / s).astype(np.float32)


def preprocess_trace(x: np.ndarray, fs: float) -> np.ndarray:
    x = bandpass_ecg(x, fs)
    return zscore(x)
