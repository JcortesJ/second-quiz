import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRef, useState } from 'react'

const QueryBuilder = () => {
    const speciesInput = useRef<HTMLInputElement>(null);
    const stateInput = useRef<HTMLSelectElement>(null);
    const diameterInput = useRef<HTMLInputElement>(null);
    const heightInput = useRef<HTMLInputElement>(null);
    const intimeInput = useRef<HTMLInputElement>(null);
    const fintimeInput = useRef<HTMLInputElement>(null);
    const limitInput = useRef<HTMLInputElement>(null);

    const statesUs = ["All states", "Alabama",
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
        "Wyomin"];
    const Commonspecies = [];
    function borrarTodo(): void {
        if (speciesInput.current != null && stateInput.current != null && diameterInput.current != null && heightInput.current != null && intimeInput.current != null && fintimeInput.current != null && limitInput.current != null) {
            speciesInput.current.innerHTML = "";
            stateInput.current.innerHTML = "";
            diameterInput.current.innerHTML = "0";
            heightInput.current.innerHTML = "0";
            limitInput.current.innerHTML = "0";
            intimeInput.current.innerHTML = "1900/12/1";
            fintimeInput.current.innerHTML = "1900/12/1";
        }
    }

    function getData(e: any): void {
        if (speciesInput.current != null && stateInput.current != null && diameterInput.current != null && heightInput.current != null && intimeInput.current != null && fintimeInput.current != null && limitInput.current != null) {
            e.preventDefault();
            console.log(speciesInput.current.value);
            console.log(stateInput.current.value);
            console.log(diameterInput.current.value);
            console.log(heightInput.current.value);
            console.log(limitInput.current.value);
            console.log(intimeInput.current.value);
            console.log(fintimeInput.current.value);
        }
    }

    return (


        <form className={styles.Qformulary}>
            <div><label>Select species: </label> <input ref={speciesInput} type={'text'} placeholder={"ALL"} className={styles.finput} /> </div>
            <div><label>Select state: </label> <select title={"jiji"} ref={stateInput} className={styles.finput} >
                {statesUs.map((state, index) => (<option value={index}>{state}</option>))}
            </select></div>
            <div><label>Select dimensions: </label>
                <label>Diameter {'>'} </label> <input ref={diameterInput} type={'number'} className={styles.finput} placeholder={"0"} />
                <label>height {'>'} </label> <input ref={heightInput} type={'number'} placeholder={"0"} className={styles.finput} />
            </div>
            <div><label>Select a range of time: </label>
                <label>From:</label> <input ref={intimeInput} type={'date'} className={styles.finput} />
                <label>To:</label> <input ref={fintimeInput} type={'date'} className={styles.finput} /></div>

            <div><label>Show results:</label> <input ref={limitInput} type={'number'} className={styles.finput} placeholder={"10"} />
                <label> items</label></div>
            <div>
                <button className={styles.formButton} onClick={borrarTodo}>Reset</button>
                <button className={styles.formButton} onClick={getData}>Query</button>
            </div>
        </form>

    );
}

export default QueryBuilder;