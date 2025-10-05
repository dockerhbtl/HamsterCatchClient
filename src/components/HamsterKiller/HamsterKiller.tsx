import styles from './HamsterKiller.module.css';
import hamsterImage from '../../assets/images/hamster-game.png';
import timerImage from '../../assets/images/timer.png';
import { useEffect, useState } from 'react';
import { GameTimerNew } from '../GameTimer/GameTimerNew';
//@ts-ignore
import hitSound from '../../assets/sounds/yes1.wav';
import { useAppDispatch } from '../../hooks/redux';
import { setNewGameResult } from '../../store/reducers/GameSlice';
import { useNavigate } from 'react-router-dom';

export const HamsterKiller = () => {
    const [showHammer, setShowHammer] = useState(false);
    const [hamsterId, setHamsterId] = useState<null | number>(null);
    const [scores, setScores] = useState(0);
    const [hamsterAppearTime, setHamsterAppearTime] = useState(0);
    const [results, setResults] = useState<number[]>([]);
    const [clickedId, setClickedId] = useState(-1);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (scores === 10) {
            dispatch(setNewGameResult(results))
            navigate('/traning-result');
        }
    }, [scores])

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const generateHamster = async (ms: number) => {
        await delay(ms);
        setHamsterId(Math.floor(Math.random() * 12));
        setHamsterAppearTime(performance.now());
    }

    useEffect(() => {
        generateHamster(5000);
    }, [])

    const handleHitHamster = (id: number) => {
        if (hamsterAppearTime !== 0) {
            const clickTime = performance.now();
            const reaction = clickTime - hamsterAppearTime;
            setResults([...results, reaction]);
        }
        const audio = new Audio(hitSound);
        audio.volume = 0.5;
        audio.play();
        const delay = (Math.floor(Math.random() * 4) + 2) * 1000;
        setScores((scores) => scores + 1)
        setShowHammer(true);
        setClickedId(id);
        setHamsterId(null);
        generateHamster(delay);
        setTimeout(() => {
            setShowHammer(false);
            audio.pause();
        }, 500)
    }

    const calculateSum = () => {
        return results.reduce((acc, curr) => acc + curr, 0);
    }



    return <div className={styles.background} style={showHammer ? { background: 'linear-gradient(135deg, #d0c5c5 0%, #ace8a0 100%)' } : {}}>
        <div>
            <GameTimerNew />
        </div>
        <div className={styles.results}>
            <div><img src={timerImage} alt="timer" />{calculateSum()} ms</div>
            <div><img className={styles.hamster} src={hamsterImage} alt='hamster' />{scores}/10</div>
        </div>
        <div className={styles['game-field']}>
            {Array.from({ length: 12 }).map((_, i) => <div className={styles.hole} key={i}>
                {clickedId === i && <div className={styles.reaction}>+{results[results.length - 1]} ms</div>}
                {hamsterId === i &&
                    <div className={styles.mole}>
                        <img className={styles.hamster} src={hamsterImage} alt='hamster' onClick={() => handleHitHamster(i)} />
                    </div>
                }
            </div>)}
        </div>
    </div>
}

/*

<div className={styles.wrapper} style={showHammer ? { background: '#d7fbbf' } : {}}>
        <div className={styles.score}>
            score - {scores}
            {results.map((res, i) => <div key={i}>Время реакции {res} мс</div>)}
            <div>Среднее время реакции {calculateAverage()} мс</div>
            <div>Лучшее время реакции {Math.min(...results)}</div>
        </div>
        <div className={styles.scene}>
            <div className={styles.box}>
                <div className={styles.front}>
                    {Array.from({ length: 16 }).map((_, i) => <div className={styles.hole} key={i}>
                        {hamsterId === i &&
                            <div className={styles.hamster_wrapper}>
                                {showHammer &&
                                    <img className={styles.molot} src={molot} alt='molot' />
                                }
                                <img className={styles.hamster} src={hamsterImage} alt='hamster' onClick={handleHitHamster} />
                            </div>
                        }
                    </div>)

                    }

                </div>
                <div className={styles.back}></div>
                <div className={styles.left}></div>
                <div className={styles.right}></div>
                <div className={styles.top}>
                </div>
                <div className={styles.bottom}></div>
            </div>
        </div>
    </div>

*/