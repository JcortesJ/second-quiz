import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const QueryInfo = (props:string[]) =>{
    return(
        <div className={styles.queryRow}>
            <h2>Id:  {props[0]}</h2>
            <p>Title:  {props[1]}</p>
            <p>Author:  {props[2]}</p>
        </div>
    );
}

export default QueryInfo;