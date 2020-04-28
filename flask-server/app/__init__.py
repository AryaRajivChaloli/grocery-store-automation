from flask import Flask
app = Flask(__name__)  
#creates an application object as an instance of class flask imported from the package
#__name__ is a python predefined variable set to name of the module in which it is used
from app import routes

