import { useEffect, useState } from "react";
import { AppConsts, MAIN_PAGE_ROUTE } from "../../consts/AppConsts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from './GamePage.module.css';
import { useNavigate } from "react-router-dom";
import { GameTimer } from "../../components/GameTimer/GameTimer";
import { GamePlay } from "../../components/GamePlay/GamePlay";
import { resetGameDataToInitialValues } from "../../store/reducers/GameSlice";


export const GamePage = ({ socket }: { socket: WebSocket }) => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const username = useAppSelector(state => state.authSlice.username);
    const gameData = useAppSelector(state => state.gameSlice.gameData);

    const [isDisbledGame, setDisabledGame] = useState(true);


    const handleTapHamster = () => {
        socket.send(JSON.stringify({
            name: username,
            method: AppConsts.PROCESS,
            tap: 1,
            id: gameData.gameId
        }))
    }


    async function delay(timer: number) {
        return new Promise(resolve => {
            setTimeout(resolve, timer);
        });
    }


    const handleEndGame = async (data: any) => {
        setDisabledGame(true);
        dispatch(resetGameDataToInitialValues());
        socket.send(JSON.stringify({
            method: AppConsts.END_GAME,
            id: data.gameId,
        }))
        setTimeout(() => {
            navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/result' : '/result')
        }, 100)
    }


    return <div className={styles['game-wrapper']}>
        <div>
            <GameTimer setDisabledGame={setDisabledGame} gameData={gameData} endGame={handleEndGame} />
        </div>
        <div>
            <GamePlay gameData={gameData} handleTapHamster={handleTapHamster} isDisbledGame={isDisbledGame} />
        </div>
    </div>
}