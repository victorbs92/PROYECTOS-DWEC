# cargo los datos en una matriz
import random

matriz5 = [[0, 26, 17, 15, 27], 
           [26, 0, 15, 12, 4], 
           [17, 15, 0, 2, 18],
           [15, 12, 2, 0, 17], 
           [27, 4, 18, 17, 0]]

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
            [5, 18, 5, 10, 6, 0, 7, 19, 19,6], 
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


def calcularFactorial(n):
    if n > 0:
        n = n * calcularFactorial (n - 1)
    else:
        n = 1
    return n

ciudades = [1, 2, 3, 4, 5] # original
ciudadesAlgoritmo = [[]]
ciudadesAlgoritConInversos = []

ciudadesAlgoritmo[0] = ciudades[:]

contador1 = 0 #vueltas de bucle
contador2 = 0 #instruccion2
contador3 = 3 #instruccion3

mitadFactorial = calcularFactorial(len(ciudades)) / 2


while contador1 < mitadFactorial -1:
    
    for i in range(len(ciudades) - 1): #ESTO OK
        ciudades.append(ciudades[0])
        ciudades.pop(0)
        ciudadesAlgoritmo.append(ciudades[:])
        contador1 = contador1 + 1

    if contador2 < len(ciudades) - 2:
        ciudades.insert(2, ciudades[0]) 
        ciudades.pop(0)
        ciudadesAlgoritmo.append(ciudades[:])
        contador2 = contador2 + 1
    elif contador2 >= len(ciudades) - 2 and contador1 < mitadFactorial -1 :
        contador2 = 0
        ciudades.insert(contador3, ciudades[0])
        ciudades.pop(0)
        ciudadesAlgoritmo.append(ciudades[:])
        contador3 = contador3 + 1
    
    contador1 = contador1 + 1


##### COSAS QUE FALTAN #####

#obtener y comprobar en cada iteracion la distancia total y mostrar los datos y el numero de iteraciones

#implementar la obtencion de la matriz orginal desde el archivo csv y comprobar su funcionamiento



#GUARDA EN CIUDADESALGORITMOCONINVERSOS TODAS LAS PERMUTACIONES CON SUS INVERSOS
for i in range(len(ciudadesAlgoritmo)):
    ciudadesAlgoritConInversos.append(ciudadesAlgoritmo[i][:])
    ciudadesAlgoritConInversos.append(ciudadesAlgoritmo[i][::-1])

#OBTIENE TODAS LAS PERMUTACIONES DE LAS CIUDADES
ciudadesPermu = []
import itertools
for p in itertools.permutations(ciudades):#obtiene todas las permutacion en forma de lista
    x = []
    for i in range(len(p)):#convierte la lista en un array añadiendo los elemento 1 por 1 al array 
        x.append(p[i])
    ciudadesPermu.append(x)#añade el array a ciudades (array de arrays)

print("\n ")

print("CIUDADES TOTAL:")
print(len(ciudadesPermu))
#print(ciudadesPermu)

print("\n ")

print("CIUDADES ALGORITMO:")
print(len(ciudadesAlgoritmo))
#print(ciudadesAlgoritmo)

print("\n ")

print("CIUDADES ALGORITMO + INVERSOS:")
print(len(ciudadesAlgoritConInversos))
#print(ciudadesAlgoritConInversos)

print("\n ")
print("-------------------------------------------------------------")
print("\n ")


'''
#COMPROBAR
#se copia auxiliar2 a otro array(auxiliar2copia) y ciudadesPermu a otro array (ciudadesPermuCopia) para recorrer auxiliar2 buscando coincidencias en ciudadesPermu
#y se borran de auxiliar2copia y de ciudadesPermuCopia las coincidencias y al final se comprueban la longitud y el contenido de auxiliar2copia y de ciudadesPermuCopia
#tendrian que estar vacios, si queda alguno en ciudadesPermuCopia es que el algoritmo no ha sacado esa combinacion, si queda alguno en auxiliar2copia es que ha sacado
#mas opciones de las que deberia o ha repetido alguna dejando alguna permutacion sin sacar (la cual se reflejara en ciudadesPermuCopia)
auxiliar2copia = ciudadesAlgoritConInversos[:]
ciudadesPermuCopia = ciudadesPermu[:]

print("\n ")

print("AUXILIAR2COPIA:")
print(len(auxiliar2copia))
#print(auxiliar2copia)

print("\n")

print("CIUDADESPERMUCOPIA:")
print(len(ciudadesPermuCopia))
#print(ciudadesPermuCopia)

print("\n ")
print ("-------------------------------------------------")
print("\n ")

for i in range(len(ciudadesAlgoritConInversos)):
    for j in range(len(ciudadesPermu)):
        if ciudadesAlgoritConInversos[i] == ciudadesPermu[j]:
            #auxiliar2copia.remove(ciudadesAlgoritConInversos[i])
            #ciudadesPermuCopia.remove(ciudadesPermu[j])
            print (i)
            auxiliar2copia[i] = ("Z")
            ciudadesPermuCopia[i] = ("Z")

print("\n ")     

print ("AUXILIAR2COPIA:")     
print (len(auxiliar2copia))
print (auxiliar2copia)

print("\n ")

print ("CIUDADESPERMUCOPIA:")
print (len(ciudadesPermuCopia))
print (ciudadesPermuCopia)

print("\n ")
'''