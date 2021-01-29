from flask import Flask, render_template, request
from helper import recipes, descriptions, ingredients, instructions, add_ingredients, add_instructions

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
  new_id = len(recipes) + 1
  if len(request.form) > 0:
    #### Add the recipe name to recipes[new_id] 
    recipes[new_id]=request.form["recipe"]
    #### Add the recipe description to descriptions[new_id]
    descriptions[new_id]=request.form["description"]
    #### Add the values to new_ingredients and new_instructions
    new_ingredients = request.form["ingredients"]
    new_instructions = request.form["instructions"]
    add_ingredients(new_id, new_ingredients)
    add_instructions(new_id, new_instructions)
  return render_template("index.html", template_recipes=recipes)

@app.route("/recipe/<int:id>")
def recipe(id):
  return render_template("recipe.html", template_recipe=recipes[id], template_description=descriptions[id], template_ingredients=ingredients[id], template_instructions=instructions[id])

@app.route("/about")
def about():
  return render_template("about.html")