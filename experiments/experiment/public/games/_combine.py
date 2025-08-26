'''Combines the phase 1 files to load all configurations at once'''
import json

allJsons = {}

for i in range(155):
  with open(f'./ref2_pilot5_binned_threads_{i}_phase1.json') as f:
    data = json.load(f)
    allJsons[i] = data
    
  for idx, d in allJsons.items():
    for i, trial in enumerate(d['trials']):
      if i==0 or i==10:
        order = trial['tangrams_order']
      else:
        trial['tangrams_order'] = order # first 10 trials are the same order and the last 10 are the same

with open('../../client/intro/phase_data.json', 'w') as f:
  json.dump(allJsons, f)
  
