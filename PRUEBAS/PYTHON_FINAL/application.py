#python -m flask run
#python -m  pip freeze > requirements.txt

# IMPORTS
import multiprocessing
import numpy as np
import FuerzaBrutaFINAL
import MontecarloFINAL
import VecinoMasCercanoFINAL
from flask import Flask, render_template, request, url_for, redirect


#VARIABLES
hiloFuerzaBruta=None
hiloMontecarlo=None
hiloVecinoMasCercano=None
comenzar = None
terminar = None
pararProcesos = None


application = Flask(__name__)

if __name__ == "__main__":
    application.run()


#DECORADORES Y METODOS
@application.after_request #ESTE DE CORADOR SE EJECUTA CADA VEZ QUE SE REALIZA UNA PETICION AL SERVIDOR
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


@application.route("/instrucciones.html", methods=["GET", "POST"])
def instrucciones():
    print("INSTRUCCION")
    return render_template("instrucciones.html")

@application.route("/informacion.html", methods=["GET", "POST"])
def informacion():
    print("INFORMACION")
    return render_template("informacion.html")

@application.route("/", methods=["GET", "POST"])
def index():
    
    try:
        global comenzar
        global terminar
        global pararProcesos
        comenzar = request.form.get("botonComenzar")
        terminar = request.form.get("botonTerminar")
        pararProcesos = request.form.get("pararProcesos")

        if(comenzar != None):
            file = request.files['matriz'] #guarda en una variable el file recogido en el inputFile del html y que se pasa por el post 
            matriz = np.loadtxt(file, delimiter=",") #guarda en la variable matriz los datos de file delimitados por ","

            #creamos los hilos de ejecucion
            global hiloFuerzaBruta
            hiloFuerzaBruta = multiprocessing.Process(name='fuerzaBruta', 
                         target=FuerzaBrutaFINAL.fuerzaBruta,
                         args=(matriz,),
                         daemon=True)
            global hiloMontecarlo
            hiloMontecarlo = multiprocessing.Process(name='montecarlo',
                        target=MontecarloFINAL.montecarlo,
                        args=(matriz,),
                        daemon=True)
            global hiloVecinoMasCercano
            hiloVecinoMasCercano = multiprocessing.Process(name='vecinoMasCercano',
                        target=VecinoMasCercanoFINAL.vecinoMasCercano,
                        args=(matriz,),
                        daemon=True)

            iniciarPrograma()

            return render_template("index.html")

        elif (terminar != None or pararProcesos == "si"):
            finalizarProcesos()
            return render_template("index.html")

        else:
            return render_template("index.html")
            
    except:
        return render_template("index.html")   


def iniciarPrograma():
    #llamamos por cada hilo a un algoritmo distinto
    hiloFuerzaBruta.start()
    hiloMontecarlo.start()
    hiloVecinoMasCercano.start()

def finalizarProcesos():
    global hiloFuerzaBruta
    global hiloMontecarlo
    global hiloVecinoMasCercano
    hiloFuerzaBruta.terminate()
    hiloMontecarlo.terminate()
    hiloVecinoMasCercano.terminate()
    
    
