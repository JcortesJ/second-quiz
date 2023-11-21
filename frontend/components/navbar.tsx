import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useUser } from '../pages/context/UserContext';
import { useQuery } from '../pages/context/QueryContext';

const NavBar = () =>{
    const {username,setLoggedInUser} = useUser();
    const {queryId,setQueryId} = useQuery();
    function logOut(){
        setLoggedInUser("");
        setQueryId(null);
    }
    function eraseID(){
        setQueryId(null);
    }
    return(
        <ul className={styles.desktopMenu}>
           <div>
           <li className={styles.itemsMenu} onClick={eraseID}>
              <a href="./queryRun" >Query Builder</a>  
            </li >
            <li className={styles.itemsMenu} onClick={eraseID}>
                <a href="/querySearch">Search Queries</a>
            </li>
            <li className={styles.itemsMenu} onClick={eraseID}>
                <a href="/profile">Profile</a>
            </li>
            <li className={styles.itemsMenu} onClick={logOut}>
                <a href='/'>Log Out</a>
            </li>
           </div>
        </ul>

    );
}

export default NavBar;