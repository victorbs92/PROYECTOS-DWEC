# IMPORTS
import itertools
import random
import math
import numpy as np
import os
import sys


# VARIABLES
mitadFactorial = 0  # variable donde guardaremos el valor de la mitad del factorial

ciudades = []  # array que va a estar cambiando a lo largo de todo el programa, en cada iteracion del algoritmo será una ruta distinta

distanciaRutaCiudadesActual = 0 # variable donde se calcula en cada iteracion del algoritmo la distancia que se obtiene de recorrer el array ciudades y que se resetea en cada iteracion
mensajeRutaCiudadesActual = ""# mensaje donde ir guardando la ruta de ciudades que hay en cada iteracion del bucle

mejorRutaCiudades = []  # donde guardaremos la mejor ruta obtenida hasta el momento
mejorDistanciaRuta = 0  # donde guardaremos la mejor distancia obtenida hasta el momento
mensajeMejorRutaCiudades = ""# mensaje que mostrara la mejor ruta de ciudades a recorrer

contadorIteraciones = 0  # vueltas de bucle


# FUNCIONES Y METODOS
def mostrarInfo():
    print(f'Iteración: {contadorIteraciones}')
    print(f'Mejor distancia: {mejorDistanciaRuta}')
    print(f'Mejor ruta: {mensajeMejorRutaCiudades}')
    print(f'Ruta actual: {mensajeRutaCiudadesActual}')
    print(f'Distancia actual: {distanciaRutaCiudadesActual}')
    print("---------")


# CARGA DE DATOS INICIAL
# abrimos el csv y cargamos la matriz con los datos del csv
file = open(os.path.join(sys.path[0], "sampleSinCeros6.csv"), "r")
matriz = np.loadtxt(file, delimiter=",")

# calcula el factorial de ciudades.length y lo divide entre 2 y lo guarda en una variable
mitadFactorial = math.factorial(len(matriz)) / 2

for i in range(len(matriz)):  # cargamos el array ciudades con la ruta inicial
    ciudades.append(i)


# ALGORITMO




# PRUUUUUUUUUUEEEEEEEEEEEEBAAAAAAAAAAAAAAAAAAS

####################################################
# OBTIENE TODAS LAS PERMUTACIONES DE LAS CIUDADES
ciudadesPermu = []
def obtenerTodasPermutaciones(ciudades, ciudadesPermu):
    for p in itertools.permutations(ciudades):
        x = []
        for i in range(len(p)):  # convierte la lista en un array añadiendo los elemento 1 por 1 al array
            x.append(p[i])
        ciudadesPermu.append(x)  # añade el array a ciudades (array de arrays)

    print("CIUDADES TOTAL:")
    print(len(ciudadesPermu))
    # print(ciudadesPermu)
    print("-------------------------------------------------------------")


####################################################


#GUARDA EN CIUDADESALGORITMOCONINVERSOS TODAS LAS PERMUTACIONES CON SUS INVERSOS
# variables para comprobacion (no necesarias cuando el algoritmo ya funcione)
ciudadesAlgoritmo = [[]]
ciudadesAlgoritConInversos = []
def obtenerTodasPermutacionConInversos(ciudadesAlgoritmo, ciudadesAlgoritConInversos):
    ciudadesAlgoritmo[0] = ciudades[:]
    for i in range(len(ciudadesAlgoritmo)):
        ciudadesAlgoritConInversos.append(ciudadesAlgoritmo[i][:])
        ciudadesAlgoritConInversos.append(ciudadesAlgoritmo[i][::-1])

    print("CIUDADES ALGORITMO + INVERSOS:")
    print(len(ciudadesAlgoritConInversos))
    #print(ciudadesAlgoritConInversos)
    print("-------------------------------------------------------------")


####################################################


#COMPRUEBA SI EL ARRAY DE LA POSICION I DE LA VARIABLE ALGORITMOSCONINVERSOS EXISTE EN CIUDADESPERMU Y SI EXISTE LO ELIMINA DE LA COPIA DE AMBAS VARIABLES
ciudadesAlgoritmosConInversosCOPIA = ciudadesAlgoritConInversos[:]
ciudadesPermuCOPIA = ciudadesPermu[:]
def TESTER():
    for i in range(len(ciudadesAlgoritConInversos)):
        for j in range(len(ciudadesPermu)):
            if ciudadesAlgoritConInversos[i] == ciudadesPermu[j]:
                ciudadesAlgoritmosConInversosCOPIA.remove(ciudadesAlgoritConInversos[i])
                #print (ciudadesPermu[j])
                #ciudadesPermuCOPIA.remove(ciudadesPermu[j])
                #print (i)
                #auxiliar2copia[i] = ("Z")
                #ciudadesPermuCopia[i] = ("Z")


####################################################


# COMPRUEBA SI HAY REPETIDOS EN UN ARRAY
def comprobarRepetidos(ciudadesAlgoritmo):
    x = 0
    y = 0
    z = []
    for i in range(len(ciudadesAlgoritmo)):
        x = 0
        for j in range(len(ciudadesAlgoritmo)):
            if ciudadesAlgoritmo[i] == ciudadesAlgoritmo[j]:
                x = x + 1
        if(x > 1):
            y = y + 1
            z.append(ciudadesAlgoritmo[i][:])

    print("Repetidos:")
    print(y)  # si no hay repetidos "y" tiene que valer 0
    print(len(z))
    #print (z)
    print("-------------------------------------------------------------")

    



