import { useNavigate } from 'react-router-dom';
import styles from './BeforeGame.module.css';
import { MAIN_PAGE_ROUTE } from '../../consts/AppConsts';

export const AfterTraning = () => {

    const navigate = useNavigate();

    return <div className={styles.after}>
        <div className={styles['result-text']}>
            <div className={styles['additional-text']} >Тренировка окончена</div>
            <div className={styles['confirm-btn']}>
                <button onClick={() => navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/traning-result' : '/traning-result')}>К результатам</button>
            </div>
        </div>
    </div>
}