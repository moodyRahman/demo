from functools import wraps
from flask import *
from flask_cors import CORS
import jwt

import json
app = Flask(__name__)
secret_key = "kjsdfnkdjfngfdj"
CORS(app)

postdata = [
	{
		"title": "mood",
		"body": "doom"
	},
	{
		"title": "fido",
		"body": "fifo"
	},
	{
		"title": "esketit",
		"body": "dgfdsgf"
	},
]


def jwtverify(route):
	@wraps(route)
	def wrapper(*args, **kwargs):
			try:
				print(request.headers["Authorization"])
				decoded = jwt.decode(request.headers["Authorization"], secret_key, algorithms="HS256")
				user = decoded["username"]
				print(user)
				return route(*args, **kwargs)
			except Exception as e:
				print(e)
				return {"status":403}
	return wrapper

@app.route("/api", methods=["GET", "POST"])
@jwtverify
def api():
	print("YOUVE BEEN VERIFIED")
	out = {}
	out["status"] = 200
	out["posts"] = postdata
	return out

@app.route("/auth", methods=["POST"])
def auth():
	data = request.get_json()
	
	if (data["username"] != "mood") or (data["password"] != "doof"):
		return {'status':401}

	payload = {
		"username":"moody"
	}
	encoded = jwt.encode(payload, secret_key, algorithm="HS256")
	return {
		"token":encoded,
		"status":200
		}

@app.route("/jwt_test")
def debug():
	return render_template("jwt.html")

@app.route("/login")
def login():
	session["user"] = "mood"
	return {"status":"success"}


@app.route("/logout")
def logout():
	session.pop("user")
	return {"status": "success"}


@app.route("/query")
def query():
	return {"user": session["user"] if "user" in session else "no one"}

if __name__ == "__main__":
	app.run(debug=True)


