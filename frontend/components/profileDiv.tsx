import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const ProfileDiv = (props:any[]) =>{
    return(
      <div className={styles.profileDiv}>
        <h4>{props[0]}</h4>
        <p>{props[1]}</p>
      </div>

    );
}

export default ProfileDiv;