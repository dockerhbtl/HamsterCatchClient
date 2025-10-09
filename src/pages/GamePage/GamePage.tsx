import { useEffect, useState } from "react";
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


export const GamePage = ({ socket }: { socket: WebSocket }) => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [hamsterAppearTime, setHamsterAppearTime] = useState(0);

    const [showHammer, setShowHammer] = useState(false);
    const [results, setResults] = useState<number[]>([]);
    const [clickedId, setClickedId] = useState(-1);
    const [backStyle, setBackStyle] = useState('');

    const id = useAppSelector(state => state.authSlice.id);
    const gameData = useAppSelector(state => state.gameSlice.gameData);

    useEffect(() => {
        if (gameData.position !== -1) {
            setHamsterAppearTime(performance.now());
        }
    }, [gameData.position]);

    const defineSuccessTapper = (tappedId: number) => {
        console.log('tappedID', tappedId);
        console.log('id', id);


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



    const calculateSum = () => {
        return results.reduce((acc, curr) => acc + curr, 0);
    }

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


    return <div className={styles.background} style={backStyle ? { background: backStyle } : {}}>
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
}