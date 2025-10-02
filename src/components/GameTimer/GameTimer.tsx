import {useEffect, useState} from 'react';
import styles from './GameTimer.module.css';
//@ts-ignore
import countSound from '../../assets/sounds/count.mp3';
import {GAME_TIME} from '../../consts/AppConsts';
import {Watch} from "react-loader-spinner";

export const GameTimer = ({setDisabledGame, gameData, endGame}: {
    setDisabledGame: (val: boolean) => void,
    gameData: any,
    endGame: (data: any) => void
}) => {
    const [timer, setTimer] = useState(3);
    const [isGameStarted, setIsGameStarted] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer === 0) {
                if (isGameStarted) {
                    clearInterval(interval);
                    endGame(gameData)
                    //console.log('send result', gameData);
                } else {
                    setTimer(GAME_TIME);
                    setIsGameStarted(true)
                    setDisabledGame(false)
                }
            } else {
                setTimer(prevCount => prevCount - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        const audio = new Audio(countSound);
        audio.volume = 0.5;
        audio.play();
        return () => {
            audio.pause();
        };
    }, [])


    return <div className={styles.timer}>
        <div className={styles['timer-clock']}>
            <Watch
                visible={true}
                height="40"
                width="40"
                radius="20"
                color="#EBFF00"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
            {timer}
        </div>
    </div>
}