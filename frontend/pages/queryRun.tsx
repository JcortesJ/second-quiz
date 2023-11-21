import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NavBar from '../components/navbar';
import InfoDiv from '../components/infoDiv';

import Comment from '../components/comment';
import { useEffect, useRef, useState } from 'react';
import Loading from '../components/loading';
import Graphics from '../components/graphics';
import PostQuery from '../components/postQuery';
import { useUser } from './context/UserContext';


const QueryRun = () => {
  //Data brought from the API
  const {username,setLoggedInUser} = useUser();
  const [dataResponse,setdataResponse] = useState<any[]>([]);
  const [queryParameters,setQP] = useState<any[]>([]);
  const [id,setQI] = useState<string>("");
    const [apiUrlEndpoint,setAPI] = useState<string>("");
     //code for the queryBuilder
     const speciesInput = useRef<HTMLInputElement>(null);
     const stateInput = useRef<HTMLSelectElement>(null);
     const diameterInput = useRef<HTMLInputElement>(null);
     const heightInput = useRef<HTMLInputElement>(null);
     const intimeInput = useRef<HTMLInputElement>(null);
     const fintimeInput = useRef<HTMLInputElement>(null);
     const limitInput = useRef<HTMLInputElement>(null);

     const [statesUs,setStates] = useState<string[]>(["All states", "Alabama",
         "Alaska",
         "Arizona",
         "Arkansas",
         "California",
         "Colorado",
         "Connecticut",
         "Delaware",
         "Florida",
         "District of Columbia",
         "Georgia",
         "Hawaii",
         "Idaho",
         "Illinois",
         "Indiana",
         "Iowa",
         "Kansas",
         "Kentucky",
         "Louisiana",
         "Maine",
         "Maryland",
         "Massachusetts",
         "Michigan",
         "Minnesota",
         "Mississippi",
         "Missouri",
         "Montana",
         "Nebraska",
         "Nevada",
         "New Hampshire",
         "New Jersey",
         "New Mexico",
         "New York",
         "North Carolina",
         "North Dakota",
         "Ohio",
         "Oklahoma",
         "Oregon",
         "Pennsylvania",
         "Rhode Island",
         "South Carolina",
         "South Dakota",
         "Tennessee",
         "Texas",
         "Utah",
         "Vermont",
         "Virginia",
         "Washington",
         "West Virginia",
         "Wisconsin",
         "Wyomin"]);
    
     console.log("logeado"+username)
     function getPageData() {
      if (apiUrlEndpoint != ""){
        fetch(apiUrlEndpoint)
        .then(response => response.json())
        .then(res => {
          if (res === undefined) {
            setdataResponse(["No data has been found"]);
          } else {
            setdataResponse(res.result);
            //console.log(dataResponse[0][0])
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          // Manejar el error según sea necesario
        });
      }

    }

 



    useEffect(
         ()=>{ getPageData()
        },[apiUrlEndpoint]
    );
   

     function borrarTodo(e: any): void {
          e.preventDefault()
          if (speciesInput.current != null && stateInput.current != null && diameterInput.current != null && heightInput.current != null && intimeInput.current != null && fintimeInput.current != null && limitInput.current != null) {
              speciesInput.current.value = "";
              diameterInput.current.value = "0";
              heightInput.current.value = "0";
              limitInput.current.value = "10";
              intimeInput.current.value = "1900";
              fintimeInput.current.value= "2020";
              setdataResponse([])
              
              setAPI("")
          }
      }
  
      function getAPIEndpoint(e: any):void {
          if (speciesInput.current != null && stateInput.current != null && diameterInput.current != null && heightInput.current != null && intimeInput.current != null && fintimeInput.current != null && limitInput.current != null) {
              e.preventDefault();
              setdataResponse([])
              setAPI("")
              console.log("presionado")
              let request = "../api/";
              //so first it is important to decide which will be the API endpoint we're going to use
              //if there is not any info:
              if(speciesInput.current.value == "" && (stateInput.current.value =="0" || stateInput.current.value =="")){
                //then its a standard query without a specific state and species
                request+= "findTree/";
              }
              else if( speciesInput.current.value == "" && stateInput.current.value !="0" ){
                //then is a query with state
                //findState/<int:stateCode>,
                request+= "findState/"+stateInput.current.value+",";
              }
              else if( speciesInput.current.value != "" && (stateInput.current.value =="0" || stateInput.current.value =="")){
                //then is a query with a species
                request+="findSpecies/"+speciesInput.current.value+",";
              }
              else{
                //then is a specific query with species and state
                request += "findStateS/"+speciesInput.current.value+","+stateInput.current.value+",";

              }
              //final adjustments
              if(diameterInput.current.value =="") diameterInput.current.value="0"
              if(heightInput.current.value=="") heightInput.current.value="0"
              if(limitInput.current.value =="") limitInput.current.value="10"
              if(intimeInput.current.value=="" || parseInt(intimeInput.current.value) < 1900 ) intimeInput.current.value ="1900"
              if(fintimeInput.current.value=="" || parseInt(fintimeInput.current.value)> 2020 ) fintimeInput.current.value="2020"
              if(parseInt(intimeInput.current.value) > parseInt(fintimeInput.current.value)){
                let aux = intimeInput.current.value;
                intimeInput.current.value = fintimeInput.current.value;
                fintimeInput.current.value = aux;
              }
              //<int:firstYear>,<int:lastYear>,<int:initialDiameter>,<int:initialHeight>,<int:limit>
              request += intimeInput.current.value+","+fintimeInput.current.value+","+diameterInput.current.value+","+
              heightInput.current.value+","+limitInput.current.value;
              console.log("final request:")
              setAPI(request);
              console.log(apiUrlEndpoint)
              
              setQI((Math.floor(Math.random() * 1000) + 1).toString())
              console.log(`Id: ${id}`)
              //<string:username>,<string:name>,<int:stateCode>,<string:speciesName>,<int:initialDiameter>,<int:initialHeight>,<int:firstYear>,<int:lastYear>,<int:limit>,<string:query_id>,<string:comment>
              let change = [username,stateInput.current.value,speciesInput.current.value,diameterInput.current.value,heightInput.current.value,intimeInput.current.value,fintimeInput.current.value,limitInput.current.value,id];
              console.log(`Parameters: ${change}`)
              setQP(change);
              
              getPageData();
          }
      }

      function createCharts(){
        //name,status_name,state_code,diameter,height,n° especie
        let deadTrees = 0
        let liveTrees = 0
        let removedTrees = 0
        let noStatTrees = 0
        let speciesSample:any= {}; 
        // {speciesName : [diameter,height,population]}
        let statesSample:any = {};
        // {stateCode : population}
        for (let i = 0; i<dataResponse.length;i++){
          //add speciesSample
          let name = dataResponse[i][0];
          let state = statesUs[parseInt(dataResponse[i][2])];
            if(speciesSample[name] !== undefined){
              
              //if the element is already on the dict add the values
              speciesSample[name][0].push(parseInt(dataResponse[i][3])); // Add diameter
              speciesSample[name][1].push(parseInt(dataResponse[i][4])); // Add Height
              speciesSample[name][2] = parseInt(dataResponse[i][5]); // Add Population
            }
            else if(Object.keys(speciesSample).length < 15){
              //if the element doesnt exist add it to the dict
              speciesSample[name] = [[parseInt(dataResponse[i][3])],[parseInt(dataResponse[i][4])],[parseInt(dataResponse[i][3])]] 
            }
            //also add the state
            if (statesSample[state] !== undefined){
              statesSample[state] += parseInt(dataResponse[i][5])    
            }
            else if (Object.keys(statesSample).length<10){
              statesSample[state] = parseInt(dataResponse[i][5])
            }
            //increase status 
            if(dataResponse[i][1] == "Live tree") liveTrees+=parseInt(dataResponse[i][5]);
            if(dataResponse[i][1] == "Dead tree") deadTrees+=parseInt(dataResponse[i][5]);
            if(dataResponse[i][1] == "No status") noStatTrees+=parseInt(dataResponse[i][5]);
            if(dataResponse[i][1] == "Removed") removedTrees+=parseInt(dataResponse[i][5]);
          
          
        }
        //calculate  average
        for (var key in speciesSample) {
          if (Object.hasOwnProperty(key)) {
            speciesSample[key][0] = speciesSample[key][0].reduce((ac:number, n:number) => ac + n, 0) / speciesSample[key][0].length;
            speciesSample[key][1] = speciesSample[key][1].reduce((ac:number, n:number) => ac + n, 0) / speciesSample[key][1].length;
           
          }
        }
        //finally we return the status of trees and the samples
          return [deadTrees,liveTrees,removedTrees,noStatTrees,speciesSample,statesSample]
      }

  
  return (
    <div className={styles.fondoNormal}>
      <Head>
        <title>Query UI</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar></NavBar>
      <InfoDiv {...["¿How it works?", "Create your query with our visual-query builder. Our app will fetch the data from the USFS FIA database hosted on google cloud platform."]}></InfoDiv>
      <form className={styles.Qformulary}>
            <div><label>Select species: </label> <input ref={speciesInput} type={'text'} placeholder={"ALL"} className={styles.finput} /> </div>
            <div><label>Select state: </label> <select title={"jiji"} ref={stateInput} className={styles.finput} >
                {statesUs.map((state, index) => (<option value={index} key={index}>{state}</option>))}
            </select></div>
            <div><label>Select dimensions: </label>
                <label>Diameter {'>'} </label> <input ref={diameterInput} type={'number'} className={styles.finput} placeholder={"0"} />
                <label>height {'>'} </label> <input ref={heightInput} type={'number'} placeholder={"0"} className={styles.finput} />
            </div>
            <div><label>Select a range of time: </label>
                <label>From:</label> <input ref={intimeInput} type={'number'} placeholder={"1900"}   max={"2009"} min={"1900"} className={styles.finput} />
                <label>To:</label> <input ref={fintimeInput} type={'number'} placeholder={"2020"} max={"2020"} min={"1951"} className={styles.finput} /></div>

            <div><label>Show results:</label> <input ref={limitInput} type={'number'}  max={"1000"} min={"1"}className={styles.finput} placeholder={"10"} />
                <label> items</label></div>
            {dataResponse != undefined && dataResponse.length < 11 ? <p>Not enough data? Try changing the number of result items</p> : <p></p>}
            <div>
                <button className={styles.formButton} onClick={borrarTodo}>Reset</button>
                <button className={styles.formButton} onClick={getAPIEndpoint}>Query</button>
            </div>
        </form>
      <section className={styles.flexRow}>
        <article className={styles.graphsContainer}>{
          dataResponse===undefined? <p>Your query hasn't found any results. You should try changing the parameters (e.g the initial or final year) <b>If after retrying anything is displayed it means that USFS FIA data base doesnt have that recording</b></p> : (dataResponse.length === 0? <Loading></Loading> : <Graphics {...createCharts()}></Graphics>)
        }</article>
        <div className={styles.commentsColumn}>
          <h3>Query's information</h3>
          {dataResponse===undefined? <p>Run a query to give it a name</p> : (dataResponse.length === 0? <Loading></Loading> : <PostQuery{...queryParameters}></PostQuery>)}
        </div>
      </section>
    </div>

  );

}

export default QueryRun