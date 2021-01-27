# IMPORTS
import random
import math
import numpy as np
import os
import sys


#abrimos el csv y cargamos la matriz con los datos del csv
file = open(os.path.join(sys.path[0], "sampleSinCeros.csv"), "r")
matriz = np.loadtxt(file, delimiter=",")


#VARIABLES
mitadFactorial = 0 #variable donde guardaremos el valor de la mitad del factorial
ciudades = [] #array que va a estar cambiando a lo largo de todo el programa, en cada iteracion del algoritmo será una ruta distinta
mejorRutaCiudades = [] #donde guardaremos la mejor ruta obtenida hasta el momento
distanciaRutaCiudades = 0 #variable donde se calcula en cada iteracion del algoritmo la distancia que se obtiene de recorrer el array ciudades y que se resetea en cada iteracion
mejorDistanciaRuta = 0  #donde guardaremos la mejor distancia obtenida hasta el momento
contadorIteraciones = 1 #vueltas de bucle
contador2 = 0 #instruccion2
contador3 = 3 #instruccion3
mensaje = "" #mensaje que mostrara la ruta de ciudades a recorrer
mensajeAux = "" #mensaje donde ir guardando la ruta de ciudades que hay en cada iteracion del bucle

#FUNCIONES Y METODOS
def calcularDistancia ():
    #referencias a las variables globales
    global contadorIteraciones
    global ciudades 
    global mejorRutaCiudades
    global distanciaRutaCiudades
    global mejorDistanciaRuta
    global mensaje
    global mensajeAux

    #reset de variables
    distanciaRutaCiudades = 0
    mensajeAux = ""

    ciudades.append(ciudades[0]) #añade al final del array ciudades una copia de la primera ciudad

    for i in range(0, len(ciudades)-1):
        #recorremos el array ciudades buscando cada elemento del array en la matriz y añadiendo la distancia a la variable distanciaRutaCiudades
        distanciaRutaCiudades = distanciaRutaCiudades + matriz[ciudades[i]][ciudades[i+1]]
        mensajeAux += (f'Ciudad: {ciudades[i]} -> ') #formateamos el mensaje que vamos a mostrar
            
    mensajeAux += (f'Ciudad: {ciudades[len(ciudades)-1]}')#añadimos la ultima ciudad al mensaje
    
    #comparamos la distancia de la ruta actual con la menor distancia obtenida hasta ahora y si es menor actualizamos los datos y los mostramos
    if(distanciaRutaCiudades < mejorDistanciaRuta or mejorDistanciaRuta == 0):
        mejorRutaCiudades = ciudades
        mejorDistanciaRuta = distanciaRutaCiudades
        mensaje = mensajeAux
        mostrarInfo()
        
    elif(distanciaRutaCiudades >= mejorDistanciaRuta and contadorIteraciones % 100000 == 0):#si los datos de la ruta actual no son mejores que los almacenados pero la iteracion es un multiplo de 100000 se muestran los datos
        mostrarInfo()

    contadorIteraciones = contadorIteraciones + 1 #incrementamos en 1 el contador de vueltas del bucle, ya que este metodo es llamado 1 vez por cada vuelta de bucle podemos incrementarlo aqui


def mostrarInfo():
    print (f'Iteración: {contadorIteraciones}')
    print (f'Mejor distancia: {mejorDistanciaRuta}')
    print (f'Mejor ruta: {mensaje}')
    print ("---------")


#CARGA DE DATOS INICIAL
mitadFactorial = math.factorial(len(matriz)) / 2 #calcula el factorial de ciudades.length y lo divide entre 2 y lo guarda en una variable

for i in range(len(matriz)): #cargamos el array ciudades con la ruta inicial
    ciudades.append(i)

#ciudades.append(ciudades[0]) #añade al final del array ciudades una copia de la primera ciudad
calcularDistancia() #llama a calcular distancia
ciudades.pop(0)

#EJECUCION DEL ALGORITMO
while contadorIteraciones < mitadFactorial -1:

    for i in range(len(ciudades)-1): 
        #ciudades.append(ciudades[0])
        calcularDistancia()
        if (i<len(ciudades)-3): #en la ultima iteracion del bucle no borramos el primer elemento
            ciudades.pop(0)
        else: #en la ultima iteracion del bucle borramos el ultimo elemento del array
            ciudades.pop(len(ciudades)-1)

    if contador2 < len(ciudades) - 2:
        ciudades.insert(2, ciudades[0])
        ciudades.pop(0)
        calcularDistancia()
        ciudades.pop(0)
        contador2 = contador2 + 1

    elif contador2 >= len(ciudades) - 2 and contadorIteraciones < mitadFactorial -1 :
        contador2 = 0
        ciudades.insert(contador3, ciudades[0])
        ciudades.pop(0)
        calcularDistancia()
        ciudades.pop(0)
        contador3 = contador3 + 1
