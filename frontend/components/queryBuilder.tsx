import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const QueryBuilder = () =>{
    return(
        <form className={styles.Qformulary}>
            <div><label>Select species: </label> <input id={"speciesInput"} type={'text'} className={styles.finput} /> </div>
            <div><label>Select state: </label> <input id={"stateInput"} type={'text'} className={styles.finput} /></div>
            <div><label>Select dimensions: </label>
             <label>Diameter {'>'} </label> <input id={"diameterInput"} type={'number'} className={styles.finput} /> 
             <label>Heigth {'>'} </label> <input id={"heigthInput"} type={'number'} className={styles.finput} />
             </div>
            <div><label>Select a range of time: </label> 
            <label>From:</label> <input id={"intimeInput"} type={'date'} className={styles.finput} />
            <label>To:</label> <input id={"fintimeInput"} type={'date'} className={styles.finput} /></div>
            
            <div><label>Show results:</label> <input id={"limitInput"} type={'number'} className={styles.finput} />
            <label> items</label></div>
            <div>
            <button className={styles.formButton}>Reset</button>
            <button className={styles.formButton}>Query</button>
            </div>
        </form>

    );
}

export default QueryBuilder;