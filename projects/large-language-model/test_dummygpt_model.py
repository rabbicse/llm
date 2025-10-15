import torch

from config import GPT_CONFIG_124M
from gpt_model import DummyGPTModel

torch.manual_seed(123)
model = DummyGPTModel(GPT_CONFIG_124M)
logits = model(batch)
print("Output shape:", logits.shape)
print(logits)