import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resetGameDataToInitialValues, setIsSearching } from '../../store/reducers/GameSlice';
import { SearchBlock } from './SearchBlock';
import styles from './SearchGameBlocks.module.css';
import { AppConsts, GAME_TIME, MAIN_PAGE_ROUTE } from '../../consts/AppConsts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SearchGameModal } from "../SearchGameModal/SearchGameModal";
import { ConfirmGameModal } from "../ConfirmGameModal/ConfirmGameModal";
import { BeforeGame } from '../BeforeGame/BeforeGame';


export const SearchGameBlocks = ({ socket, createSocketAndStartSearch }: { socket: WebSocket, createSocketAndStartSearch: any }) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const isSearching = useAppSelector(state => state.gameSlice.isSearching);
    const { id } = useAppSelector(state => state.authSlice);
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
            handleStartGame();
            // navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/game' : '/game')
        }

    }, [gameData.isPlayersReady]);




    const handleSearch = (sum: number) => {
        dispatch(setIsSearching(sum));
        createSocketAndStartSearch(id, sum);
    }

    const handleReadyToPlay = () => {
        socket.send(JSON.stringify({
            name: id,
            method: AppConsts.PROCESS,
            ready: 1,
            id: gameData.gameId,
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
        dispatch(resetGameDataToInitialValues())
    }

    const [showTraningEffect, setShowTranningEffect] = useState(false);
    const [showBeforeGameEffect, setShowBeforeGameEffect] = useState(false);


    const handleStartTraning = () => {
        setShowTranningEffect(true);
    }

    const handleStartGame = () => {
        dispatch(setIsSearching(null));
        setShowBeforeGameEffect(true)
    }


    return <>
        {showTraningEffect &&
            <BeforeGame route='/traning' />
        }
        {showBeforeGameEffect &&
            <BeforeGame route='/game' />
        }
        <div className={styles['main-wrapper']}>
            {(isSearching !== null && !gameData.isGameCreated)
                ? <SearchGameModal handleStopSearching={handleStopSearching} />
                : ''

            }
            {gameData.isGameCreated
                ? <ConfirmGameModal handleCancelGame={handleCancelGame} gameData={gameData}
                    handleReadyToPlay={handleReadyToPlay} />
                : ''

            }
            <div>
                <div className={styles['nav-wrappper']}>
                    <div onClick={() => navigate('/my-profile')}>Мой профиль</div>
                    <div onClick={() => navigate('/rating')}>Таблица рейтинга</div>
                </div>
                <div className={styles['blocks-wrapper']}>
                    <SearchBlock text='Тренировка' isLoading={isSearching === 0}
                        clickCallback={handleStartTraning} disabled={isSearching !== null} />
                </div>
                <div className={styles['blocks-wrapper']}>
                    <SearchBlock text='Online' additionalText={'free'} isLoading={isSearching === 0}
                        clickCallback={() => handleSearch(0)} disabled={isSearching !== null} />
                </div>
                <div className={styles['blocks-wrapper']}>
                    <SearchBlock text='Online' additionalText={100} isLoading={isSearching === 100}
                        clickCallback={() => handleSearch(100)} disabled={isSearching !== null} />
                </div>
                <div className={styles['blocks-wrapper']}>
                    <SearchBlock text='Online' additionalText={500} isLoading={isSearching === 500}
                        clickCallback={() => handleSearch(500)} disabled={isSearching !== null} />
                </div>

            </div>
        </div></>
}

/*
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
*/

/*
            <Modal title="Игра готова" open={gameData.isGameCreated} onCancel={handleCancelGame} footer={[]}
                   width={'90%'}>
                <ConfirmGameWindow gameData={gameData} handleReadyToPlay={handleReadyToPlay}
                                   handleCancelGame={handleCancelGame}/>
            </Modal>
 */