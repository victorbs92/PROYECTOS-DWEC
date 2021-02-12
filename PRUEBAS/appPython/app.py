#python -m flask run

# IMPORTS
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


#VARIABLES
hiloFuerzaBruta = None
hiloMontecarlo = None

app = Flask(__name__)


#CABECERAS Y METODOS
@app.route("/", methods=["GET", "POST"])
def index():

    try:
        minutos = request.args.get("minutosEjecucion")
        if(minutos != '' and minutos != None):
            iniciarPrograma(hiloFuerzaBruta, hiloMontecarlo)
            return render_template("index.html", template2='minutos' + minutos)
        else:
            pararPrograma(hiloFuerzaBruta, hiloMontecarlo)
            return render_template("index.html", template2="VVVVVVVVVV")
    except:
        return render_template("index.html", template2="aa" )   


def iniciarPrograma(hiloFuerzaBruta, hiloMontecarlo):
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

def pararPrograma(hiloFuerzaBruta, hiloMontecarlo):
    
    # Obtiene hilo principal

    hilo_ppal = threading.main_thread()

    # Recorre hilos activos para controlar estado de su ejecución

    for hilo in threading.enumerate():

    # Si el hilo es hilo_ppal continua al siguiente hilo activo
        hilo.exit()
    '''
        if hilo is hilo_ppal:
            continue

        print(hilo.getName(), 
          hilo.ident, 
          hilo.isDaemon(), 
          threading.active_count())

        if(hilo.getName() == "fuerzaBruta"):
            print("GGGGGGGGGGG")
            hilo.exit()

    print("JJJJJJJJJJJJJ")
    print(hilo.getName(), 
          hilo.ident, 
          hilo.isDaemon(), 
          threading.active_count())
          '''