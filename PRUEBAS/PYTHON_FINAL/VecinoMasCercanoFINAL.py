
#IMPORTS
import numpy as np
from numpy.lib.function_base import append


# VARIABLES
ciudades = [] # array que va a estar cambiando a lo largo de todo el programa, en cada iteracion del algoritmo será una ruta distinta
distanciaRutaCiudadesActual = 0 # variable donde se calcula en cada iteracion del algoritmo la distancia que se obtiene de recorrer el array ciudades y que se resetea en cada iteracion
mensajeRutaCiudadesActual = "" # mensaje donde ir guardando la ruta de ciudades que hay en cada iteracion del bucle

mejorRutaCiudades = []  # donde guardaremos la mejor ruta obtenida hasta el momento
mejorDistanciaRuta = 0  # donde guardaremos la mejor distancia obtenida hasta el momento
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
        mensajeRutaCiudadesActual += (f'Ciudad: {ciudades[i]} => ') #formateamos el mensaje que vamos a mostrar
    mensajeRutaCiudadesActual += (f'Ciudad: {ciudades[len(ciudades)-1]}')#añadimos la ultima ciudad al mensaje
    
    #comparamos la distancia de la ruta actual con la menor distancia obtenida hasta ahora y si es menor actualizamos los datos y los mostramos
    if(distanciaRutaCiudadesActual < mejorDistanciaRuta or mejorDistanciaRuta == 0):
        mejorRutaCiudades = ciudades
        mejorDistanciaRuta = distanciaRutaCiudadesActual
        mensajeMejorRutaCiudades = mensajeRutaCiudadesActual
        mostrarInfo()

    ciudades.pop(len(ciudades) - 1)#borramos la ultima ciudad despues de calcular la distancia de la ruta
    

def mostrarInfo(): # muestra en pantalla la informacion de la ruta
    f = open ('static/VecinoMasCercanoResultados.txt', 'w')
    f.write(f'Iteraciones: {contadorIteraciones} \n')
    f.write(f'Mejor distancia: {mejorDistanciaRuta} \n')
    f.write(f'Mejor ruta: {mensajeMejorRutaCiudades} \n')
    #f.write(f'Ruta actual: {mensajeRutaCiudadesActual} \n')
    #f.write(f'Distancia actual: {distanciaRutaCiudadesActual} \n')
    f.close()


def vecinoMasCercano(matriz):

    global ciudades
    global contadorIteraciones

    for i in range(0, len(matriz)):
        contadorIteraciones = i + 1
        matrizAux = np.copy(matriz)
        calcularRuta(matrizAux, i, 0)
        obtenerYCompararResultados(ciudades, matriz)
        ciudades = []
        

def calcularRuta(matrizAux, indice, cont):

    global ciudades

    # añadimos al array ciudades la ciudad que este en el indice que recibimos por parametro
    ciudades.append(indice)

    # convierte la columna que corresponde al indice del array que se le ha pasado como argumento a la funcion en todo 0
    matrizAux[:, indice] = 0

    cont = cont + 1  # incrementamos el contador en 1

    # si el contador llega al numero de ciudades que hay en la matriz sale de la funcion
    if cont < len(matrizAux):
        # obtiene el valor minimo de un array obviando el 0
        
        ciudadMasCercana = np.min(matrizAux[indice][np.nonzero(matrizAux[indice])])
        
        # devuelve una tupla, el primer valor es un array con los indices donde ha encontrado ese valor min (puede darse el caso de que este repetido y salga mas de un valor) y el segundo valor es el tipo de dato
        indicesConValorMinimo = np.where(matrizAux[indice] == ciudadMasCercana)
        
        # llamamos a la funcion pasandole la matriz, el indice con el que tiene que trabajar y un contador de ciclos
        calcularRuta(matrizAux, indicesConValorMinimo[0][0], cont)


