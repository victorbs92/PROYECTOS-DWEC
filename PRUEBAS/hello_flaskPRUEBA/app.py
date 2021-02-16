#IMPORTS
from flask import Flask, render_template, request, redirect, url_for
from helper import recipes, types, descriptions, ingredients, instructions, add_ingredients, add_instructions, comments
from forms import RecipeForm, CommentForm

#define la variable app para inicializar el programa con FLASK
app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret' #establece una clave secreta a app utilizada hacer el envio de datos seguro


@app.route('/', methods=["GET", "POST"]) #decorador que marca una ruta y el uso del metodo GET o POST
def index(): #cuando se accede a la ruta que marca el decorador se ejecuta esta funcion
    recipe_form = RecipeForm(csrf_enabled=False) #crea un nuevo form
    if recipe_form.validate_on_submit():  #si los datos enviados son validados ejecuta todas las lineas siguientes
        new_id = len(recipes)+1
        recipes[new_id] = recipe_form.recipe.data
        types[new_id] = recipe_form.recipe_type.data
        descriptions[new_id] = recipe_form.description.data
        new_igredients = recipe_form.ingredients.data
        new_instructions = recipe_form.instructions.data
        add_ingredients(new_id, new_igredients)
        add_instructions(new_id, new_instructions)
        comments[new_id] = []

    #la funcion devuelve un render_template que pinta el html en index.html pasandole los datos de la funcion
    return render_template("index.html", template_recipes=recipes, template_form=recipe_form)


@app.route("/recipe/<int:id>", methods=["GET", "POST"])#decorador que marca una ruta y el uso del metodo GET o POST
def recipe(id):#cuando se accede a la ruta que marca el decorador se ejecuta esta funcion
    comment_form = CommentForm(csrf_enabled=False)
    if comment_form.validate_on_submit():#si los datos enviados son validados ejecuta todas las lineas siguientes
        new_comment = comment_form.comment.data
        comments[id].append(new_comment)
    #la funcion devuelve un render_template que pinta el html en recipe.html pasandole los datos de la funcion
    return render_template("recipe.html", template_recipe=recipes[id], template_type=types[id], template_description=descriptions[id], template_ingredients=ingredients[id], template_instructions=instructions[id], template_comments=comments[id], template_form=comment_form)


@app.route('/about')#decorador que marca una ruta y el uso del metodo GET o POST
def about():#cuando se accede a la ruta que marca el decorador se ejecuta esta funcion
    #la funcion devuelve un render_template que pinta el html en about.html 
    return render_template("about.html")


use_c9_debugger = False #establecido que no se use el debugger al ejecutar
app.run(use_debugger=not use_c9_debugger, debug=True,
        use_reloader=not use_c9_debugger, host='0.0.0.0', port=8080)
