#python -m flask run

# IMPORTS
import multiprocessing
import os
import sys
import numpy as np
import FuerzaBrutaPruebas
import MontecarloFINAL
from multiprocessing.context import Process
from flask import Flask, render_template, request
'''
import itertools
import math
import random
import threading
import time
import psutil
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
'''


#VARIABLES
hiloFuerzaBruta=None
hiloMontecarlo=None

app = Flask(__name__)

#abrimos el csv y cargamos la matriz con los datos del csv
file = open(os.path.join(sys.path[0], "sampleSinCeros15.csv"), "r")
matriz = np.loadtxt(file, delimiter=",")

print (file)

#CABECERAS Y METODOS
@app.route("/", methods=["GET", "POST"])
def index():
    
    try:

        comenzar = request.args.get("botonComenzar")
        terminar = request.args.get("botonTerminar")
        #print(f'comenzar: {comenzar}')
        #print(f'terminar: {terminar}')
        
        if(comenzar != None):
            #creamos los hilos de ejecucion
            global hiloFuerzaBruta
            hiloFuerzaBruta = multiprocessing.Process(name='fuerzaBruta', 
                         target=FuerzaBrutaPruebas.fuerzaBruta,
                         args=(matriz,),
                         daemon=True)
            global hiloMontecarlo
            hiloMontecarlo = multiprocessing.Process(name='montecarlo',
                        target=MontecarloFINAL.montecarlo,
                        args=(matriz,),
                        daemon=True)

            iniciarPrograma()
            minutos = request.args.get("minutosEjecucion")
            
            return render_template("index.html", template2='minutos' + minutos)
        elif (terminar != None):
            pararPrograma()
            return render_template("index.html", template2="VVVVVVVVVV")
        else:
            return render_template("index.html", template2="aaa" )
            
    except:
        return render_template("index.html", template2="bbb" )   


def iniciarPrograma():
    print("KKKKKKKKKKKKKKKKKKK")
    #llamamos por cada hilo a un algoritmo distinto
    hiloFuerzaBruta.start()
    hiloMontecarlo.start()


   
    '''
    for hilo in threading.enumerate():
        print("EEEEEEEEEEEE")
        if hilo is threading.main_thread:
            continue
        print(hilo.getName(), 
          hilo.ident, 
          hilo.isDaemon(), 
          threading.active_count())
    '''

def pararPrograma():
    print("RRRRRRRRRRRRRRR")
    hiloFuerzaBruta.terminate()
    hiloMontecarlo.terminate()
    
    '''
    for hilo in threading.enumerate():
        print("FFFFFFFFF")
        if hilo.name == "MainThread":
            print("LLLLLLLLLLLLLLLL")
            print(hilo.getName(), 
              hilo.ident, 
              hilo.isDaemon(), 
              threading.active_count())
            
        else:
            print("ZZZZZZZZZZZZZ")
            print(hilo.getName(), 
              hilo.ident, 
              hilo.isDaemon(), 
              threading.active_count())
    '''            
