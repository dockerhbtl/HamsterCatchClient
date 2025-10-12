import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import styles from './TraningResultPage.module.css';
import { GoBack } from "../../components/GoBack/GoBack";
import hamsterIcon from '../../assets/images/hamster-game.png';
import { defaineImageByFullTime, defaineImageByTime } from "../../functions/functions";
import { MAIN_PAGE_ROUTE } from "../../consts/AppConsts";
import { HomeOutlined } from "@ant-design/icons";

export const TraningResultPage = () => {
    const navigate = useNavigate();

    const taps = useAppSelector(state => state.gameSlice.traningResult.taps);

    const sum = taps.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const calculateAverage = () => {
        const sum = taps.reduce((acc, val) => acc + val, 0);
        return Math.ceil(sum / taps.length);
    }




    return <div className={styles['main-wrapper']}>
        <GoBack text="Результаты" />
        <div className={styles['blocks-main-wrapper']}>
            <div className={styles.title}>Реакция</div>
            <div className={styles['blocks-wrapper']}>
                <div className={styles['single-block']}>
                    <span>Лучшая</span>
                    <div className={styles['time-wrapper']}>
                        <div>{Math.min(...taps)}</div>
                        <img src={defaineImageByTime(Number(Math.min(...taps)))} alt='animal' />
                    </div>
                </div>
                <div className={styles['single-block']}>
                    <span>Средняя</span>
                    <div className={styles['time-wrapper']}>
                        <div>{calculateAverage()}</div>
                        <img src={defaineImageByTime(calculateAverage())} alt='animal' />
                    </div>
                </div>
                <div className={styles['single-block']}>
                    <span>Худшая</span>
                    <div className={styles['time-wrapper']}>
                        <div>{Math.max(...taps)}</div>
                        <img src={defaineImageByTime(Math.max(...taps))} alt='animal' />
                    </div>
                </div>
            </div>
        </div>

        <div className={styles['blocks-main-wrapper']} style={{ marginTop: '30px' }}>
            <div className={styles.title}>Кроты</div>
            <div className={styles['blocks-wrapper']}>
                {taps.map((tap, i) => <div key={i} className={styles['single-block']}>
                    <span>{i + 1}</span>
                    <div className={styles['time-wrapper']}>
                        <div>{tap}</div>
                        <img src={hamsterIcon} alt='animal' />
                    </div>
                </div>)}
                <div className={styles['single-block']} style={{ width: '100%' }}>
                    <span>Общее время игры</span>
                    <div className={styles['time-wrapper']}>
                        <div>{sum}ms</div>
                        <img src={defaineImageByFullTime(sum, 10)} alt='animal' />
                    </div>
                </div>
            </div>
        </div>

        <div className={styles['confirm-btn']}>
            <button onClick={() => navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/' : '/')}>На главную <HomeOutlined /></button>
        </div>
    </div>
}

/*
 <div className={styles['full-time']}>
            <div>Общее время поимки</div>
            <div>{sum} ms <img src={defaineImageByFullTime(sum, taps.length)} alt="animal" /></div>
        </div>
        <div className={styles['records-wrapper']}>
            <div className={styles['single-result']}>
                <div>Лучшее время</div>
                <div>{Math.min(...taps)} ms <img src={defaineImageByTime(Math.min(...taps))} alt="animal" /></div>
            </div>
            <div className={styles['single-result']}>
                <div>Среднее время</div>
                <div>{calculateAverage()} ms <img src={defaineImageByTime(calculateAverage())} alt="animal" /></div>
            </div>
            <div className={styles['single-result']}>
                <div>Худшее время</div>
                <div>{Math.max(...taps)} ms <img src={defaineImageByTime(Math.max(...taps))} alt="animal" /></div>
            </div>
        </div>
        <div className={styles['mole-wrapper']}>
            {taps.map((tap, i) => <div className={styles['single-mole']} key={i}>
                <img src={hamsterIcon} alt='mole' />
                {tap} ms</div>)}
        </div>
*/