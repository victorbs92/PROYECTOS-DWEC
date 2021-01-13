# cargo los datos en una matriz
import random

matriz5 = [
    [0, 26, 17, 15, 27],
    [26, 0, 15, 12, 4],
    [17, 15, 0, 2, 18],
    [15, 12, 2, 0, 17],
    [27, 4, 18, 17, 0]
]

matriz7 = [
    [0, 3, 18, 10, 12, 17, 18],
    [3, 0, 11, 20, 8, 16, 1],
    [18, 11, 0, 0, 20, 14, 11],
    [10, 20, 0, 0, 9, 8, 14],
    [12, 8, 20, 9, 0, 13, 17],
    [17, 16, 14, 8, 13, 0, 13],
    [18, 1, 11, 14, 17, 13, 0]
]

matriz10 = [
    [0, 0, 7, 4, 11, 5, 4, 19, 1, 4],
    [0, 0, 10, 3, 18, 18, 1, 7, 13, 13],
    [7, 10, 0, 10, 4, 5, 18, 17, 13, 11],
    [4, 3, 10, 0, 20, 10, 0, 11, 18, 14],
    [11, 18, 4, 20, 0, 6, 10, 6, 0, 0],
    [5, 18, 5, 10, 6, 0, 7, 19, 19, 6],
    [4, 1, 18, 0, 10, 7, 0, 0, 3, 1],
    [19, 7, 17, 11, 6, 19, 0, 0, 2, 5],
    [1, 13, 13, 18, 0, 19, 3, 2, 0, 15],
    [4, 13, 11, 14, 0, 6, 1, 5, 15, 0]
]

matriz = [
    [0, 14, 46, 15, 42, 2, 34, 43, 9, 1, 5, 24, 34, 42, 2],
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
    [2, 49, 33, 42, 31, 34, 21, 14, 38, 32, 46, 3, 5, 32, 0]
]

# PROCESO EXPLICADO PARA 4 CIUDADES, EMPEZAR POR LA CIUDAD 0 E IR AVANZANDO -> EXTRAPOLAR PARA APLICARLO CON 2 HILOS 


# OBTENER LA SUMA DE LA DISTANCIAS ENTRE CIUDADES EMPEZANDO POR LA 0 Y AVANZANDO DE MANERA ORDENADA Y VOLVER A LA PRIMERA (0, 1, 2, 3, 0)

# GUARDAR EL VALOR DE LA SEGUNDA CIUDAD (EN ESTE CASO: 1)

# PERMUTAR LAS CIUDADES DE LA SIGUIENTE FORMA:

# EN CADA ITERACION DEL BUCLE LA 2ª CIUDAD PASARÁ A SER LA PENULTIMA DESPLAZANDO A TODAS LAS DEMAS CIUDADES HACIA LA IZQUIERDA (0, 2, 3, 1, 0)
# CON ESTA PERMUTACION SIMPLE CONSEGUIMOS EVITAR LAS RUTAS INVERSAS DE LAS QUE YA TENDRIAMOS RESULTADOS, OPTIMIZANDO EL PROGRAMA

# CON UN IF AL PRINCIPIO DEL BUCLE COMPROBAMOS QUE EN LA ITERACION ACTUAL LA 2ª CIUDAD NO SEA LA MISMA QUE LA QUE APUNTAMOS ANTERIORMETE
# EN CASO DE QUE LO SEA, PASAREMOS A MODIFICAR LA CIUDAD DE INICIO POR LA SIGUIENTE (EN ESTE CASO: 1) Y PONIENDO LA CIUDAD INICIAL ANTERIOR EN 
# PENULTIMA POSICIÓN (1, 2, 3, 0, 1) Y REPETIR EL PROCESO DE MEDICION DE DISTANCIAS
# (0, 1, 2, 3, 0) - (1, 2, 3, 0, 1) - (2, 3, 0, 1, 2) - (3, 0, 1, 2, 3)



# ¡¡¡¡EN EL CASO DE QUERER REALIZAR ESTE ALGORITMO CON 2 HILOS DE EJECUCIÓN, UNO QUE EMPIECE POR LA PRIMERA CIUDAD Y OTRO QUE EMPIECE POR LA ÚLTIMA!!!:
# ***TAMBIÉN PODRÍA REALIZARSE CON UN HILO ACCEDIENDO A LAS CIUDADES INICALES PARES Y OTRO A LAS IMPARES... O LO QUE SE QUIERA***

# SE CREARAN LOS 2 HILOS DE EJECUCION Y EL PRIMERO REALIZARÁ TODAS LAS INSTRUCCIONES ANTERIORES Y EL SEGUNDO HARÁ LO MISMO PERO EMPEZANDO POR LA ÚLTIMA
# CIUDAD DISPONIBLE E IRÁ BAJANDO DE CIUDAD CUANDO COMPLETE TODAS LAS PERMUTACIONES

#  


ciudades = ["a","b","c","d","e"]
auxiliar =[[]]
auxiliar2 =[[]]

auxiliar[0]  = ciudades
auxiliar2[0]  = ciudades

contador1 = 0
contador2 = 0
contador3 = 0 
print (ciudades)
#4 veces
for i in range(len(ciudades)-1):
    ciudades.append(ciudades[0])
    ciudades.pop(0)
    auxiliar.append(ciudades)
    print (ciudades)
#1>2
ciudades.insert(2, ciudades[0])
ciudades.pop(0)
auxiliar.append(ciudades)
print ("cambio")
print (ciudades)
print ("permutar")
#4 veces
for i in range(len(ciudades)-1):
    ciudades.append(ciudades[0])
    ciudades.pop(0)
    auxiliar.append(ciudades)
#1>2
ciudades.insert(2, ciudades[0])
ciudades.pop(0)
auxiliar.append(ciudades)
print ("cambio")
print (ciudades)
print ("permutar")
#4 veces
for i in range(len(ciudades)-1):
    ciudades.append(ciudades[0])
    ciudades.pop(0)
    auxiliar.append(ciudades)

#1>2
ciudades.insert(2, ciudades[0])
ciudades.pop(0)
auxiliar.append(ciudades)
print ("cambio")
print (ciudades)
#4 veces
for i in range(len(ciudades)-1):
    ciudades.append(ciudades[0])
    ciudades.pop(0)
    auxiliar.append(ciudades)
    print (ciudades)
#1>3
ciudades.insert(3, ciudades[0])
ciudades.pop(0)
auxiliar.append(ciudades)
print ("cambio")
print (ciudades)
#4 veces
for i in range(len(ciudades)-1):
    ciudades.append(ciudades[0])
    ciudades.pop(0)
    auxiliar.append(ciudades)
    print (ciudades)
#1>2
ciudades.insert(2, ciudades[0])
ciudades.pop(0)
auxiliar.append(ciudades)
print ("cambio")
print (ciudades)
print ("permutar")
#4 veces
for i in range(len(ciudades)-1):
    ciudades.append(ciudades[0])
    ciudades.pop(0)
    auxiliar.append(ciudades)
#1>2
ciudades.insert(2, ciudades[0])
ciudades.pop(0)
auxiliar.append(ciudades)
print ("cambio")
print (ciudades)
print ("permutar")
#4 veces
for i in range(len(ciudades)-1):
    ciudades.append(ciudades[0])
    ciudades.pop(0)
    auxiliar.append(ciudades)
#1>2
ciudades.insert(2, ciudades[0])
ciudades.pop(0)
auxiliar.append(ciudades)
print ("cambio")
print (ciudades)
#4 veces
for i in range(len(ciudades)-1):
    ciudades.append(ciudades[0])
    ciudades.pop(0)
    auxiliar.append(ciudades)
    print (ciudades)
#1>4
ciudades.insert(4, ciudades[0])
ciudades.pop(0)
auxiliar.append(ciudades)
print ("cambio")
print (ciudades)
#4 veces
for i in range(len(ciudades)-1):
    ciudades.append(ciudades[0])
    ciudades.pop(0)
    auxiliar.append(ciudades)
    print (ciudades)
#1>2
ciudades.insert(2, ciudades[0])
ciudades.pop(0)
auxiliar.append(ciudades)
print ("cambio")
print (ciudades)
print ("permutar")
#4 veces
for i in range(len(ciudades)-1):
    ciudades.append(ciudades[0])
    ciudades.pop(0)
    auxiliar.append(ciudades)
#1>2
ciudades.insert(2, ciudades[0])
ciudades.pop(0)
auxiliar.append(ciudades)
print ("cambio")
print (ciudades)
print ("permutar")
#4 veces
for i in range(len(ciudades)-1):
    ciudades.append(ciudades[0])
    ciudades.pop(0)
    auxiliar.append(ciudades)
print (auxiliar)
print ("tetest")
#1>2
ciudades.insert(2, ciudades[0])
ciudades.pop(0)
auxiliar.append(ciudades)
print ("cambio")
print (ciudades)
#4 veces
for i in range(len(ciudades)-1):
    ciudades.append(ciudades[0])
    ciudades.pop(0)
    auxiliar.append(ciudades)
    print (ciudades)
print  (auxiliar)
print  (len(auxiliar))
for i in auxiliar:
    auxiliar2.append(auxiliar[contador1])
    auxiliar2.append(auxiliar[contador1].reverse())
    contador1 = contador1+1
print  (auxiliar2)
print  (len(auxiliar2))