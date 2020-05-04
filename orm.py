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
    buyer_id=db.Column(db.String(10),primary_key=True)	#to be generated randomly
	buyer_email=db.Column(db.String(40),nullable=False)
	#preprocessing to be done before accepting the phone number
	buyer_number=db.Column(db.String(10),nullable=False)
	buyer_pwd=db.Column(db.String(20),nullable=False)

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
	product_cost=db.Column(db.Integer(5,2),nullable=False)
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
    cost=db.Column(db.Integer,nullable=False)		#quantity*product_cost
    expiry=db.Column(db.String,nullable=False)
    prod_relationship=relationship("product",backref = "inventory")

    def __init__(self, sl_no, prod_id,quantity,cost,expiry):
        self.sl_no = sl_no
        self.prod_id = prod_id
        self.quantity=quantity
        self.cost=cost
        self.expiry=expiry
db.create_all()
#creates the tables
#seller1=seller.query.first()
#seller1.products gives the list or products the seller has entered using the relation specified

#given product id return all details
@app.route('/api/product/product_home',methods=['POST'])
def seller_create_user():
    prod_id = request.json['product_id']
    res = product.query.filter_by(product_id=prod_id).first()
    response_dict={}
    response_dict["product_name"]=res.product_name
    response_dict["product_cost"]=res.product_cost
    response_dict["return_by"]=res.product_name
    response_dict["product_seller"]=res.product_seller
    return jsonify(response_dict)

#add to inventory
@app.route('/api/update_inventory',methods=['POST'])
def update_inventory():
    prod_id = request.json['product_id']
    cost = request.json['cost']
    expiry = request.json['expiry']
    quantity = request.json['quantity']
    sl_no = len(inventory.query.all())+1
    x = inventory(sl_no,prod_id,quantity,cost,expiry)
    db.session.add(x)
    db.session.commit()
    status = "added"
    return jsonify(data = status)

#send store id get all product ids
@app.route('/api/seller/get_all_products',methods=['POST'])
def get_all_products():
    seller_id=request.json['seller_id']
    res = product.query.filter_by(product_seller=seller_id).all()
    result=[i.product_id for i in res]
    return jsonify(result)
if __name__ == '__main__':
    app.run(debug=True)
