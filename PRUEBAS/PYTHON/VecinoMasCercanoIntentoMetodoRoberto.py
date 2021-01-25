import random
import numpy as np
from numpy.lib.function_base import append


matriz7 = [[0, 3, 18, 10, 12, 17, 18],
           [3, 0, 11, 20, 8, 16, 1],
           [18, 11, 0, 0, 20, 14, 11],
           [10, 20, 0, 0, 9, 8, 14],
           [12, 8, 20, 9, 0, 13, 17],
           [17, 16, 14, 8, 13, 0, 13],
           [18, 1, 11, 14, 17, 13, 0]]

matriz10 = [[0, 0, 7, 4, 11, 5, 4, 19, 1, 4],
            [0, 0, 10, 3, 18, 18, 1, 7, 13, 13],
            [7, 10, 0, 10, 4, 5, 18, 17, 13, 11],
            [4, 3, 10, 0, 20, 10, 0, 11, 18, 14],
            [11, 18, 4, 20, 0, 6, 10, 6, 0, 0],
            [5, 18, 5, 10, 6, 0, 7, 19, 19, 6],
            [4, 1, 18, 0, 10, 7, 0, 0, 3, 1],
            [19, 7, 17, 11, 6, 19, 0, 0, 2, 5],
            [1, 13, 13, 18, 0, 19, 3, 2, 0, 15],
            [4, 13, 11, 14, 0, 6, 1, 5, 15, 0]]

matriz = [[0, 14, 46, 15, 42, 2, 34, 43, 9, 1, 5, 24, 34, 42, 2],
          [14, 0, 27, 44, 48, 2, 0, 7, 20, 12, 13, 12, 35, 50, 49],
          [46, 27, 0, 47, 5, 23, 41, 29, 15, 8, 49, 41, 28, 19, 33],
          [15, 44, 47, 0, 39, 17, 34, 27, 49, 4, 41, 0, 23, 40, 42],
          [42, 48, 5, 39, 0, 47, 6, 48, 32, 40, 3, 15, 35, 44, 31],
          [2, 2, 23, 17, 47, 0, 25, 36, 14, 10, 45, 3, 13, 1, 34],
          [34, 0, 41, 34, 6, 25, 0, 49, 22, 37, 16, 38, 19, 30, 21],
          [43, 7, 29, 27, 48, 36, 49, 0, 20, 4, 17, 32, 28, 0, 14],
          [9, 20, 15, 49, 32, 14, 22, 20, 0, 33, 47, 29, 3, 46, 38],
          [1, 12, 8, 4, 40, 10, 37, 4, 33, 0, 0, 10, 18, 12, 32],
          [5, 13, 49, 41, 3, 45, 16, 17, 47, 0, 0, 20, 7, 27, 46],
          [24, 12, 41, 0, 15, 3, 38, 32, 29, 10, 20, 0, 17, 40, 3],
          [34, 35, 28, 23, 35, 13, 19, 28, 3, 18, 7, 17, 0, 0, 5],
          [42, 50, 19, 40, 44, 1, 30, 0, 46, 12, 27, 40, 0, 0, 32],
          [2, 49, 33, 42, 31, 34, 21, 14, 38, 32, 46, 3, 5, 32, 0]]

matriz5 = np.array([[0, 15, 17, 15, 27],
                    [15, 0, 3, 14, 3],
                    [17, 3, 0, 7, 18],
                    [15, 14, 7, 0, 1],
                    [27, 4, 18, 2, 0]])

ciudadesAux = []
ciudades = []
distanciaAux = 0
distancia = 0
cont = 0
indiceAux = []
tst=[]


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
            test=cacularRep(matriz, indicesConValorMinimo[0], indiceAux)
            test= indiceAux

        # llamamos a la funcion pasandole la matriz, el indice con el que tiene que trabajar y un contador de ciclos
        calcularRuta(matriz, indicesConValorMinimo[0][0], cont)




def cacularRep(matriz, arrayMinValores, indiceAux):
    distanciaMin = 999999
    distanciaAux = 0
    indiceCiudad = [-1]
    indiceAux2 = []

    for i in range(len(arrayMinValores)):
        distanciaAux = 0
        ciudadMasCercana = np.min(matriz[arrayMinValores[i]][np.nonzero(matriz[arrayMinValores[i]])])
        distanciaAux = distanciaAux + ciudadMasCercana

        if distanciaAux < distanciaMin:
            distanciaMin = distanciaAux
            indicesConValorMinimo = np.where(matriz[arrayMinValores[i]] == ciudadMasCercana)
            indiceCiudad = arrayMinValores[i]


            if len(indicesConValorMinimo[0]) > 1:
                indiceAux.append(arrayMinValores[i])
                cacularRep(matriz, indicesConValorMinimo[0], indiceAux)

    
    indiceAux.append(indiceCiudad)
    print (indiceAux)
    return indiceAux


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
calcularRuta(matriz5, 0, cont)


print(matriz5)
print(ciudades)
