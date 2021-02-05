# IMPORTS
import itertools
import random
import math
import numpy as np
import os
import sys
import _thread
from numpy.lib.financial import mirr


import FuerzaBrutaFINAL
import MontecarloFINAL
#import VecinoMasCercanoFINAL

#abrimos el csv y cargamos la matriz con los datos del csv
file = open(os.path.join(sys.path[0], "sampleSinCeros5.csv"), "r")
matriz = np.loadtxt(file, delimiter=",")

#creamos los hilos de ejecucion
_thread.start_new_thread(FuerzaBrutaFINAL.fuerzaBruta, matriz)
#llamamos por cada hilo a un algoritmo distinto



#FuerzaBrutaFINAL.fuerzaBruta(matriz)
#MontecarloFINAL.montecarlo(matriz)
#VecinoMasCercanoFINAL.vecinoMasCercano(matriz)
