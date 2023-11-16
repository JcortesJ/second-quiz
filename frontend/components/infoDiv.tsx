import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const InfoDiv = (props:string[]) =>{
    return(
      <div className={styles.infoDiv}>
        <h4>{props[0]}</h4>
        <h4>{props[1]}</h4>
      </div>

    );
}

export default InfoDiv;