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

@app.route("/", methods=["GET", "POST"])
def index():

    try:
        minutos = request.args.get("minutosEjecucion")
        if(minutos != '' and minutos != None):
            iniciarPrograma()
            return render_template("index.html", template2='minutos' + minutos)
        else:

            return render_template("index.html", template2="VVVVVVVVVV")
    except:
        return render_template("index.html", template2="aa" )   


def iniciarPrograma():
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


