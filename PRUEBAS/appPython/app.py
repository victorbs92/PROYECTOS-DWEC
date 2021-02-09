#python -m flask run
import itertools
import random
import math
import os
import sys
import time 
import threading
from numpy.lib.financial import mirr
import FuerzaBrutaFINAL
import MontecarloFINAL
from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
import random
import numpy as np


app = Flask(__name__)


#https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_countdown

def ejecutar():
    #abrimos el csv y cargamos la matriz con los datos del csv
    file = open(os.path.join(sys.path[0], "sampleSinCeros15.csv"), "r")
    matriz = np.loadtxt(file, delimiter=",")


    #creamos los hilos de ejecucion
    hiloFuerzaBruta = threading.Thread(name='fuerzaBruta', 
                             target=FuerzaBrutaFINAL.fuerzaBruta,
                             args=(matriz,),
                             daemon=True)

    hiloMontecarlo = threading.Thread(name='montecarlo',
                             target=MontecarloFINAL.montecarlo,
                             args=(matriz,),
                             daemon=True)


    #llamamos por cada hilo a un algoritmo distinto
    hiloFuerzaBruta.start()
    hiloMontecarlo.start()


    #despues de decirle a los hilos que se ejecuten esperamos en el hilo principal el tiempo que el usuario haya indicado,
    #y despues de ese tiempo matamos el hilo principal, los otros hilos como son demonios que dependen del hilo principal
    #se moriran automaticamente
    #time.sleep(10)
    print("KKKKKKKKKKKKKKKKKKK")
    #sys.exit()




@app.route("/", methods=["GET", "POST"])
def index():
    '''
    arrayRuta = []
    distancia = 0
    mejorRuta = arrayRuta
    mejorDistancia = 0
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
        print("------------")

    
    while contadorIteraciones<99999:
        contadorIteraciones = contadorIteraciones + 1 #incrementamos en 1 el contador de iteraciones
        np.random.shuffle(arrayRuta) #mezclamos el arrayRuta que habiamos cargado anteriormente, en cada nueva iteracion mezcla el arrayRuta que habrá sido mezclado en la iteracion anterior 
        arrayRuta.append(arrayRuta[0]) #añade al final del array el mismo elemento que el primer elemento del array

        #recorremos el array y comprobamos el valor que tiene cada elemento buscandolo en la matriz y lo añadimos a la varaible distancia
        for i in range(0, len(arrayRuta)-1):
            distancia = distancia + matriz[arrayRuta[i]][arrayRuta[i+1]]

        #comprobamos si la distancia obtenida en esta iteracion es mejor que la que ya habia guardada
        if distancia < mejorDistancia or mejorDistancia == 0:
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
        #if contadorIteraciones % 100000 == 0:
        # mostrar(mensaje, mejorDistancia, contadorIteraciones)
    return render_template("index.html", template2=mejorRuta)
   ''' 


    try:
        minutos = request.args.get("minutosEjecucion")
        if(minutos != '' and minutos != None):
            ejecutar()
            return render_template("index.html", template2='minutos' + minutos)
        else:
            return render_template("index.html", template2="VVVVVVVVVV")
    except:
        return render_template("index.html", template2="aa" )   