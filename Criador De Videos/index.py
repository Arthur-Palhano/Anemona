import os
import sys

par = " ".join(sys.argv[1:])

os.system(f"node images.js {par}")

os.system(f"python infos.py {par}")