import {useAppSelector} from "../../hooks/redux";
import hamsterRed from '../../assets/images/hamster_red.png'
import hamsterYellow from '../../assets/images/yellow_hamster.png'
import styles from './GamePlay.module.css';
import {useState} from "react";
import gloveRight from '../../assets/images/glove_right.png';
import gloveLeft from '../../assets/images/glove_left.png';
import beatenRed from '../../assets/images/hamster_red_beaten.png';
import yellowBeaten from '../../assets/images/hamster_yellow_beaten.png'
import {Loader} from "../Loader/Loader";

export const GamePlay = ({
                             gameData,
                             handleTapHamster,
                             isDisbledGame
                         }: { gameData: any, handleTapHamster: () => void, isDisbledGame: boolean }) => {

    const [show, setShow] = useState('');

    const username = useAppSelector(state => state.authSlice.username);

    const handleClickHamster = (glove: string) => {
        if (isDisbledGame) {
            return false;
        }
        setShow(glove)
        setTimeout(() => {
            setShow('')
        }, 100)
        handleTapHamster()
    }

    function defineHamsters() {
        const res: any = {};
        gameData.playersData.forEach((player: any) => {
            if (player.telegram === username) {
                res.me = player;
            } else {
                res.enemy = player;
            }
        });
        return res;
    }

    const hamsters = defineHamsters();


    return <div>
        {gameData.playersData.length > 0
            ? <div className={styles['hamster-wrapper']}>
                <div className={styles['first-hamster-wrapper']}>
                    <div className={styles['progress-bar']}>
                        <div className={styles['plank']}
                             style={hamsters.enemy.tap > 150 ? {marginBottom: '150px'} : {marginBottom: hamsters.enemy.tap + 'px'}}>
                            <div></div>
                            <div>{hamsters.enemy.tap}</div>
                        </div>
                    </div>
                    <div className={styles['hamster-with-name']}>
                        <div
                            className={styles['first-hamster-name']}>{hamsters.enemy.telegram.length > 12 ? hamsters.enemy.telegram.substr(0, 10) + '...' : hamsters.enemy.telegram}
                        </div>
                        {show === 'left'
                            ? <img src={gloveLeft} alt="glove" className={styles['animate-left']}/>
                            : ''
                        }
                        <div className={styles['first-hamster']}>
                            <img style={hamsters.me.tap > 70 ? {} : {height: '185px'}}
                                 src={hamsters.me.tap > 70 ? beatenRed : hamsterRed} alt="hamster"/>
                        </div>
                    </div>
                </div>
                <div className={styles['second-hamster-wrapper']}>
                    <div className={styles['progress-bar']}>
                        <div className={styles['plank-right']}
                             style={hamsters.me.tap > 150 ? {marginBottom: '150px'} : {marginBottom: hamsters.me.tap + 'px'}}>
                            <div>{hamsters.me.tap}</div>
                            <div></div>
                        </div>
                    </div>
                    <div className={styles['hamster-with-name-left']}>
                        <div style={{display: 'flex', justifyContent: 'end'}}>
                            <div
                                className={styles['second-hamster-name']}>{hamsters.me.telegram.length > 12 ? hamsters.me.telegram.substr(0, 10) + '...' : hamsters.me.telegram}</div>
                        </div>
                        {show === 'right'
                            ? <img src={gloveRight} alt="glove"
                                   className={styles['animate-right']}/>
                            : ''
                        }
                        <div className={styles['second-hamster']}>
                            <img src={hamsters.enemy.tap > 70 ? yellowBeaten : hamsterYellow} alt="hamstesr"
                                 onClick={() => handleClickHamster('left')}/>
                        </div>
                    </div>
                </div>
            </div>
            : <Loader/>

        }
    </div>
}
