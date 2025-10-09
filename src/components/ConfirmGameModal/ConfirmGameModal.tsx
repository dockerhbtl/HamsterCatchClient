import { Modal } from "antd";
import yellowHamster from '../../assets/images/yellow_hamster.png';
import redHamster from '../../assets/images/red_hamster.png';
import styles from './ConfirmGameModal.module.css';
import { useEffect, useState } from "react";
//@ts-ignore
import sound from "../../assets/sounds/founded.mp3";
import { Watch } from "react-loader-spinner";

export const ConfirmGameModal = ({ handleCancelGame, gameData, handleReadyToPlay }: {
    handleCancelGame: () => void,
    gameData: any,
    handleReadyToPlay: () => void
}) => {
    const [count, setCount] = useState(10);
    useEffect(() => {
        const audio = new Audio(sound);
        audio.volume = 0.5;
        audio.play();
        return () => {
            audio.pause();
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (count === 0) {
                handleCancelGame();
                clearInterval(interval);
            } else {
                setCount(prevCount => prevCount - 1);
            }
        }, 1000);

        return () => {
            clearInterval(interval)
        };
    }, [count]);

    console.log('gameData.playersData', gameData.playersData);


    return <Modal open={true} className={styles['modal-wrapper']} onCancel={handleCancelGame}
        footer={[]}
        width={'90%'}>
        <div className={styles['main-wrapper']}>
            <div className={styles['timer-wrapper']}><Watch
                visible={true}
                height="40"
                width="40"
                radius="20"
                color="#EBFF00"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
                <div className={styles['timer']}>{count}</div>
            </div>
            <div>Игра готова!</div>
            <div className={styles['name-wrapper']}>
                <div className={styles['name']}>
                    {gameData.playersData[0].username}
                </div>
                <div className={styles['vs']}>VS</div>
                <div className={styles['name']}>
                    {gameData.playersData[1].username}
                </div>
            </div>
            <div className={styles['hamsters-wrapper']}>
                <div className={styles['hamster']} style={gameData.playersData[0].ready ? { background: '#A2C825' } : {}}>
                    <img src={yellowHamster} alt="first player" />
                </div>
                <div className={styles['hamster']} style={gameData.playersData[1].ready ? { background: '#A2C825' } : {}}>
                    <img src={redHamster} alt="second player" />
                </div>
            </div>
            <div className={styles['confirm-btn']}>
                <button onClick={handleReadyToPlay}>Принять игру</button>
            </div>
        </div>
    </Modal>
}