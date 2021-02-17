
#IMPORTS
import numpy as np
import os
import sys
from numpy.lib.function_base import append


#VARIABLES
ciudadesAux = []
ciudades = []
distanciaAux = 0
distancia = 0
cont = 0
indiceAux = 0


# FUNCIONES Y METODOS



# CARGA DE DATOS INICIAL
# abrimos el csv y cargamos la matriz con los datos del csv
#file = open(os.path.join(sys.path[0], "sampleSinCeros15.csv"), "r")
#matriz = np.loadtxt(file, delimiter=",")


def calcularRuta(matriz, indice, cont):

    global ciudadesAux
    # añadimos al array ciudades la ciudad que este en el indice que recibimos por parametro
    ciudadesAux.append(indice)

    # convierte la columna que corresponde al indice del array que se le ha pasado como argumento a la funcion en todo 0
    matriz[:, indice] = 0

    cont = cont + 1  # incrementamos el contador en 1

    # si el contador llega al numero de ciudades que hay en la matriz sale de la funcion
    if cont < len(matriz):

        # obtiene el valor minimo de un array obviando el 0
        ciudadMasCercana = np.min(matriz[indice][np.nonzero(matriz[indice])])
        # devuelve una tupla, el primer valor es un array con los indices donde ha encontrado ese valor min (puede darse el caso de que este repetido y salga mas de un valor) y el segundo valor es el tipo de dato
        indicesConValorMinimo = np.where(matriz[indice] == ciudadMasCercana)

        # comprobar si tiene mas de uno, si lo tiene habria que recorrer este array comprobando cada indice en la matriz para ver que camino es el mas eficiente y escogerlo
        if len(indicesConValorMinimo[0]) > 1:
            cacularRep(matriz, indicesConValorMinimo[0], indiceAux)

        # llamamos a la funcion pasandole la matriz, el indice con el que tiene que trabajar y un contador de ciclos
        calcularRuta(matriz, indicesConValorMinimo[0][0], cont)


def cacularRep(matriz, arrayMinValores, indiceAux):
    distanciaMin = 999999
    distanciaAux = 0
    indiceCiudad = -1
    

    for i in range(len(arrayMinValores)):
        num = i
        print(num)
        distanciaAux = 0
        ciudadMasCercana = np.min(
            matriz[arrayMinValores[i]][np.nonzero(matriz[arrayMinValores[i]])])
        distanciaAux = distanciaAux + ciudadMasCercana

        if distanciaAux < distanciaMin:
            distanciaMin = distanciaAux
            indicesConValorMinimo = np.where(
                matriz[arrayMinValores[i]] == ciudadMasCercana)
            indiceCiudad = arrayMinValores[i]

            if len(indicesConValorMinimo[0]) > 1:
                print("XXXXXXXXXX")
                indiceAux = indiceCiudad
                cacularRep(matriz, indicesConValorMinimo[0], indiceAux)

    print("INDICE")
    print(indiceCiudad)
    return indiceCiudad


##### COSAS QUE FALTAN #####

# crear un bucle for que vaya desde 0 hasta matriz.length y por cada iteracion llamar a la funcion calcularRuta pasandole la "i" como parametro, el cont al llamar a la funcion
# desde el bucle siempre será 0, la matriz original hay que copiarla a una matriz auxiliar y será la copia la que se pase como paremtro a la funcion, en cada iteracion del bucle
# se crea la matriz aux y se copia de la original para que al pasarlesela como argumento a la funcion siempre le pase el "contenido original"
# en cada iteracion del bucle hay que resetar la variable global cont a 0 para que pueda usarla la funcion

# comprobar en cada iteracion del bucle, despues de obtener el array con la ruta, añadir a la ultima posicion de ese array la ciudad que este la primera (resultado ciclico),
# y sumar a la variable distancia, la distancia de la ciudad recien añadida, despues comprobar la distancia total, que se habrá guardado en la variable distanciaAux, y si la
# obtenida al final es mejor que la almacenada en la variable distanciaTotal, modificar el array ciudades con los datos del arrayAuxiliar y mostrar los datos por pantalla

# implementar el if de la funcion para que escoja el mejor camino si hay distancias minimas repetidas durante la ejecucion de la funcion

# comprobar si merece la pena implementar el algoritmo con "aumento de vision en 1 o 2" y si lo merece, implementarlo
# encontrar la forma de que, una vez obtenido el mejor arrayCiudades, aprovechar el tiempo de ejecucion restante para mejorar ese resultado de una manera iterativa

# implementar la obtencion de la matriz orginal desde el archivo csv y comprobar su funcionamiento


# llamamos a la funcion pasandole la matriz, el indice con el que tiene que trabajar y un contador de ciclos que siempre será 0 de primeras
#calcularRuta(matriz, 0, cont)


#print(matriz)
print(ciudades)
#####################################################################################################################


'''
#####################################################################################################################
# IMPORTS
import itertools
import random
import math
import numpy as np
import os
import sys
from numpy.lib.financial import mirr


# VARIABLES
mitadFactorial = 0 # variable donde guardaremos el valor de la mitad del factorial

ciudades = [] # array que va a estar cambiando a lo largo de todo el programa, en cada iteracion del algoritmo será una ruta distinta
direcciones = [] # array donde se irán guardando las direcciones de cada elemento del array ciudades

distanciaRutaCiudadesActual = 0 # variable donde se calcula en cada iteracion del algoritmo la distancia que se obtiene de recorrer el array ciudades y que se resetea en cada iteracion
mensajeRutaCiudadesActual = "" # mensaje donde ir guardando la ruta de ciudades que hay en cada iteracion del bucle

mejorRutaCiudades = []  # donde guardaremos la mejor ruta obtenida hasta el momento
mejorDistanciaRuta = 0  # donde guardaremos la mejor distancia obtenida hasta el momento
mensajeMejorRutaCiudades = "" # mensaje que mostrara la mejor ruta de ciudades a recorrer

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
    print(f'Iteración: {contadorIteraciones}')
    print(f'Mejor distancia: {mejorDistanciaRuta}')
    print(f'Mejor ruta: {mensajeMejorRutaCiudades}')
    #print(f'Ruta actual: {mensajeRutaCiudadesActual}')
    #print(f'Distancia actual: {distanciaRutaCiudadesActual}')
    print ("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    print("---------")
'''