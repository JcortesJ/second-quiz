import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRef, useState } from 'react'


const PostQuery = (props: any[]) => {
    const [dataResponse, setdataResponse] = useState<string[]>([]);
    const [key, setKey] = useState<number>(0)
    const nameInput = useRef<HTMLInputElement>(null);
    const [name, setName] = useState<string>("");

    function createQuery(e: any) {
        if (nameInput.current != null) {
            e.preventDefault()
            let apiUrlEndpoint: string = "../api/queries/create/";
            let species: string = ""
            // <string:speciesName>,<int:stateCode>,<int:firstYear>,<int:lastYear>,<int:initialDiameter>,<int:initialHeight>,<int:limit>,<string:username>,<string:name>"
            if (props[0] == "") species = "any"
            else species = props[0]
            console.log(props)
            apiUrlEndpoint += species + "," + props[1] + "," + props[2] + "," + props[3] + "," + props[4] + "," + props[5] + "," + props[6] + "," + props[7] + "," + nameInput.current.value+","+props[8];
            console.log(apiUrlEndpoint)
            fetch(apiUrlEndpoint)
                .then(response => response.json())
                .then(res => {
                    if (res === undefined) {
                        setdataResponse([""]);
                    } else {
                        if (nameInput.current != null) {
                            setdataResponse(res.result);
                            setName(nameInput.current.value)
                            setKey(1);
                        }
                        console.log(dataResponse)
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    // Manejar el error según sea necesario
                });

        }
    }
    return (
        <div className={styles.commentDiv}>
            <form className={styles.formulary}>
                <label> Author: {props[7]} </label>
                <div key={key}>
                    {dataResponse.length > 0 ?
                        (<label>Name of the query: {name}</label>) : (<div>
                            <input className={styles.input} ref={nameInput} id={"newName"} placeholder={"Give a name to the query"}></input>
                            <button className={styles.regularButton} onClick={createQuery}>Save it</button>
                        </div>)
                    }
                </div>


            </form>
        </div>
    );
}

export default PostQuery;