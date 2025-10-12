import { GoBack } from '../../components/GoBack/GoBack';
import { defaineImageByFullTime, defaineImageByTime } from '../../functions/functions';
import styles from './MyProfile.module.css';
import ratingImg from '../../assets/images/rating.png';
import moneyNew from '../../assets/images/moneyNew.png';

export const MyProfile = () => {

    const bestTime = 450;
    const average = 700;
    const worst = 1200;

    const bestGame = 6000;

    return <div className={styles['main-wrapper']}>
        <GoBack text='Мой профиль' />
        <div className={styles['ava-wrapper']}>
            <div>
                <img src={defaineImageByFullTime(bestGame, 10)} alt="animal" />
            </div>
            <div className={styles['data-wrapper']}>
                <div>Лучшая игра {bestGame} ms</div>
                <div>Рейтинг {2000}<img src={ratingImg} alt='rating' /> </div>
                <div>Баланс {1000} <img src={moneyNew} alt='balance' /></div>
            </div>
        </div>
        <div className={styles['records-wrapper']}>
            <div className={styles['single-result']}>
                <div>Лучшее время</div>
                <div>{bestTime} ms <img src={defaineImageByTime(Math.min(bestTime))} alt="animal" /></div>
            </div>
            <div className={styles['single-result']}>
                <div>Среднее время</div>
                <div>{average} ms <img src={defaineImageByTime(average)} alt="animal" /></div>
            </div>
            <div className={styles['single-result']}>
                <div>Худшее время</div>
                <div>{worst} ms <img src={defaineImageByTime(worst)} alt="animal" /></div>
            </div>
        </div>
    </div>
}