import { useEffect, useState } from 'react';
import styles from './GameTimer.module.css';
//@ts-ignore
import countSound from '../../assets/sounds/count.mp3';
import { GAME_TIME } from '../../consts/AppConsts';

export const GameTimerNew = () => {
    const [timer, setTimer] = useState(3);
    const [isGameStarted, setIsGameStarted] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer === 0) {
                clearInterval(interval);
            } else {
                setTimer(prevCount => prevCount - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const playAudio = () => {
        const audio = new Audio(countSound);
        audio.volume = 0.5;
        audio.play();
    }

    useEffect(() => {
        const audio = new Audio(countSound);
        audio.volume = 0.5;
        audio.play();
        return () => {
            audio.pause();
        };
    }, [])


    return timer ? <div className={styles['timer-new']}>{timer}</div> : <></>
}