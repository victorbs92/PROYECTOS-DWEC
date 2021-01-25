# cargo los datos en una matriz
import random
import numpy as np
import os
import sys


arrayRuta = []
distancia = 0
mejorRuta = arrayRuta
mejorDistancia = 99999
mensaje = ""
contadorIteraciones = 0


file = open(os.path.join(sys.path[0], "sample.csv"), "r")
matriz = np.loadtxt(file, delimiter=",")


for i in range(0, len(matriz)):
    arrayRuta.insert(i, i)


def mostrar(mensaje, mejorDistancia, contador):
    print(mensaje)
    print(f'Mejor distancia: {mejorDistancia} ')
    print(f'Iteración: {contador} ')


while True:
    contadorIteraciones = contadorIteraciones + 1
    np.random.shuffle(arrayRuta)
    arrayRuta.append(arrayRuta[0])

    for i in range(0, len(arrayRuta)-1):
        distancia = distancia+matriz[arrayRuta[i]][arrayRuta[i+1]]

    if distancia < mejorDistancia:
        mensaje = "Mejor ruta: "
        mejorDistancia = distancia
        mejorRuta = arrayRuta

        for i in range(0, len(mejorRuta)):
            if i < len(mejorRuta) - 1:
                mensaje += (f'Ciudad: {mejorRuta[i]} -> ')
            else:
                mensaje += (f'Ciudad: {mejorRuta[i]}')

        mostrar(mensaje, mejorDistancia, contadorIteraciones)

    arrayRuta.pop(len(arrayRuta)-1)
    distancia = 0

    if contadorIteraciones % 100000 == 0:
        mostrar(mensaje, mejorDistancia, contadorIteraciones)
