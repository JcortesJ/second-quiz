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

def insertUser(email,username):
    try:
        #code with transaction to insert an user
        cursor = db.cursor()
        user_id = username[:3]+str(random.randint(0,1000))
        result = {}
        sql_insert = "INSERT INTO users (email, username, id) VALUES (%s, %s, %s)"
        data = (email,username,user_id)
        cursor.execute(sql_insert, data)
        # Confirm transaction
        db.commit()
        result["result"] = "Insertion successful"
    except mysql.connector.Error as e:
        result["result"] =f"Error while inserting: {e}"
    finally:
        cursor.close()
        return createJson(result)
    
def insertComment(id_query,username,comment):
    try:
        #code with transaction to insert a comment
        cursor = db.cursor()
        result = {}
        sql_insert = "INSERT INTO querycomments (query_id,username,query_comment) VALUES (%s, %s, %s)"
        data = (id_query,username,comment)
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
    
def getQueryId(id_query):
    cursor = db.cursor()
    args = [id_query]
    #we use an stored procedure
    cursor.execute("SELECT username,query_comment FROM queries INNER JOIN querycomments ON query_id=id WHERE query_id=(%s)",args)
    response =cursor.fetchall()
    results = {"result":response}
    #if results = 0, the user doesnt exist in the db. If it is 1, it already exists
    cursor.close()
    return createJson(results)    
    
    
    
if '__main__' == __name__:
    #bringAllusers()
    verifyUsername("anelica")