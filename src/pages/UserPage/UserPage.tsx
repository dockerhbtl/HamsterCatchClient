import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './UserPage.module.css';
import { Loader } from "../../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getUserGames, getUserStatistic } from "../../store/reducers/RatingSlice";
import { GoBackWithRoute } from "../../components/GoBack/GoBackWithRoute";
import mole from '../../assets/images/hamster-game.png';
import ratingIcon from '../../assets/images/rating.png';
import { defaineImageByTime, defineAvatarByRank } from "../../functions/functions";
import { format } from "date-fns";
import crown from '../../assets/images/crown.png';

export const UserPage = () => {
    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const [userLoaded, setUserLoaded] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getUserStatistic(Number(userId))).then(() => setUserLoaded(true));
    }, []);

    useEffect(() => {
        dispatch(getUserGames(page, Number(userId)));
    }, [page])

    const { statistic, games, rank, rating, id } = useAppSelector(state => state.ratingSlice.user);

    return <div className={styles['main-wrapper']}>
        {userLoaded
            ? <div>
                <GoBackWithRoute text="Username here" route="/rating" />
                <div className={styles['avatar-wrapper']}>
                    <div className={styles['rank']}>#{rank} в рейтинге</div>
                    {Number(rank) === 1 &&
                        <div className={styles['crown']} >
                            <img src={crown} alt="crown" />
                        </div>
                    }
                    <div className={styles.ava}>
                        <img src={defineAvatarByRank(Number(rank))} alt="ava" />
                    </div>
                    <div className={styles['ava-data-wrapper']}>
                        <div>{rating} <img src={ratingIcon} alt="" /> </div>
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
                            <div>{Math.ceil(Number(statistic.winrate))}%</div>
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
                                <div>{game.mole_count === 10 ? game.time : '-'} ms</div>
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