import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from './TraningResultPage.module.css';
import { GoBack } from "../../components/GoBack/GoBack";
import hamsterIcon from '../../assets/images/hamster-game.png';
import { defaineImageByFullTime, defaineImageByTime } from "../../functions/functions";
import { MAIN_PAGE_ROUTE } from "../../consts/AppConsts";
import { HomeOutlined } from "@ant-design/icons";
import { getMyUsername } from "../../store/reducers/AuthSlice";
import { TailSpin } from "react-loader-spinner";
import { useEffect, useState } from "react";

export const GameResultPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [myData, setMyData] = useState({
        id: '',
        gameId: '',
        fullReactionTime: 0,
        moleCount: 0,
        reactions: [0],
        reactionData: {
            bestReaction: 0,
            fullReactionTime: 0,
            worstReaction: 0
        }
    })

    const gameResultsData = useAppSelector(state => state.gameSlice.gameResult);
    const { id } = useAppSelector(state => state.authSlice);

    useEffect(() => {

        const me = gameResultsData.players.find((player) => player.id === String(id));
        if (me) {
            setMyData(me);
        }


    }, [gameResultsData])


    const sum = myData.reactions.reduce((accumulator, currentValue) => accumulator + currentValue, 0) || 0;

    const calculateAverage = () => {
        const sum = myData.reactions.reduce((acc, val) => acc + val, 0);
        return Math.ceil(sum / myData.reactions.length);
    }

    const handleGoHome = () => {
        setIsLoading(true);
        dispatch(getMyUsername()).then(() => {
            setIsLoading(false);
            navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/' : '/')
        })
    }




    return <div className={styles['main-wrapper']}>
        <GoBack text="Результаты" hideIcon={true} />
        <div className={styles['full-time']}>
            {myData.reactions.length > 0 && <>
                <div>Общее время поимки</div>
                <div>{sum} ms <img src={defaineImageByFullTime(sum, myData.reactions.length)} alt="animal" /></div></>}
        </div>
        <div className={styles['records-wrapper']}>
            <div className={styles['single-result']}>
                <div>Лучшее время</div>
                {myData.reactions.length > 0
                    ? <div>{Math.min(...myData.reactions)} ms <img src={defaineImageByTime(Math.min(...myData.reactions))} alt="animal" /></div>
                    : <div> Infinity <img src={defaineImageByTime(15000)} alt="animal" /></div>
                }

            </div>
            <div className={styles['single-result']}>
                <div>Среднее время</div>
                {myData.reactions.length > 0
                    ? <div>{calculateAverage()} ms <img src={defaineImageByTime(calculateAverage())} alt="animal" /></div>
                    : <div> Infinity <img src={defaineImageByTime(15000)} alt="animal" /></div>
                }

            </div>
            <div className={styles['single-result']}>
                <div>Худшее время</div>
                {myData.reactions.length > 0
                    ? <div>{Math.max(...myData.reactions)} ms <img src={defaineImageByTime(Math.max(...myData.reactions))} alt="animal" /></div>
                    : <div> Infinity <img src={defaineImageByTime(15000)} alt="animal" /></div>
                }
            </div>
        </div>
        <div className={styles['mole-wrapper']}>
            {myData.reactions.map((tap, i) => <div className={styles['single-mole']} key={i}>
                <img src={hamsterIcon} alt='mole' />
                {tap} ms</div>)}
        </div>
        <div className={styles['confirm-btn']}>
            <button disabled={isLoading} onClick={handleGoHome}> {isLoading ? <TailSpin
                height="18"
                width="18"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /> : <>На главную <HomeOutlined /></>}</button>
        </div>
    </div>
}