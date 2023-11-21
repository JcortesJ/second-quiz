import random
from bigQueryCon import createJson
import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="toor",
    database="AllTrees"
)

def bringAllusers():
    cursor = db.cursor()
    #executes a query then
    cursor.execute("SELECT * FROM users")
    values = cursor.fetchall()
    #by default .fetchall() returns a list with tuples inside
    results = {"result":values}
    #closing cursor
    cursor.close()
    #we convert our data to a json and return it
    return createJson(results)

def verifyUsername(userName):
    cursor = db.cursor()
    args = [userName]
    #we use an stored procedure
    cursor.callproc("verify_username",args)
    results = {}
    response = []
    for r in cursor.stored_results():
        response =r.fetchall()
    results["result"] = response[0]
    #if results = 0, the user doesnt exist in the db. If it is 1, it already exists
    cursor.close()
    return createJson(results)

def insertUser(username):
    try:
        #code with transaction to insert an user
        cursor = db.cursor()
        result = {}
        sql_insert = "INSERT INTO users (username) VALUES (%s)"
        data = (username,)
        cursor.execute(sql_insert, data)
        # Confirm transaction
        db.commit()
        result["result"] = "Insertion successful"
    except mysql.connector.Error as e:
        result["result"] =f"Error while inserting: {e}"
    finally:
        cursor.close()
        return createJson(result)
    


def saveQueryUser(username,queryname,state,species,diameter,height,inYear,finYear,limits,query_id):
    try:
        #code with transaction to insert an query
        cursor = db.cursor()
        result = {}
        #insert in queries
        
        sql_insert = "INSERT INTO queries (id,queryname,tree_state_code,species_common_name,current_diameter,actual_height,initial_time,final_time,limits) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        data = (query_id,queryname,state,species,diameter,height,inYear,finYear,limits)
        cursor.execute(sql_insert, data)
        # Confirm transaction
        db.commit()
        #insert into savedqueries
        sql_insert = "INSERT INTO savedqueries (username,query_id) VALUES (%s, %s)"
        data = (username,query_id)
        cursor.execute(sql_insert, data)
        # Confirm transaction
        db.commit()
        
        result["result"] = "Insertion successful"
    except mysql.connector.Error as e:
        result["result"] =f"Error while inserting: {e}"
    finally:
        cursor.close()
        return createJson(result)
    
def getSavedQueries(username):
    cursor = db.cursor()
    args = (username,)
    #we use an stored procedure
    cursor.execute("SELECT queries.id,queryname,username FROM savedqueries INNER JOIN queries ON query_id=queries.id WHERE username=(%s)",args)
    response =cursor.fetchall()
    results = {"result":response}
    #if results = 0, the user doesnt exist in the db. If it is 1, it already exists
    cursor.close()
    return createJson(results) 

def getAllSavedQueries():
    cursor = db.cursor()
    #we use an stored procedure
    cursor.execute("SELECT queries.id,queryname,username FROM savedqueries INNER JOIN queries ON query_id=queries.id ")
    response =cursor.fetchall()
    results = {"result":response}
    #if results = 0, the user doesnt exist in the db. If it is 1, it already exists
    cursor.close()
    return createJson(results)     
    
    
    
if '__main__' == __name__:
    #bringAllusers()
    verifyUsername("anelica")