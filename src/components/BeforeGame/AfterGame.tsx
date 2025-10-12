import { useNavigate } from 'react-router-dom';
import styles from './BeforeGame.module.css';
import { MAIN_PAGE_ROUTE } from '../../consts/AppConsts';
import { useAppDispatch } from '../../hooks/redux';
import { resetGameDataToInitialValues } from '../../store/reducers/GameSlice';

export const AfterGame = ({ isWinner, text }: { isWinner: boolean, text: string }) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleGoToResults = () => {
        dispatch(resetGameDataToInitialValues());
        navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/game-results' : '/game-results')
    }


    return <div className={styles.after}>
        <div className={styles['result-text']}>
            <h1>{isWinner ? 'Вы победили' : 'Вы проиграли'}</h1>
            <div className={styles['additional-text']} >{text}</div>
            <div className={styles['confirm-btn']}>
                <button onClick={handleGoToResults}>К результатам</button>
            </div>
        </div>
    </div>
}