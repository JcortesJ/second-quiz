import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Loading(){
    let arr = [1,2,3,4,5];
    return(
        <div>
            <ul className={styles.loadingList}>
                {
                    arr.map((i)=>(<li key={i}>
                        <span className={styles.spaceLoading} 
                        style={{animationDelay:`${i*0.08}s`,
                        animationDuration:"4s"}}/>
                    </li>))
                }
            </ul>
        </div>
    );
}