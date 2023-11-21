from flask import Flask, request
from flask_cors import CORS
from bigQueryCon import standard_query,state_query,species_query,state_species_query
from mysqlCon import bringAllusers,verifyUsername,insertUser,saveQueryUser,insertComment,getQueryId


app = Flask(__name__)
CORS(app)

todos = []
todo_id_counter = 1

#Read - only BigQuery queries

@app.route("/api/findTree/<int:firstYear>,<int:lastYear>,<int:initialDiameter>,<int:initialHeight>,<int:limit>", methods=["GET"])
#this query returns all data without specifying state or species
def regularQuery(firstYear,lastYear,initialDiameter=0,initialHeight=0,limit=100):
    return standard_query(firstYear=firstYear,lastYear=lastYear,initialDiameter=initialDiameter,initialHeight=initialHeight,limit=limit)

@app.route("/api/findState/<int:stateCode>,<int:firstYear>,<int:lastYear>,<int:initialDiameter>,<int:initialHeight>,<int:limit>", methods=["GET"])
#This query returns all data by a state
def stateQuery(stateCode,firstYear,lastYear,initialDiameter=0,initialHeight=0,limit=100):
    return state_query(stateCode=stateCode,firstYear=firstYear,lastYear=lastYear,initialDiameter=initialDiameter,initialHeight=initialHeight,limit=limit)

@app.route("/api/findStateS/<string:speciesName>,<int:stateCode>,<int:firstYear>,<int:lastYear>,<int:initialDiameter>,<int:initialHeight>,<int:limit>", methods=["GET"])
#This query returns all data by a state and a species
def stateSpeciesQuery(speciesName,stateCode,firstYear,lastYear,initialDiameter=0,initialHeight=0,limit=100):
    speciesName = speciesName.replace("%20"," ")
    return state_species_query(speciesName=speciesName,stateCode=stateCode,firstYear=firstYear,lastYear=lastYear,initialDiameter=initialDiameter,initialHeight=initialHeight,limit=limit)

@app.route("/api/findSpecies/<string:speciesName>,<int:firstYear>,<int:lastYear>,<int:initialDiameter>,<int:initialHeight>,<int:limit>", methods=["GET"])
#This query returns all data by a state and a species
def speciesQuery(speciesName,firstYear,lastYear,initialDiameter=0,initialHeight=0,limit=100):
    speciesName = speciesName.replace("%20"," ")
    return species_query(speciesName=speciesName,firstYear=firstYear,lastYear=lastYear,initialDiameter=initialDiameter,initialHeight=initialHeight,limit=limit)

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

# READ MySQL queries

@app.route("/api/users",methods=["GET"])
def readAllUsers():
    return bringAllusers()

@app.route("/api/users/verify/<string:username>",methods=["GET"])
def verifyLogin(username):
    return verifyUsername(userName=username)

@app.route("/api/users/create/<string:email>,<string:username>",methods=["GET"])
def createUser(email,username):
    return insertUser(username=username,email=email)

@app.route("/api/queries/create/<string:speciesName>,<int:stateCode>,<int:firstYear>,<int:lastYear>,<int:initialDiameter>,<int:initialHeight>,<int:limit>,<string:username>,<string:name>,<string:query_id>",methods=["GET"])
def saveQuery(speciesName,stateCode,firstYear,lastYear,initialDiameter,initialHeight,limit,username,name,query_id):
    speciesName = speciesName.replace("%20"," ")
    return saveQueryUser(username=username,queryname=name,state=stateCode,species=speciesName,diameter=initialDiameter,height=initialHeight,inYear=firstYear,finYear=lastYear,limits=limit,query_id=query_id)

@app.route("/api/queries/comment/<string:query_id>,<string:username>,<string:comment>",methods=["GET"])
def saveComment(query_id,username,comment):
    comment = comment.replace("%20"," ")
    return insertComment(query_id,username=username,comment=comment)

@app.route("/api/queries/comments/<string:query_id>",methods=["GET"])
def getComments(query_id):
    return getQueryId(query_id)




    

if __name__ == "__main__":
    app.run()
