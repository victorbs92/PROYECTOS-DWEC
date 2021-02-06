# IMPORTS
import itertools
import random
import math
import numpy as np
import os
import sys
import time 
import threading
from numpy.lib.financial import mirr


import FuerzaBrutaFINAL
import MontecarloFINAL
#import VecinoMasCercanoFINAL


#abrimos el csv y cargamos la matriz con los datos del csv
file = open(os.path.join(sys.path[0], "sampleSinCeros15.csv"), "r")
matriz = np.loadtxt(file, delimiter=",")


#creamos los hilos de ejecucion
hiloFuerzaBruta = threading.Thread(name='fuerzaBruta', 
                         target=FuerzaBrutaFINAL.fuerzaBruta,
                         args=(matriz,),
                         daemon=True)
                         
hiloMontecarlo = threading.Thread(name='montecarlo',
                         target=MontecarloFINAL.montecarlo,
                         args=(matriz,),
                         daemon=True)


#llamamos por cada hilo a un algoritmo distinto
hiloFuerzaBruta.start()
#hiloMontecarlo.start()


#despues de decirle a los hilos que se ejecuten esperamos en el hilo principal el tiempo que el usuario haya indicado,
#y despues de ese tiempo matamos el hilo principal, los otros hilos como son demonios que dependen del hilo principal
#se moriran automaticamente
time.sleep(60)
print("KKKKKKKKKKKKKKKKKKK")
#sys.exit()

