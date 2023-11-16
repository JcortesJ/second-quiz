import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'


const Comment = (props:string[]) =>{
    return(
        <div className={styles.commentDiv}><h3>
            {props[0]}</h3>
            <p>{props[1]}</p>
            </div>
    );
}

export default Comment;