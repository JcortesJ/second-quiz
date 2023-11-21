import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NavBar from '../components/navbar';
import QueryInfo from '../components/queryInfo';
import { useRef } from 'react';
import { useEffect,  useState } from 'react'
import { useUser } from './context/UserContext';
import Loading from '../components/loading';

const QuerySearch = () =>{
   
    const [queries,setQ] = useState<any[]>([])  
    const {username,setLoggedInUser} = useUser();

    function getPageData() {
        let apiUrlEndpoint = "../api/user/queries/saved";
          fetch(apiUrlEndpoint)
          .then(response => response.json())
          .then(res => {
            if (res !== undefined) {
              setQ(res.result);
              console.log(queries)
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            // Manejar el error según sea necesario
          });

  
      }

    return (
        <div className={styles.fondoNormal}>
        <Head>
          <title>Query Search</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar></NavBar>
        <div className={styles.flexColumn}>
            <section className={styles.flexRowGreen}>
                <div className={styles.flexColumnG}>
                <h2>Search Prexisting queries</h2>
                    <h3>Here you can find the list of all of the saved queries</h3>
                    
                </div>
                <button className={styles.rectangularButton} onClick={getPageData}><h3>Refresh</h3></button>

            </section>
            <div className={styles.specialRectangle}>
                {queries.length === 0? <Loading></Loading> :(queries.map((q)=>(<QueryInfo {...q}></QueryInfo>)))}
            </div>
            
            
        </div>
        </div>
    );
}

export default QuerySearch;