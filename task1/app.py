#from app import app
#from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask import Flask, request, jsonify, abort, Response

app=Flask(__name__)
#if database name is db1 username-root, password-''

# app.config["MYSQL_HOST"] = "localhost"
# app.config["MYSQL_USER"] = "root"
# app.config["MYSQL_PASSWORD"] = ""
# app.config["MYSQL_DB"] = "scriptorium"

app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:''@localhost/db1'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False 

db=SQLAlchemy(app)
CORS(app)

class buyer(db.Model):
    buyer_name=db.Column(db.String(80),primary_key=True)
    def __init__(self, buyer_name):
        self.buyer_name = buyer_name

db.create_all()


@app.route('/api/buyer/create_user',methods=['POST'])
def buyer_create_user():
	buyer_name = request.form.get("name")
	try:
		x = buyer(buyer_name)
		#setattr(x,"buyer_name",buyer_name)
		db.session.add(x)
		db.session.commit()
		status = buyer_name

	except:
		status = buyer_name
	
	return jsonify(data = status)
