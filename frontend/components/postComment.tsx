import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'


const PostComment = (props:string[]) =>{
    return(
        <div className={styles.commentDiv}>
            <form className={styles.formulary}>
                 <label>Posting as: {props[0]} </label> 
                 <input className={styles.input}  id={"newComment"} placeholder={"anAwesomeUser"}></input> 
                 <button className={styles.regularButton}>Post it!</button>
                </form>
            </div>
    );
}

export default PostComment;