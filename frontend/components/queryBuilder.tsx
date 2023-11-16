import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRef } from 'react'

const QueryBuilder = () =>{
    const speciesInput = useRef<HTMLInputElement>(null);
    const stateInput = useRef<HTMLInputElement>(null);
    const diameterInput = useRef<HTMLInputElement>(null);
    const heightInput= useRef<HTMLInputElement>(null);
    const intimeInput= useRef<HTMLInputElement>(null);
    const fintimeInput = useRef<HTMLInputElement>(null);
    const limitInput= useRef<HTMLInputElement>(null);
    function borrarTodo(): void {
        if (speciesInput.current !=null && stateInput.current !=null && diameterInput.current !=null &&heightInput.current !=null &&intimeInput.current !=null &&fintimeInput.current !=null && limitInput.current !=null ){
            speciesInput.current.innerHTML = "";
            stateInput.current.innerHTML= "";
            diameterInput.current.innerHTML ="0";
            heightInput.current.innerHTML="0";
            limitInput.current.innerHTML="0";
            intimeInput.current.innerHTML= "1/12/1900";
            fintimeInput.current.innerHTML= "1/12/1900";
        }
    }

    return(

        
        <form className={styles.Qformulary}>
            <div><label>Select species: </label> <input ref={speciesInput} type={'text'} className={styles.finput} /> </div>
            <div><label>Select state: </label> <input ref={stateInput} type={'text'} className={styles.finput} /></div>
            <div><label>Select dimensions: </label>
             <label>Diameter {'>'} </label> <input ref={diameterInput} type={'number'} className={styles.finput} /> 
             <label>height {'>'} </label> <input ref={heightInput} type={'number'} className={styles.finput} />
             </div>
            <div><label>Select a range of time: </label> 
            <label>From:</label> <input ref={intimeInput} type={'date'} className={styles.finput} />
            <label>To:</label> <input ref={fintimeInput} type={'date'} className={styles.finput} /></div>
            
            <div><label>Show results:</label> <input ref={limitInput} type={'number'} className={styles.finput} />
            <label> items</label></div>
            <div>
            <button className={styles.formButton} onClick={borrarTodo}>Reset</button>
            <button className={styles.formButton}>Query</button>
            </div>
        </form>

    );
}

export default QueryBuilder;