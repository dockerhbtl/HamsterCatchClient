import { GoBack } from '../../components/GoBack/GoBack';
import { defaineImageByTime } from '../../functions/functions';
import styles from './MyProfile.module.css';
import mole from '../../assets/images/hamster-game.png';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getMyGames, getMyStatistic } from '../../store/reducers/AuthSlice';
import { Loader } from '../../components/Loader/Loader';
import cheetahIcon from '../../assets/images/cheetah.png';
import moneyIcon from '../../assets/images/moneyNew.png';
import ratingIcon from '../../assets/images/rating.png';
import { format } from 'date-fns';

export const MyProfile = () => {
    const [appLoaded, setAppLoaded] = useState(false);
    const [page, setPage] = useState(1);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getMyStatistic()).then(() => setAppLoaded(true));
    }, []);

    useEffect(() => {
        dispatch(getMyGames(page));
    }, [page])

    const { rating, balance, statistic, games } = useAppSelector(state => state.authSlice);
    const { id } = useAppSelector(state => state.authSlice);



    return <div className={styles['main-wrapper']}>
        <GoBack text='Мой профиль' />
        {appLoaded
            ? <div>
                <div className={styles['avatar-wrapper']}>
                    <div className={styles.ava}>
                        <img src={cheetahIcon} alt="" />
                    </div>
                    <div className={styles['ava-data-wrapper']}>
                        <div>{rating} <img src={ratingIcon} alt="" /> </div>
                        <div>{balance} <img src={moneyIcon} alt="" /></div>
                    </div>
                </div>
                <div className={styles['blocks-main-wrapper']}>
                    <div className={styles.title}>Игра</div>
                    <div className={styles['blocks-wrapper']}>
                        <div className={styles['single-block']}>
                            <span>Матчей</span>
                            <div>{statistic.game_count}</div>
                        </div>
                        <div className={styles['single-block']}>
                            <span>Побед</span>
                            <div>{statistic.game_win}</div>
                        </div>
                        <div className={styles['single-block']}>
                            <span>Поражений</span>
                            <div>{statistic.game_lost}</div>
                        </div>
                        <div className={styles['single-block']}>
                            <span>Winrate</span>
                            <div>{Math.ceil(Number(statistic.winrate))}</div>
                        </div>
                        <div className={styles['single-block']}>
                            <span>Кроты</span>
                            <div className={styles['time-wrapper']} style={{ marginTop: '-0px' }} >
                                <div>{statistic.all_mole}</div>
                                <img src={mole} alt="" />
                            </div>
                        </div>
                        <div className={styles['single-block']}>
                            <span>Лучшая игра</span>
                            <div>{statistic.best_game_time} ms</div>
                        </div>
                        <div className={styles['single-block']} style={{ width: '100%' }}>
                            <span>Общее игровое время</span>
                            <div>{statistic.full_time} ms</div>
                        </div>
                    </div>
                </div>
                <div className={styles['blocks-main-wrapper']}>
                    <div className={styles.title}>Реакция</div>
                    <div className={styles['blocks-wrapper']}>
                        <div className={styles['single-block']}>
                            <span>Лучшая</span>
                            <div className={styles['time-wrapper']}>
                                <div>{statistic.best_reaction}</div>
                                <img src={defaineImageByTime(Number(statistic.best_reaction))} alt='animal' />
                            </div>
                        </div>
                        <div className={styles['single-block']}>
                            <span>Средняя</span>
                            <div className={styles['time-wrapper']}>
                                <div>{Math.ceil(Number(statistic.full_time) / Number(statistic.all_mole))}</div>
                                <img src={defaineImageByTime(Math.ceil(Number(statistic.full_time) / Number(statistic.all_mole)))} alt='animal' />
                            </div>
                        </div>
                        <div className={styles['single-block']}>
                            <span>Худшая</span>
                            <div className={styles['time-wrapper']}>
                                <div>{statistic.worst_reaction}</div>
                                <img src={defaineImageByTime(Number(statistic.worst_reaction))} alt='animal' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['blocks-main-wrapper']}>
                    <div className={styles.title}>История игр</div>
                    <div className={styles['games-wrapper']}>
                        <div className={styles['title-wrapper']}>
                            <div>Результат</div>
                            <div> <img src={mole} alt="Mole" /> </div>
                            <div>Время игры</div>
                            <div>Тип игры</div>
                            <div>Дата</div>
                        </div>
                        {games.games.map((game, i) =>
                            <div key={i} className={styles['game-wrapper']} style={i % 2 ? { background: '#13164d' } : { background: '#323459' }} >
                                <div style={game.game.winner === String(id) ? { color: '#25ee25' } : { color: '#ff1212' }} >
                                    {game.game.winner === String(id) ? "Победа" : "Поражение"}
                                </div>
                                <div>{game.mole_count}</div>
                                <div>{game.time} ms</div>
                                <div>{game.game.sum == 0 ? 'free' : game.game.sum}</div>
                                <div>{format(game.createdAt, 'dd.MM.yyyy HH:mm')}</div>
                            </div>
                        )}
                    </div>
                    {games.games.length < games.count &&
                        <div className={styles['load-more']} onClick={() => setPage(prev => prev + 1)}>
                            Загрузить еще
                        </div>
                    }
                </div>
            </div>
            : <Loader />

        }
    </div>
}