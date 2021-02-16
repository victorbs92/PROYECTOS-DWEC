#IMPORTS
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, RadioField
from wtforms.validators import DataRequired


#CLASES PARA PINTAR EL HTML CON EL TIPO DE DATOS QUE SE MOSTRARÁN EN EL HTML
class RecipeForm(FlaskForm): 
    #RADIOS
    recipe_categories = [("Breakfast", "Breakfast"), 
                         ("Lunch", "Lunch"), ("Dinner", "Dinner")]
    #INPUT TEXT CON REQUIRED
    recipe = StringField("Recipe", validators=[DataRequired()])

    #INPUT TEXT
    description = StringField("Description")

    #TEXTAREA
    ingredients = TextAreaField("Ingredients")

    #TEXTAREA
    instructions = TextAreaField("Instructions")

    #INPUT SUBMIT
    submit = SubmitField("Add Recipe")

    #PARA DEFINIR QUE RECIPE ES DE TIPO RADIO   
    recipe_type = RadioField("Type", choices=recipe_categories) 


class CommentForm(FlaskForm):
    #INPUT TEXT CON REQUIRED
    comment = StringField("Comment", validators=[DataRequired()])

    #INPUT SUBMIT
    submit = SubmitField("Add Comment")
