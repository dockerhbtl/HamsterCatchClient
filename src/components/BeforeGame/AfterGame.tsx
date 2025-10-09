import { useNavigate } from 'react-router-dom';
import styles from './BeforeGame.module.css';
import { MAIN_PAGE_ROUTE } from '../../consts/AppConsts';

export const AfterGame = ({ isWinner }: { isWinner: boolean }) => {

    const navigate = useNavigate();

    return <div className={styles.after}>
        <div className={styles['result-text']}>
            <h1>{isWinner ? 'Вы победили' : 'Вы проиграли'}</h1>
            <div className={styles['confirm-btn']}>
                <button onClick={() => navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/game-results' : '/game-results')}>К результатам</button>
            </div>
        </div>
    </div>
}