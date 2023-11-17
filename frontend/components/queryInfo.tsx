import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const QueryInfo = (props:string[]) =>{
    return(
        <div className={styles.queryRow}>
            <h2>{props[0]}</h2>
            <p>{props[1]}</p>
            <p>{props[2]}</p>
        </div>
    );
}

export default QueryInfo;