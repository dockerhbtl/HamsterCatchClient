import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setIsSearching } from '../../store/reducers/GameSlice';
import { SearchBlock } from './SearchBlock';
import styles from './SearchGameBlocks.module.css';
import { AppConsts, GAME_TIME, MAIN_PAGE_ROUTE } from '../../consts/AppConsts';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { SearchGameModal } from "../SearchGameModal/SearchGameModal";
import { ConfirmGameModal } from "../ConfirmGameModal/ConfirmGameModal";


export const SearchGameBlocks = ({ socket }: { socket: WebSocket }) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const isSearching = useAppSelector(state => state.gameSlice.isSearching);
    const { username, freeGames } = useAppSelector(state => state.authSlice);
    const gameData = useAppSelector(state => state.gameSlice.gameData);

    function raisePrioirity(gameId: any) {
        socket.send(JSON.stringify({
            id: gameId,
            method: AppConsts.RAISE_PRIORITY,
        }));
    }

    useEffect(() => {
        let timeout: any;
        const raiseTimer = (Math.floor(Math.random() * 25) + 15) * 1000;
        if (gameData.gameId) {
            timeout = setTimeout(() => {
                raisePrioirity(gameData.gameId)
            }, raiseTimer);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [gameData.gameId]);

    useEffect(() => {

        if (gameData.isPlayersReady) {
            navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/game' : '/game')
        }

    }, [gameData.isPlayersReady]
    )


    const handleSearch = (sum: number) => {
        dispatch(setIsSearching(sum));
        socket.send(JSON.stringify({
            name: username,
            method: AppConsts.NEW_GAME,
            sumToPlay: sum
        }))
    }

    const handleReadyToPlay = () => {
        //console.log('gameData', gameData);
        socket.send(JSON.stringify({
            name: username,
            method: AppConsts.PROCESS,
            ready: 1,
            id: gameData.gameId,
            time: GAME_TIME
        }))
    }


    const handleStopSearching = () => {
        dispatch(setIsSearching(null))
        socket.send(JSON.stringify({
            method: AppConsts.GAME_CANCEL,
            id: gameData.gameId
        }))
    }

    const handleCancelGame = () => {
        socket.send(JSON.stringify({
            method: AppConsts.GAME_CANCEL,
            id: gameData.gameId
        }))

    }


    return <div className={styles['main-wrapper']}>
        {(isSearching !== null && !gameData.isGameCreated)
            ? <SearchGameModal handleStopSearching={handleStopSearching} />
            : ''

        }
        {gameData.isGameCreated
            ? <ConfirmGameModal handleCancelGame={handleCancelGame} gameData={gameData}
                handleReadyToPlay={handleReadyToPlay} />
            : ''

        }
        <div className={styles['title']}>Выберите номинал игры:</div>
        <div>
            {freeGames > 0
                ? <div className={styles['blocks-wrapper']}>
                    <SearchBlock text='Играть' freeGames={freeGames} isLoading={isSearching === 0}
                        clickCallback={() => handleSearch(0)} disabled={isSearching !== null} />
                </div>
                : ''
            }
            <div className={styles['blocks-wrapper']}>
                <SearchBlock text='100 C' isLoading={isSearching === 100}
                    clickCallback={() => handleSearch(100)} disabled={isSearching !== null} />
                <SearchBlock text='500 C' isLoading={isSearching === 500}
                    clickCallback={() => handleSearch(500)} disabled={isSearching !== null} />
            </div>
            <div className={styles['blocks-wrapper']}>
                <SearchBlock text='1000 C' isLoading={isSearching === 1000}
                    clickCallback={() => handleSearch(1000)} disabled={isSearching !== null} />
                <SearchBlock text='2500 C' isLoading={isSearching === 2500}
                    clickCallback={() => handleSearch(2500)} disabled={isSearching !== null} />
            </div>
            <div className={styles['blocks-wrapper']}>
                <SearchBlock text='5000 C' isLoading={isSearching === 5000}
                    clickCallback={() => handleSearch(5000)} disabled={isSearching !== null} />
                <SearchBlock text='10000 C' isLoading={isSearching === 10000}
                    clickCallback={() => handleSearch(10000)} disabled={isSearching !== null} />
            </div>
        </div>
    </div>
}

/*
            <Modal title="Игра готова" open={gameData.isGameCreated} onCancel={handleCancelGame} footer={[]}
                   width={'90%'}>
                <ConfirmGameWindow gameData={gameData} handleReadyToPlay={handleReadyToPlay}
                                   handleCancelGame={handleCancelGame}/>
            </Modal>
 */