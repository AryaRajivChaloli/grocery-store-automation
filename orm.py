from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify, abort, Response

app=Flask(__name__)
#if database name is db1 username-root, password-''
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:''@localhost/db1'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False 

db=SQLAlchemy(app)

class buyer(db.Model):
    buyer_name=db.Column(db.String(80),primary_key=True)
    def __init__(self,buyer_name):
        self.buyer_name=buyer_name

db.create_all()
#creates the tables

