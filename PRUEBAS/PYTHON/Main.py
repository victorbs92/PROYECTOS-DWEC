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
file = open(os.path.join(sys.path[0], "sampleSinCeros5.csv"), "r")
matriz = np.loadtxt(file, delimiter=",")

#creamos los hilos de ejecucion

#llamamos por cada hilo a un algoritmo distinto



#FuerzaBrutaFINAL.fuerzaBruta(matriz)
#MontecarloFINAL.montecarlo(matriz)
#VecinoMasCercanoFINAL.vecinoMasCercano(matriz)

'''
def chequear(nombre):
    #Chequea tamaño de archivo
    contador = 0
    tam = 0
    while contador<100:
        contador+=1
        if os.path.exists(nombre):
            estado = os.stat(nombre)  
            tam = estado.st_size
        
        print(threading.current_thread().getName(), 
              contador, 
              tam, 
              'bytes')
              
        time.sleep(0.1)        

def escribir(nombre):
    #Escribe en archivo
    contador = 1 
    while contador<=10:
        with open(nombre, 'a') as archivo:
            archivo.write('1')            
            print(threading.current_thread().getName(), 
                  contador)
            time.sleep(0.3)
            contador+=1

nombre = 'archivo.txt'
if os.path.exists(nombre):
    os.remove(nombre)
'''


hiloFuerzaBruta = threading.Thread(name='fuerzaBruta', 
                         target=FuerzaBrutaFINAL.fuerzaBruta,
                         args=(matriz,))
                         
hiloMontecarlo = threading.Thread(name='montecarlo',
                         target=MontecarloFINAL.montecarlo,
                         args=(matriz,))


hiloFuerzaBruta.start()
#hiloMontecarlo.start()
