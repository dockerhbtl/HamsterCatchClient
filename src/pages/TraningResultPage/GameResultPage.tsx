import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import styles from './TraningResultPage.module.css';
import { GoBack } from "../../components/GoBack/GoBack";
import hamsterIcon from '../../assets/images/hamster-game.png';
import { defaineImageByFullTime, defaineImageByTime } from "../../functions/functions";
import { MAIN_PAGE_ROUTE } from "../../consts/AppConsts";
import { HomeOutlined } from "@ant-design/icons";

export const GameResultPage = () => {
    const navigate = useNavigate();

    const taps = [450, 500, 600, 790, 554];

    const sum = taps.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const calculateAverage = () => {
        const sum = taps.reduce((acc, val) => acc + val, 0);
        return Math.ceil(sum / taps.length);
    }




    return <div className={styles['main-wrapper']}>
        <GoBack text="Результаты" />
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
        <div className={styles['confirm-btn']}>
            <button onClick={() => navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/' : '/')}>На главную <HomeOutlined /></button>
        </div>
    </div>
}