# IMPORTS
import random
import math
import numpy as np
import os
import sys


#VARIABLES


#abrimos el csv y cargamos la matriz con los datos del csv
file = open(os.path.join(sys.path[0], "sampleSinCeros6.csv"), "r")
matriz = np.loadtxt(file, delimiter=",")