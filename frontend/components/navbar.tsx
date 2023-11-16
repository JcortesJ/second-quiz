import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const NavBar = () =>{
    return(
        <ul className={styles.desktopMenu}>
           <div>
           <li className={styles.itemsMenu}>
              <a href="./queryRun" >Query Builder</a>  
            </li >
            <li className={styles.itemsMenu}>
                <a href="/querySearch">Search Queries</a>
            </li>
            <li className={styles.itemsMenu}>
                <a href="/profile">Profile</a>
            </li>
           </div>
        </ul>

    );
}

export default NavBar;