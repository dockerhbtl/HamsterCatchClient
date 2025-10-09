import { useEffect, useState } from 'react';
import styles from './BeforeGame.module.css';

export const AppPreloader = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 3000)
    }, [])
    return <>
        {loaded
            ? <div></div>
            : <div className={styles.preloader}></div>
        }
    </>
}