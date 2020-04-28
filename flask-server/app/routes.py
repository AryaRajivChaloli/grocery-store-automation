from app import app
#I think we have to include content of orm.py here 
@app.route('/')
@app.route('/api/buyer/create_user',methods=['GET','POST'])
def buyer_create_user():
	json_data = request.json
	buyer_name = json_data('buyer') #I'm assuming the id given to it is buyer in the client side
	try:
		x = buyer()
		setattr(x,"buyer_name",buyer_data)
		db.session.add(x)
		db.session.commit()
		status = "Buyer added"

	except:
		status = "The buyer already exists"
	db.session.close()
	return jsonify({'result':status})
