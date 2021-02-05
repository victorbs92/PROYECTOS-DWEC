# IMPORTS
import itertools
import numpy as np
from numpy.lib.financial import mirr

# PRUUUUUUUUUUEEEEEEEEEEEEBAAAAAAAAAAAAAAAAAAS


####################################################


# OBTIENE TODAS LAS PERMUTACIONES DE LAS CIUDADES
ciudadesPermu = []
def obtenerTodasPermutaciones(ciudades, ciudadesPermu):
    for p in itertools.permutations(ciudades):
        x = []
        # convierte la lista en un array añadiendo los elemento 1 por 1 al array
        for i in range(len(p)):
            x.append(p[i])
        ciudadesPermu.append(x)  # añade el array a ciudades (array de arrays)

    print("CIUDADES TOTAL:")
    print(len(ciudadesPermu))
    # print(ciudadesPermu)
    print("-------------------------------------------------------------")


####################################################


# GUARDA EN CIUDADESALGORITMOCONINVERSOS TODAS LAS PERMUTACIONES CON SUS INVERSOS
# variables para comprobacion (no necesarias cuando el algoritmo ya funcione)
ciudadesAlgoritConInversos = []
def obtenerTodasPermutacionConInversos(ciudades, ciudadesAlgoritmo, ciudadesAlgoritConInversos):
    ciudadesAlgoritmo[0] = ciudades[:]
    for i in range(len(ciudadesAlgoritmo)):
        ciudadesAlgoritConInversos.append(ciudadesAlgoritmo[i][:])
        ciudadesAlgoritConInversos.append(ciudadesAlgoritmo[i][::-1])

    print("CIUDADES ALGORITMO + INVERSOS:")
    print(len(ciudadesAlgoritConInversos))
    #print(ciudadesAlgoritConInversos)
    print("-------------------------------------------------------------")


####################################################


# COMPRUEBA SI EL ARRAY DE LA POSICION I DE LA VARIABLE ALGORITMOSCONINVERSOS EXISTE EN CIUDADESPERMU Y SI EXISTE LO ELIMINA DE LA COPIA DE AMBAS VARIABLES
def TESTER():
    ciudadesAlgoritmosConInversosCOPIA = ciudadesAlgoritConInversos[:]
    ciudadesPermuCOPIA = ciudadesPermu[:]
    #print ((ciudadesAlgoritmosConInversosCOPIA))
    for i in range(len(ciudadesAlgoritConInversos)):
        for j in range(len(ciudadesPermu)):
            if ciudadesAlgoritConInversos[i] == ciudadesPermu[j]:
                ciudadesAlgoritmosConInversosCOPIA.remove(
                    ciudadesAlgoritConInversos[i])
                #print (ciudadesPermu[j])
                ciudadesPermuCOPIA.remove(ciudadesPermu[j])
                #print (i)
                #auxiliar2copia[i] = ("Z")
                #ciudadesPermuCopia[i] = ("Z")
    print (len(ciudadesPermuCOPIA))

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


####################################################

