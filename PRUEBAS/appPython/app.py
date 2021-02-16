#python -m flask run

# IMPORTS
import multiprocessing
import os
import sys
import numpy as np
import FuerzaBrutaPruebas
import MontecarloFINAL
import time
import random
from multiprocessing.context import Process
from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
'''
import itertools
import math
import random
import threading
import psutil

'''


#VARIABLES
hiloFuerzaBruta=None
hiloMontecarlo=None
hiloCronometro=None
comenzar = None
terminar = None
pararProcesos = None


app = Flask(__name__)


#CABECERAS Y METODOS
@app.after_request #ESTE DE CORADOR SE EJECUTA CADA VEZ QUE SE REALIZA UNA PETICION AL SERVIDOR
def add_header(r): #ESTA FUNCION AÑADE UNAS CABECERAS PARA QUE SE VACIE LA CACHE DEL SERVIDOR CADA VEZ QUE SE EJECUTA, sirve para que el programa no guarde la informacion del archivo txt leido anteriormente en la cache y pueda leer otro de nuevo
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r


@app.route("/", methods=["GET", "POST"])
def index():
    
    try:
        global comenzar
        global terminar
        global pararProcesos

        print (request.form)
        print (request.files)
        
        comenzar = request.form.get("botonComenzar")
        #comenzar = request.form['botonComenzar']
        
        terminar = request.form.get("botonTerminar")
        #terminar = request.form['botonTerminar']

        pararProcesos = request.form.get("pararProcesos")
        #pararProcesos = request.form['pararProcesos']

        print(f'terminar: {terminar}')
        print(f'comenzar: {comenzar}')
        print(f'parar: {pararProcesos}')
        
        minutos = request.form.get("minutosEjecucion")

        if(comenzar != None):
            file = request.files['matriz'] #guarda en una variable el file recogido en el inputFile del html y que se pasa por el post 
            matriz = np.loadtxt(file, delimiter=",")
            print(f'file: {file}')
            print(matriz)
            print ("AAAAAAAAAAA")
            global hiloCronometro #Creamos el hilo hijo del hilo principal, que se encargará de llevar la cuenta del tiempo de ejecucion y de crear a su vez, hilos hijos para la ejecucuion de los algoritmos
            hiloCronometro = multiprocessing.Process(name='hiloGestor',
                    target=cronometro,
                    args=(minutos, ),
                    daemon=True)
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

            minutos = request.form.get("minutosEjecucion")
            print(f'comenzar: {minutos}')

            #print(minutos)

            iniciarPrograma()

            return render_template("index.html", template2='minutos' + minutos)
        elif (terminar != None):
            finalizarProcesos()
            return render_template("index.html", template2="VVVVVVVVVV")
        elif (pararProcesos == "si"):

            finalizarProcesos()
            return render_template("index.html", template2="JJJJJJJJ")
        else:
            return render_template("index.html", template2="aaa" )
            
    except:
        return render_template("index.html", template2="bbb" )   


def iniciarPrograma():
    print("KKKKKKKKKKKKKKKKKKK")
    
    
    #llamamos por cada hilo a un algoritmo distinto
    hiloCronometro.start()
    hiloFuerzaBruta.start()
    hiloMontecarlo.start()
    
    #print (minutos)
    
    '''
    for x in range (int(minutos) * 60):
        print (x)
        time.sleep(1)
    '''   
    print ("MMMMMMMMMMMMMMM") 
    
    #hiloFuerzaBruta.terminate()
    #hiloMontecarlo.terminate()
    #hiloFuerzaBruta.join()
    #hiloMontecarlo.join()


def cronometro(minutos):
    for x in range (int(minutos) * 60):
        print (x)
        time.sleep(1)
    #pararProgramaConTiempo() ###################NOOOOOOO LOOOOOOS PAAAAAARA


def finalizarProcesos():
    print("RRRRRRRRRRRRRRR")
    global hiloCronometro
    global hiloFuerzaBruta
    global hiloMontecarlo
    hiloFuerzaBruta.terminate()
    hiloMontecarlo.terminate()
    hiloCronometro.terminate()
    hiloFuerzaBruta.join()
    hiloMontecarlo.join()
    hiloCronometro.join()
'''
def pararProgramaConTiempo():
    global hiloFuerzaBruta
    global hiloMontecarlo
    hiloFuerzaBruta.terminate()
    hiloMontecarlo.terminate()
    hiloFuerzaBruta.join()
    hiloMontecarlo.join()
    
    
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
