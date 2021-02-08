# IMPORTS
import random
import numpy as np
import os
import sys


#VARIABLES
ciudades = [] #array donde guardaremos la ruta actual
distanciaRutaCiudadesActual = 0 # variable donde se calcula en cada iteracion del algoritmo la distancia que se obtiene de recorrer el array ciudades y que se resetea en cada iteracion
mensajeRutaCiudadesActual = "" # mensaje donde ir guardando la ruta de ciudades que hay en cada iteracion del bucle

mejorRutaCiudades = []  # donde guardaremos la mejor ruta obtenida hasta el momento
mejorDistanciaRuta = 0 # donde guardaremos la mejor distancia obtenida hasta el momento
mensajeMejorRutaCiudades = "" # mensaje que mostrara la mejor ruta de ciudades a recorrer

contadorIteraciones = 0  # vueltas de bucle


# FUNCIONES Y METODOS
def obtenerYCompararResultados(ciudades, matriz): #obtiene la distancia de la ruta y la compara con la mejor que tenemos guardada
    #referencias a las variables globales
    global distanciaRutaCiudadesActual
    global mensajeRutaCiudadesActual
    global mejorRutaCiudades
    global mejorDistanciaRuta
    global mensajeMejorRutaCiudades

    #resetValores
    distanciaRutaCiudadesActual = 0
    mensajeRutaCiudadesActual = ""

    #CALCULO DE DISTANCIA Y MENSAJE
    ciudades.append(ciudades[0]) #añade al final del array ciudades una copia de la primera ciudad

    for i in range(0, len(ciudades)-1):#recorremos el array ciudades buscando cada elemento del array en la matriz y añadiendo la distancia a la variable distanciaRutaCiudades
        distanciaRutaCiudadesActual = distanciaRutaCiudadesActual + matriz[ciudades[i]][ciudades[i+1]]
        mensajeRutaCiudadesActual += (f'Ciudad: {ciudades[i]} -> ') #formateamos el mensaje que vamos a mostrar
    mensajeRutaCiudadesActual += (f'Ciudad: {ciudades[len(ciudades)-1]}')#añadimos la ultima ciudad al mensaje
    
    #comparamos la distancia de la ruta actual con la menor distancia obtenida hasta ahora y si es menor actualizamos los datos y los mostramos
    if(distanciaRutaCiudadesActual < mejorDistanciaRuta or mejorDistanciaRuta == 0 ):
        mejorRutaCiudades = ciudades
        mejorDistanciaRuta = distanciaRutaCiudadesActual
        mensajeMejorRutaCiudades = mensajeRutaCiudadesActual
        mostrarInfo()

    ciudades.pop(len(ciudades) - 1)#borramos la ultima ciudad despues de calcular la distancia de la ruta

#RESETEA EL TXT
f = open ('PRUEBAS/PYTHON/MontecarloResultados.txt', 'w')
f.write ("")
f.close
def mostrarInfo( ): #metodo que muestra los resultados cuando es llamado
    f = open ('PRUEBAS/PYTHON/MontecarloResultados.txt', 'a')
    f.write(f'Iteración: {contadorIteraciones} \n')
    f.write(f'Mejor distancia: {mejorDistanciaRuta} \n')
    f.write(f'Mejor ruta: {mensajeMejorRutaCiudades} \n')
    #f.write(f'Ruta actual: {mensajeRutaCiudadesActual} \n')
    #f.write(f'Distancia actual: {distanciaRutaCiudadesActual} \n')
    #f.write ("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB \n")
    f.write("--------- \n")
    f.close()


def montecarlo(matriz):
    #referencias a las variables globales
    global distanciaRutaCiudadesActual
    global contadorIteraciones

    # CARGA DE DATOS INICIAL
    #cargamos arrayRuta con la primera ruta con la que vamos a trabajar
    for i in range(0, len(matriz)):
        ciudades.insert(i, i)


    #ALGORITMO
    while True:
        contadorIteraciones = contadorIteraciones + 1 #incrementamos en 1 el contador de iteraciones
        np.random.shuffle(ciudades) #mezclamos el arrayRuta que habiamos cargado anteriormente, en cada nueva iteracion mezcla el arrayRuta que habrá sido mezclado en la iteracion anterior 

        #recorremos el array y comprobamos el valor que tiene cada elemento buscandolo en la matriz y lo añadimos a la varaible distancia
        for i in range(0, len(ciudades)-1):
            distanciaRutaCiudadesActual = distanciaRutaCiudadesActual + matriz[ciudades[i]][ciudades[i+1]]

        obtenerYCompararResultados(ciudades, matriz) #llamamos a obtener resultados con el primer resultado
