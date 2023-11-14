import json
from google.cloud import bigquery


def createJson(dictionary,fileName):
    #crear un archivo
    with open(fileName+'.json', 'w') as f:
        # Convertir el diccionario a una cadena JSON
        json.dump(dictionary, f, indent=2)

def query_by_state_Species(codigoEstado,especie):
# Crea un cliente de BigQuery
    client = bigquery.Client.from_service_account_json('./my-key.json')
# Especifica el archivo JSON de claves de API

# Perform a query.
    QUERY = (
    """
    SELECT species_common_name AS tree, COUNT(species_scientific_name) AS state 
    FROM `bigquery-public-data.usfs_fia.tree` 
    WHERE tree_state_code=@cod_estado AND species_common_name=@n_especie GROUP BY(species_common_name) LIMIT 10
    """)
    job_config = bigquery.QueryJobConfig(
    query_parameters=[
        bigquery.ScalarQueryParameter("n_especie", "STRING", especie),
        bigquery.ScalarQueryParameter("cod_estado", "INT64", codigoEstado),
    ]
    )
    query_job = client.query(QUERY, job_config=job_config)  # Make an API request.
    rows = query_job.result()  # Waits for query to finish
    dictionary = dict()
    if rows.total_rows != 0:
        for row in rows:
            #print(row.values)
            #de tipo tupla
            dictionary[row.values()[0]] = row.values()[1]
    else:
        dictionary["result"] = "NaN"
    print(len(dictionary))
    createJson(dictionary=dictionary,fileName="result")
if __name__ =='__main__':
    query_by_state_Species(6,"California live oak")
    
