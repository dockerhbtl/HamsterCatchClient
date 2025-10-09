import { useEffect } from 'react';
import styles from './BeforeGame.module.css';
import { useNavigate } from 'react-router-dom';
import { MAIN_PAGE_ROUTE } from '../../consts/AppConsts';

export const BeforeGame = ({ route }: { route: string }) => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + route : route)
        }, 2000)
    }, [])
    return <div className={styles.wrapper}>
        <div className={styles["progress-container"]}>
            <div className={styles["progress-bar"]}></div>
        </div>
    </div>
}