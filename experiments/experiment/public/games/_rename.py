import os
from os import listdir
from os.path import isfile, join


files = [f for f in listdir('./') if isfile(join('./', f))]

# Renaming the file
idx = 0
for f in files:
    # print(idx)
    if f.startswith('image_embed_ref2'): 
      os.rename(f, f.replace('ineractive', 'interactive'))
      idx += 1
      print(idx)