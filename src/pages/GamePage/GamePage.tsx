import { useEffect, useRef, useState } from "react";
import { AppConsts, MAIN_PAGE_ROUTE } from "../../consts/AppConsts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from './GamePage.module.css';
import { useNavigate } from "react-router-dom";
import { disbleMole, resetGameDataToInitialValues } from "../../store/reducers/GameSlice";
import { GameTimerNew } from "../../components/GameTimer/GameTimerNew";
import hamsterImage from '../../assets/images/hamster-game.png';
import timerImage from '../../assets/images/timer.png';
//@ts-ignore
import hitSound from '../../assets/sounds/yes1.wav';
//@ts-ignore
import errorSound from '../../assets/sounds/error-sound.mp3';
//@ts-ignore
import winnerSound from '../../assets/sounds/winner-sound.mp3';
//@ts-ignore
import looserSound from '../../assets/sounds/looser-sound.mp3';
import { AfterGame } from "../../components/BeforeGame/AfterGame";


export const GamePage = ({ socket }: { socket: WebSocket }) => {

    const dispatch = useAppDispatch();


    const [hamsterAppearTime, setHamsterAppearTime] = useState(0);


    const [results, setResults] = useState<number[]>([]);
    const [clickedId, setClickedId] = useState(-1);
    const [backStyle, setBackStyle] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [isWinner, setIsWinner] = useState(false);

    const id = useAppSelector(state => state.authSlice.id);
    const gameData = useAppSelector(state => state.gameSlice.gameData);


    useEffect(() => {
        if (gameData.position !== -1) {
            setHamsterAppearTime(performance.now());
        }
    }, [gameData.position]);

    const winnerEffect = () => {
        const audio = new Audio(winnerSound);
        audio.volume = 0.5;
        audio.play();
        setShowResult(true);
        setIsWinner(true)
    }

    const looserEffect = () => {
        const audio = new Audio(looserSound);
        audio.volume = 0.5;
        audio.play();
        setShowResult(true)
    }

    const handleEndGame = (winnerId: string) => {
        if (showResult) {
            return;

        }
        if (Number(winnerId) === Number(id)) {
            winnerEffect()
        } else {
            looserEffect()
        }

    }

    useEffect(() => {
        gameData.playersData.map(player => {
            if (player.moleCount === 10) {
                handleEndGame(player.id);
            }
        })
    }, [gameData.playersData])

    const defineSuccessTapper = (tappedId: number) => {
        const audio = new Audio(errorSound);
        if (tappedId === Number(id)) {
            setBackStyle('linear-gradient(135deg, #d0c5c5 0%, #ace8a0 100%)')
        } else {
            setBackStyle('linear-gradient(135deg, #d0c5c5 0%, #ef8a8aff 100%)')
            audio.volume = 0.5;
            audio.play();
        }
        setTimeout(() => {
            setBackStyle('');
            audio.pause();
        }, 500)
    }

    useEffect(() => {
        if (gameData.tappedId) {
            defineSuccessTapper(Number(gameData.tappedId))
        }
    }, [gameData.tappedId])


    const handleHitHamster = (id: number) => {
        let reaction = 0;
        if (hamsterAppearTime !== 0) {
            const clickTime = performance.now();
            reaction = Math.ceil(clickTime - hamsterAppearTime);
            setResults([...results, reaction]);
        }
        const audio = new Audio(hitSound);
        audio.volume = 0.5;
        audio.play();
        setClickedId(id);
        sendMessageToServer(reaction);
        dispatch(disbleMole())
        setTimeout(() => {
            audio.pause();
        }, 500)
    }




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



    return <>
        {showResult && <AfterGame isWinner={isWinner} />}
        <div className={styles.background} style={backStyle ? { background: backStyle } : {}}>
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
                    <div><img src={timerImage} alt="timer" />{gameData.playersData[1].fullReactionTime} ms</div>
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
    </>
}