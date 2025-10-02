import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from './ResultPage.module.css';
import redWinner from '../../assets/images/red_winner.png';
import greenWinner from '../../assets/images/green_winner.png';
import looserRed from '../../assets/images/looser_red.png';
import looserGreen from '../../assets/images/looser_green.png';
import { useNavigate } from "react-router-dom";
import { getMyUsername } from "../../store/reducers/AuthSlice";
import winnerStar from '../../assets/images/winner_star.png';
import looserStar from '../../assets/images/looser_star.png';
import { MAIN_PAGE_ROUTE } from "../../consts/AppConsts";
import { useEffect, useState } from "react";

export const ResultPage = () => {
    const { winner, results } = useAppSelector(state => state.gameSlice.gameResult)
    const navigation = useNavigate();
    const dispatch = useAppDispatch();

    const username = useAppSelector(state => state.authSlice.username);

    const handleGoToMain = async () => {
        dispatch(getMyUsername()).then(() => navigation(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE : '/'));
    }

    const isClientWinner = username === winner;

    const [disable, setDisable] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setDisable(false)
        }, 2000)
    }, [])

    return <div className={styles['main-wrapper']}>
        <div className={styles['winner-preview']}>AND THE WINNER IS...</div>
        <div className={styles['winner']}>{winner ? winner : 'draw'}</div>
        <div className={styles['game-result-wrapper']}>
            {winner ?
                <div style={{ marginRight: '20px' }}>
                    <div className={styles['winner-star']}>
                        <img src={winnerStar} alt="winner" />
                        <div>{results[winner]}</div>
                    </div>
                    <div className={styles['winner-name']}
                        style={isClientWinner ? { background: 'rgba(139, 173, 28, 1)' } : {}}>{winner.length > 12 ? winner.substr(0, 10) + '...' : winner}</div>
                    <div className={styles['winner-wrapper']}>
                        <img src={isClientWinner ? greenWinner : redWinner} alt="" />
                    </div>
                </div>
                : ''

            }

            <div className={styles['looser-wrapper']}>
                <div>{Object.keys(results).map((key, i) => {
                    if (key !== winner) {
                        return <div key={i}>
                            <div className={styles['looser-star']}>
                                <img src={looserStar} alt="looser" />
                                <div>{results[key]}</div>
                            </div>
                            <div className={styles['looser-name']}
                                style={isClientWinner ? { background: 'rgba(195, 58, 83, 1)' } : {}}>{key.length > 12 ? key.substr(0, 10) + '...' : key}</div>
                        </div>
                    }
                })}</div>
                {winner
                    ? <div>
                        <img src={isClientWinner ? looserRed : looserGreen} alt="" />
                    </div>
                    : ''
                }
            </div>
        </div>
        <div className={styles['go-to-main']}>
            <button disabled={disable} style={disable ? { background: 'rgb(123, 123, 123)' } : {}}
                onClick={handleGoToMain}>На главную
            </button>
        </div>
    </div>
}