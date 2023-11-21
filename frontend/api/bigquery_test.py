import pytest

from bigQueryCon import species_query,standard_query,state_query,state_species_query

def test_create_json():
    assert species_query("sweet birch",1900,2020,0,0,1) ==  ("sweet birch","Live tree",50,8.77,58.8,1067)