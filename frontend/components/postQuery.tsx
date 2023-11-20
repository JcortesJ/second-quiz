import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'


const PostQuery = (props:any[]) =>{
    return(
        <div className={styles.commentDiv}>
            <form className={styles.formulary}>
                 <label> Author: {props[0]} </label> 
                 {props[1] != ""? (<label>Name of the query:{props[1]}</label>): (<input className={styles.input}  id={"newName"} placeholder={"Give a name to the query"}></input> )}
                 <button className={styles.regularButton}>Save it</button>
                </form>
            </div>
    );
}

export default PostQuery;