import json
from google.cloud import bigquery


def createJsonFile(dictionary,fileName):
    #crear un archivo
    with open(fileName+'.json', 'w') as f:
        # Convertir el diccionario a una cadena JSON
        json.dump(dictionary, f, indent=2)
def createJson(dictionary):
        return json.dumps(dictionary)

def standard_query(firstYear,lastYear,initialDiameter,initialHeight,limit):
# Crea un cliente de BigQuery
    client = bigquery.Client.from_service_account_json('./api/credentials.json')
# Especifica el archivo JSON de claves de API

# Perform a query.
    QUERY = (
    """
    SELECT DISTINCT species_common_name,tree_status_code_name,tree_state_code AS state, 
    ROUND(AVG(current_diameter),2) AS diametro,ROUND(AVG(actual_height),2) AS height , 
    COUNT(species_scientific_name) AS number FROM `bigquery-public-data.usfs_fia.tree` 
    WHERE tree_inventory_year>@f_year AND tree_inventory_year<@l_year AND current_diameter > @i_diameter
    AND actual_height > @i_height 
    GROUP BY species_common_name,tree_status_code_name,tree_state_code  LIMIT @limit;
    """)
    job_config = bigquery.QueryJobConfig(
    query_parameters=[
        bigquery.ScalarQueryParameter("f_year", "INT64",firstYear),
        bigquery.ScalarQueryParameter("l_year", "INT64",lastYear),
        bigquery.ScalarQueryParameter("i_diameter", "INT64", initialDiameter),
        bigquery.ScalarQueryParameter("i_height", "INT64", initialHeight),
        bigquery.ScalarQueryParameter("limit", "INT64", limit),
    ]
    )
    query_job = client.query(QUERY, job_config=job_config)  # Make an API request.
    rows = query_job.result()  # Waits for query to finish
    dictionary = dict()
    resultList = []
    if rows.total_rows != 0:
        for row in rows:
            if row.values()[1][:9] == "No status":
                #convert to list and modify it
                ap = list(row.values())
                ap[1] = "No status"
                resultList.append(ap)
            elif row.values()[1][:7] == "Removed":
                #convert to list and modify it
                ap = list(row.values())
                ap[1] = "Removed"
                resultList.append(ap)
            else: 
                resultList.append(row.values())

        dictionary["result"] = resultList
    print(len(dictionary))
    return createJson(dictionary=dictionary)
    
def state_query(stateCode,firstYear=1950,lastYear=2010,initialDiameter=0,initialHeight=0,limit=100):
# Crea un cliente de BigQuery
    client = bigquery.Client.from_service_account_json('./api/credentials.json')
# Especifica el archivo JSON de claves de API

# Perform a query.
    QUERY = (
    """
    SELECT species_common_name,tree_status_code_name,tree_state_code AS state,
    ROUND(AVG(current_diameter),2) AS diametro,ROUND(AVG(actual_height),2) AS height ,
    COUNT(species_scientific_name) AS number FROM `bigquery-public-data.usfs_fia.tree` 
    WHERE tree_state_code=@state AND tree_inventory_year>@f_year AND tree_inventory_year<@l_year AND current_diameter > @i_diameter
    AND actual_height > @i_height
    GROUP BY species_common_name,tree_status_code_name,tree_state_code  LIMIT @limit;
    """)
    job_config = bigquery.QueryJobConfig(
    query_parameters=[
        bigquery.ScalarQueryParameter("f_year", "INT64",firstYear),
        bigquery.ScalarQueryParameter("l_year", "INT64",lastYear),
        bigquery.ScalarQueryParameter("i_diameter", "INT64", initialDiameter),
        bigquery.ScalarQueryParameter("i_height", "INT64", initialHeight),
        bigquery.ScalarQueryParameter("limit", "INT64", limit),
        bigquery.ScalarQueryParameter("state", "INT64", stateCode),
    ]
    )
    query_job = client.query(QUERY, job_config=job_config)  # Make an API request.
    rows = query_job.result()  # Waits for query to finish
    dictionary = dict()
    resultList = []
    if rows.total_rows != 0:
        for row in rows:
            if row.values()[1][:9] == "No status":
                #convert to list and modify it
                ap = list(row.values())
                ap[1] = "No status"
                resultList.append(ap)
            elif row.values()[1][:7] == "Removed":
                #convert to list and modify it
                ap = list(row.values())
                ap[1] = "Removed"
                resultList.append(ap)
            else: 
                resultList.append(row.values())
        dictionary["result"] = resultList
    print(len(dictionary))
    return createJson(dictionary=dictionary)
    
    
def state_species_query(stateCode,speciesName,firstYear=1950,lastYear=2010,initialDiameter=0,initialHeight=0,limit=100):
# Crea un cliente de BigQuery
    client = bigquery.Client.from_service_account_json('./api/credentials.json')
    speciesName = speciesName.replace("%20"," ")
# Especifica el archivo JSON de claves de API

# Perform a query.
    QUERY = (
    """
    SELECT species_common_name,tree_status_code_name,tree_state_code AS state,
    ROUND(AVG(current_diameter),2) AS diametro,ROUND(AVG(actual_height),2) AS height ,
    COUNT(species_scientific_name) AS number FROM `bigquery-public-data.usfs_fia.tree` 
    WHERE tree_state_code=@state AND tree_inventory_year>@f_year AND tree_inventory_year<@l_year AND current_diameter > @i_diameter
    AND actual_height > @i_height  AND species_common_name LIKE @species_name
    GROUP BY species_common_name,tree_status_code_name,tree_state_code  LIMIT @limit;
    """)
    job_config = bigquery.QueryJobConfig(
    query_parameters=[
        bigquery.ScalarQueryParameter("f_year", "INT64",firstYear),
        bigquery.ScalarQueryParameter("l_year", "INT64",lastYear),
        bigquery.ScalarQueryParameter("i_diameter", "INT64", initialDiameter),
        bigquery.ScalarQueryParameter("i_height", "INT64", initialHeight),
        bigquery.ScalarQueryParameter("limit", "INT64", limit),
        bigquery.ScalarQueryParameter("state", "INT64", stateCode),
        bigquery.ScalarQueryParameter("species_name", "STRING", speciesName.replace("%"," ")),
    ]
    )
    query_job = client.query(QUERY, job_config=job_config)  # Make an API request.
    rows = query_job.result()  # Waits for query to finish
    dictionary = dict()
    resultList = []
    if rows.total_rows != 0:
        for row in rows:
            if row.values()[1][:9] == "No status":
                #convert to list and modify it
                ap = list(row.values())
                ap[1] = "No status"
                resultList.append(ap)
            elif row.values()[1][:7] == "Removed":
                #convert to list and modify it
                ap = list(row.values())
                ap[1] = "Removed"
                resultList.append(ap)            
            else: 
                resultList.append(row.values())
        dictionary["result"] = resultList
    print(len(dictionary))
    return createJson(dictionary=dictionary)
    
def species_query(speciesName,firstYear=1950,lastYear=2010,initialDiameter=0,initialHeight=0,limit=100):
# Crea un cliente de BigQuery
    client = bigquery.Client.from_service_account_json('./api/credentials.json')
    speciesName = speciesName.replace("%20"," ")
# Especifica el archivo JSON de claves de API

# Perform a query.
    QUERY = (
    """
    SELECT species_common_name,tree_status_code_name,tree_state_code AS state,
    ROUND(AVG(current_diameter),2) AS diametro,ROUND(AVG(actual_height),2) AS height ,
    COUNT(species_scientific_name) AS number FROM `bigquery-public-data.usfs_fia.tree` 
    WHERE tree_inventory_year>@f_year AND tree_inventory_year<@l_year AND current_diameter > @i_diameter
    AND actual_height > @i_height  AND species_common_name LIKE @species_name
    GROUP BY species_common_name,tree_status_code_name,tree_state_code  LIMIT @limit;
    """)
    job_config = bigquery.QueryJobConfig(
    query_parameters=[
        bigquery.ScalarQueryParameter("f_year", "INT64",firstYear),
        bigquery.ScalarQueryParameter("l_year", "INT64",lastYear),
        bigquery.ScalarQueryParameter("i_diameter", "INT64", initialDiameter),
        bigquery.ScalarQueryParameter("i_height", "INT64", initialHeight),
        bigquery.ScalarQueryParameter("limit", "INT64", limit),
        bigquery.ScalarQueryParameter("species_name", "STRING", speciesName.replace("%"," ")),
    ]
    )
    query_job = client.query(QUERY, job_config=job_config)  # Make an API request.
    rows = query_job.result()  # Waits for query to finish
    dictionary = dict()
    resultList = []
    if rows.total_rows != 0:
        for row in rows:
            if row.values()[1][:9] == "No status":
                #convert to list and modify it
                ap = list(row.values())
                ap[1] = "No status"
                resultList.append(ap)
            elif row.values()[1][:7] == "Removed":
                #convert to list and modify it
                ap = list(row.values())
                ap[1] = "Removed"
                resultList.append(ap)
            else: 
                resultList.append(row.values())
        dictionary["result"] = resultList
    print(len(dictionary))
    return createJson(dictionary=dictionary)  
    
