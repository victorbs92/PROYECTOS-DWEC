# IMPORTS
import itertools
import random
import math
import numpy as np
import os
import sys
from numpy.lib.financial import mirr

'''
from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
'''

# VARIABLES
mitadFactorial = 0 # variable donde guardaremos el valor de la mitad del factorial

ciudades = [] # array que va a estar cambiando a lo largo de todo el programa, en cada iteracion del algoritmo será una ruta distinta
direcciones = [] # array donde se irán guardando las direcciones de cada elemento del array ciudades

distanciaRutaCiudadesActual = 0 # variable donde se calcula en cada iteracion del algoritmo la distancia que se obtiene de recorrer el array ciudades y que se resetea en cada iteracion
mensajeRutaCiudadesActual = "" # mensaje donde ir guardando la ruta de ciudades que hay en cada iteracion del bucle

mejorRutaCiudades = []  # donde guardaremos la mejor ruta obtenida hasta el momento
mejorDistanciaRuta = 0  # donde guardaremos la mejor distancia obtenida hasta el momento
mensajeMejorRutaCiudades = "" # mensaje que mostrara la mejor ruta de ciudades a recorrer

k = 0 #variable que guardará la ciudad con la que trabaja el algoritmo en cada vuelta de bucle
kIndice = 0 #indice de K en el array ciudades
kDireccion = "" #direccion que tiene K
kOK = False # variable que determinará si K cumple con todos los requisitos para no se inmovil 

contadorIteraciones = 0  # vueltas de bucle
cont1 = 0 #contador utilizado en el bucle



# FUNCIONES Y METODOS
def obtenerK (cont1): #obtiene K
    global k
    global kIndice
    global kDireccion 
    k = max(ciudades) - cont1 # se obtiene el elemento mayor del array
    kIndice = ciudades.index(k)  # se obtiene el indice que ocupa K en el array
    kDireccion = direcciones[kIndice]  # se obtiene la direccion de K


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
    if(distanciaRutaCiudadesActual < mejorDistanciaRuta or mejorDistanciaRuta == 0):
        mejorRutaCiudades = ciudades
        mejorDistanciaRuta = distanciaRutaCiudadesActual
        mensajeMejorRutaCiudades = mensajeRutaCiudadesActual
        mostrarInfo()

    ciudades.pop(len(ciudades) - 1)#borramos la ultima ciudad despues de calcular la distancia de la ruta


def mostrarInfo(): # muestra en pantalla la informacion de la ruta
    f = open ('PRUEBAS/PYTHON/FuerzaBrutaResultados.txt', 'a')
    f.write(f'Iteración: {contadorIteraciones} \n')
    f.write(f'Mejor distancia: {mejorDistanciaRuta} \n')
    f.write(f'Mejor ruta: {mensajeMejorRutaCiudades} \n')
    #f.write(f'Ruta actual: {mensajeRutaCiudadesActual} \n')
    #f.write(f'Distancia actual: {distanciaRutaCiudadesActual} \n')
    #f.write ("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA \n")
    f.write("--------- \n")
    f.close()


def fuerzaBruta(matriz):
    
    #referencias a las variables globales
    global kIndice
    global cont1
    global contadorIteraciones

    # calcula el factorial de ciudades.length y lo divide entre 2 y lo guarda en una variable
    mitadFactorial = math.factorial(len(matriz)) / 2

    for i in range(len(matriz)):  # cargamos el array ciudades con la ruta inicial y el array direcciones con todas a la izd
        ciudades.append(i)
        direcciones.append("izd")

    obtenerK(cont1) #obtenemos K por primera vez

    contadorIteraciones = 1 #numero de veces que se ha ejecutado el algoritmo

    obtenerYCompararResultados(ciudades, matriz) #llamamos a obtener resultados con el primer resultado


    # ALGORITMO Steinhaus–Johnson–Trotter con aceleración de Even
    '''
    EXPLICACION ALGORITMO:
    Ejecutar el algoritmo en un bucle que itere de 1 en 1 hasta que las iteraciones igualen a la variable "mitadFactorial".
    Empezar obteniendo un array de tantos elementos como ciudades tenga la matriz, los valores del array serán números en orden ascendente 
    empezando desde el 0 y acabando en matriz.lenght (Ej para una matriz de 5 ciudades: [0, 1, 2, 3, 4]) 
    Este algoritmo funciona asigando "estados" a cada elemento del array, los estados pueden ser: izd, der o inmovil.
    Paso 1:
    Se asigna la dirección "izd" a todos el elementos del array.
    Paso 2:
    Se localiza el elemento con valor mas alto que no tenga estado inmovil, lo denominaremos "K".
    Paso 3:
    Se comprueba si el elemento al que apunta "K" es menor que "K", si es asi, se intercambian la posición (Ej: [<0 <1 <2] pasaría a ser [<0 <2 <1]),
    si el elemento al que apunta "K" no es menor, se considera a "K" en estado "inmovil" y "K" pasaría a ser el 2º elemento con mas valor y asi sucesivamente
    hasta encontrar un valor que cumpla con las condiciones y pueda ser "K".
    *Si "K" tiene estado "izd" y está en la posicion 0 del array, se considerará que tiene estado "inmovil", al igual que si "K" tiene estado "der"
    y se encuentra en la última posicion del array.*
    **Cuando el Paso 3 no pueda cumplirse el algoritmo habrá acabado.**
    Paso 4:
    Despues de cada intercambio se verifica si existen elementos mayores que "K" aunque tengan estado "inmovil", si es así, se les cambia el
    estado a todos, asigandoles "izd" si tenian "der", "der" si tenian "izd" o si estan "inmoviles", asignandoles el opuesto del último estado 
    que tuvieron antes de volverse "inmoviles" 
    Paso 5:
    Se vuelve al Paso 2 y se repiten todos los pasos hasta que se acabe el algoritmo.
    '''

    for i in range(2, int(mitadFactorial+1)):  # bucle que ejecuta el algoritmo tantas veces como valor tenga mitadFactorail -1
        
        #actualizacion de variables utilizadas en cada uteracion del bucle
        contadorIteraciones = i
        kOK = False
        cont1 = 0

        #OBTENEMOS K
        while(kOK == False): 

            if((kDireccion == "izd" and kIndice == 0) or # si K apunta a la izd y esta en la posicion 0
               (kDireccion == "der" and kIndice == len(ciudades)-1) or  # si K apunta a la der y esta en la ultima posicion
               (kDireccion == "izd" and ciudades[kIndice - 1] > k) or # si K apunta a la izd y el numero a la izd de K es mayor que K
               (kDireccion == "der" and ciudades[kIndice + 1] > k)): # si K apunta a la der y el numero a la der de K es mayor que K
                cont1 = cont1 + 1
                obtenerK(cont1)

            else:
                kOK = True

        #REALIZAMOS INTERCAMBIO
        if(kDireccion == "izd"):
            ciudades[kIndice], ciudades[kIndice - 1] = ciudades[kIndice - 1], ciudades[kIndice] #intercambia las ciudades
            direcciones[kIndice], direcciones[kIndice - 1] = direcciones[kIndice - 1], direcciones[kIndice] #intercambia las direcciones
            kIndice = ciudades.index(k) #actualizamos el indice de K
        else:    
            ciudades[kIndice], ciudades[kIndice + 1] = ciudades[kIndice + 1], ciudades[kIndice] #intercambia las ciudades
            direcciones[kIndice], direcciones[kIndice + 1] = direcciones[kIndice + 1], direcciones[kIndice] #intercambia las direcciones
            kIndice = ciudades.index(k) #actualizamos el indice de K

        #COMPROBAMOS SI HAY NUMEROS MAYORES QUE K
        if (k < max(ciudades)): #si los hay, cambiamos la direccion de todos los numeros mayores que K 

            for j in range(len(ciudades)): #recorremos el array ciudades comprobando cada numero con K y al que sea mayor le cambiamos la direccion

                if(ciudades[j] > k and direcciones[j] == "izd"):
                    direcciones[j] = "der"
                elif(ciudades[j] > k and direcciones[j] == "der"):
                    direcciones[j] = "izd"

            obtenerK(0) #se obtiene K y todos sus atributos siendo K el valor mas alto del array ciudades

        obtenerYCompararResultados(ciudades, matriz) #por cada vuelta del bucle llamamos a obtenerYCompararResultados
        
    #FIN ALGORITMO
    
    sys.exit()
    
