# IMPORTS
import random
import numpy as np
import os
import sys

#VARIABLES
arrayRuta = []
distancia = 0
mejorRuta = arrayRuta
mejorDistancia = 99999999999
mensaje = ""
contadorIteraciones = 0

#abrimos el csv y cargamos la matriz con los datos del csv
file = open(os.path.join(sys.path[0], "sample.csv"), "r")
matriz = np.loadtxt(file, delimiter=",")


#cargamos arrayRuta con la primera ruta con la que vamos a trabajar
for i in range(0, len(matriz)):
    arrayRuta.insert(i, i)


#metodo que muestra los resultados cuando es llamado
def mostrar(mensaje, mejorDistancia, contador):
    print(mensaje)
    print(f'Mejor distancia: {mejorDistancia} ')
    print(f'Iteración: {contador} ')


while True:
    contadorIteraciones = contadorIteraciones + 1 #incrementamos en 1 el contador de iteraciones
    np.random.shuffle(arrayRuta) #mezclamos el arrayRuta que habiamos cargado anteriormente, en cada nueva iteracion mezcla el arrayRuta que habrá sido mezclado en la iteracion anterior 
    #arrayRuta.append(arrayRuta[0]) #añade al final del array el mismo elemento que el primer elemento del array

    
    #recorremos el array y comprobamos el valor que tiene cada elemento buscandolo en la matriz y lo añadimos a la varaible distancia
    for i in range(0, len(arrayRuta)-1):
        distancia = distancia + matriz[arrayRuta[i]][arrayRuta[i+1]]

    #comprobamos si la distancia obtenida en esta iteracion es mejor que la que ya habia guardada
    if distancia < mejorDistancia:
        mensaje = "Mejor ruta: "
        mejorDistancia = distancia
        mejorRuta = arrayRuta

        #cargamos el mensaje que mostrará la ruta de ciudades recorriendo el array y guardando la ciudad [i] en cada iteracion del bucle
        for i in range(0, len(mejorRuta)):
            if i < len(mejorRuta) - 1:
                mensaje += (f'Ciudad: {mejorRuta[i]} -> ')
            else:
                mensaje += (f'Ciudad: {mejorRuta[i]}')

        mostrar(mensaje, mejorDistancia, contadorIteraciones) #llamamos a la funcion que muestra los datos

    arrayRuta.pop(len(arrayRuta)-1) #quitamos el ultimo elemento del array para que cuando vuelva a entrar en el bucle y mezcle el array, lo haga sin repetidos
    distancia = 0 #reseteamos la distancia para que vuelva a calcularla empezando de 0 en la siguiente iteracion del bucle

    #llamamos a la funcion que muestra los datos por cada 100000 iteraciones
    if contadorIteraciones % 100000 == 0:
        mostrar(mensaje, mejorDistancia, contadorIteraciones)
