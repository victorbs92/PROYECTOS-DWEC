# IMPORTS
import random
import math
import numpy as np
import os
import sys


#VARIABLES
mitadFactorial = 0 #variable donde guardaremos el valor de la mitad del factorial

ciudades = [] #array que va a estar cambiando a lo largo de todo el programa, en cada iteracion del algoritmo será una ruta distinta

distanciaRutaCiudadesActual = 0 #variable donde se calcula en cada iteracion del algoritmo la distancia que se obtiene de recorrer el array ciudades y que se resetea en cada iteracion
mensajeRutaCiudadesActual = "" #mensaje donde ir guardando la ruta de ciudades que hay en cada iteracion del bucle

mejorRutaCiudades = [] #donde guardaremos la mejor ruta obtenida hasta el momento
mejorDistanciaRuta = 0  #donde guardaremos la mejor distancia obtenida hasta el momento
mensajeMejorRutaCiudades = "" #mensaje que mostrara la mejor ruta de ciudades a recorrer

contadorIteraciones = 0 #vueltas de bucle


#FUNCIONES Y METODOS
def mostrarInfo():
    print (f'Iteración: {contadorIteraciones}')
    print (f'Mejor distancia: {mejorDistanciaRuta}')
    print (f'Mejor ruta: {mensajeMejorRutaCiudades}')
    print (f'Ruta actual: {mensajeRutaCiudadesActual}')
    print (f'Distancia actual: {distanciaRutaCiudadesActual}')
    print ("---------")



#CARGA DE DATOS INICIAL
#abrimos el csv y cargamos la matriz con los datos del csv
file = open(os.path.join(sys.path[0], "sampleSinCeros6.csv"), "r")
matriz = np.loadtxt(file, delimiter=",")

mitadFactorial = math.factorial(len(matriz)) / 2 #calcula el factorial de ciudades.length y lo divide entre 2 y lo guarda en una variable

for i in range(len(matriz)): #cargamos el array ciudades con la ruta inicial
    ciudades.append(i)




#ALGORITMO


#PRUEBAAAAAAAAAAAAAAAAAAS



