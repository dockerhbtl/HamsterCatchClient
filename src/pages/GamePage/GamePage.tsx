import { useEffect, useState } from "react";
import { AppConsts, MAIN_PAGE_ROUTE } from "../../consts/AppConsts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from './GamePage.module.css';
import { useNavigate } from "react-router-dom";
import { GameTimer } from "../../components/GameTimer/GameTimer";
import { GamePlay } from "../../components/GamePlay/GamePlay";
import { disbleMole, resetGameDataToInitialValues } from "../../store/reducers/GameSlice";
import { GameTimerNew } from "../../components/GameTimer/GameTimerNew";
import hamsterImage from '../../assets/images/hamster-game.png';
import timerImage from '../../assets/images/timer.png';
//@ts-ignore
import hitSound from '../../assets/sounds/yes1.wav';


export const GamePage = ({ socket }: { socket: WebSocket }) => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [hamsterAppearTime, setHamsterAppearTime] = useState(0);

    const [showHammer, setShowHammer] = useState(false);
    const [results, setResults] = useState<number[]>([]);
    const [clickedId, setClickedId] = useState(-1);

    const id = useAppSelector(state => state.authSlice.id);
    const gameData = useAppSelector(state => state.gameSlice.gameData);

    useEffect(() => {
        if (gameData.position !== -1) {
            setHamsterAppearTime(performance.now());
        }
    }, [gameData.position])



    const calculateSum = () => {
        return results.reduce((acc, curr) => acc + curr, 0);
    }

    const handleHitHamster = (id: number) => {
        let reaction = 0;
        if (hamsterAppearTime !== 0) {
            const clickTime = performance.now();
            reaction = clickTime - hamsterAppearTime;
            setResults([...results, reaction]);
        }
        const audio = new Audio(hitSound);
        audio.volume = 0.5;
        audio.play();
        const delay = (Math.floor(Math.random() * 4) + 2) * 1000;
        setShowHammer(true);
        setClickedId(id);
        sendMessageToServer(reaction);
        dispatch(disbleMole())
        //  generateHamster(delay);
        setTimeout(() => {
            setShowHammer(false);
            audio.pause();
        }, 500)
    }





    // const [isDisbledGame, setDisabledGame] = useState(true);


    const sendMessageToServer = (reaction: number) => {
        console.log('send', {
            name: id,
            method: AppConsts.PROCESS,
            tap: 1,
            id: gameData.gameId,
            reactionTime: reaction
        });

        socket.send(JSON.stringify({
            name: id,
            method: AppConsts.PROCESS,
            tap: 1,
            id: gameData.gameId,
            reactionTime: reaction
        }))
    }


    // async function delay(timer: number) {
    //     return new Promise(resolve => {
    //         setTimeout(resolve, timer);
    //     });
    // }


    // const handleEndGame = async (data: any) => {
    //     setDisabledGame(true);
    //     dispatch(resetGameDataToInitialValues());
    //     socket.send(JSON.stringify({
    //         method: AppConsts.END_GAME,
    //         id: data.gameId,
    //     }))
    //     setTimeout(() => {
    //         navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/result' : '/result')
    //     }, 100)
    // }


    console.log('gameData', gameData);


    return <div className={styles.background} style={showHammer ? { background: 'linear-gradient(135deg, #d0c5c5 0%, #ace8a0 100%)' } : {}}>
        <div>
            <GameTimerNew />
        </div>
        <div className={styles['results-wrapper']}>
            <div className={styles.results}>
                <div className={styles.username}>{gameData.playersData[0].username}</div>
                <div><img src={timerImage} alt="timer" />{gameData.playersData[0].fullReactionTime} ms</div>
                <div><img className={styles.hamster} src={hamsterImage} alt='hamster' />{gameData.playersData[0].moleCount}/10</div>
            </div>
            <div className={styles.results}>
                <div className={styles.username}>{gameData.playersData[1].username}</div>
                <div><img src={timerImage} alt="timer" />{gameData.playersData[0].fullReactionTime} ms</div>
                <div><img className={styles.hamster} src={hamsterImage} alt='hamster' />{gameData.playersData[1].moleCount}/10</div>
            </div>
        </div>
        <div className={styles['game-field']}>
            {Array.from({ length: 12 }).map((_, i) => <div className={styles.hole} key={i}>
                {clickedId === i && <div className={styles.reaction}>+{results[results.length - 1]} ms</div>}
                {gameData.position === i &&
                    <div className={styles.mole}>
                        <img className={styles.hamster} src={hamsterImage} alt='hamster' onClick={() => handleHitHamster(i)} />
                    </div>
                }
            </div>)}
        </div>
    </div>
}