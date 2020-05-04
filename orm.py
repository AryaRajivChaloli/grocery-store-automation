from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify, abort, Response
from sqlalchemy.orm import relationship

app=Flask(__name__)
#if database name is db1 username-root, password-''
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:''@localhost/db1'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False 

db=SQLAlchemy(app)

class buyer(db.Model):
    buyer_name=db.Column(db.String(80),primary_key=True)
    def __init__(self,buyer_name):
        self.buyer_name=buyer_name

class seller(db.Model):
	__tablename__="seller"
	seller_name=db.Column(db.String(80),nullable=True)
	seller_id=db.Column(db.String(10),primary_key=True)	#to be generated randomly
	seller_email=db.Column(db.String(40),nullable=False)
	#preprocessing to be done before accepting the phone number
	seller_number=db.Column(db.String(10),nullable=False)
	seller_pwd=db.Column(db.String(20),nullable=False)


class product(db.Model):
	__tablename__="product"
	product_name=db.Column(db.String(20),nullable=False)
	product_id=db.Column(db.String(10),primary_key=True)	# to be generated randomly
	product_cost=db.Column(db.DECIMAL(5,2),nullable=False)
	return_by=db.Column(db.Date(),nullable=False)
	#defining a one-to-many relationship between seller and product
	product_seller=db.Column(db.String(10),db.ForeignKey("seller.seller_id"))
	prod_seller=relationship("seller",backref="product")

seller.products = relationship("product", order_by = product.product_id, backref = "seller")

class inventory(db.Model):
	__tablename__="inventory"
	sl_no=db.Column(db.Integer,primary_key=True)		#to be generated sequentially
	prod_id=db.Column(db.String(10),db.ForeignKey("product.product_id"),nullable=False)
	quantity=db.Column(db.Integer,nullable=False)
	cost=db.Column(db.DECIMAL(10,2),nullable=False)		#quantity*product_cost
	expiry=db.Column(db.Date,nullable=False)
	prod_relationship=relationship("product",backref = "inventory")

db.create_all()
#creates the tables
#seller1=seller.query.first()
#seller1.products gives the list or products the seller has entered using the relation specified

