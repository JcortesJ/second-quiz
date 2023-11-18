from flask import Flask, request
from flask_cors import CORS
from bigQueryCon import standard_query,state_query,species_query,state_species_query

app = Flask(__name__)
CORS(app)

todos = []
todo_id_counter = 1


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


if __name__ == "__main__":
    app.run()
