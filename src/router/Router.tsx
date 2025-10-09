import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import { MainPage } from "../pages/MainPage/MainPage";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect, useState } from "react";
import { getMyUsername } from "../store/reducers/AuthSlice";
import { Loader } from "../components/Loader/Loader";
import { AppConsts, MAIN_PAGE_ROUTE } from "../consts/AppConsts";
import {
    resetGameDataToInitialValues,
    setGameId,
    setGameProcess,
    setGameResults,
    setIsGameCreated,
    setTappedId
} from "../store/reducers/GameSlice";
import { GamePage } from "../pages/GamePage/GamePage";
import { ResultPage } from "../pages/ResultPage/ResultPage";
import { UpBalancePage } from "../pages/UpBalancePage/UpBalancePage";
import { WithdrawPage } from "../pages/WithdtawPage/WithdrawPage";
import { FeedbackForm } from "../components/FeedbackForm/FeedbackForm";
import { toast } from "react-toastify";
import { HamsterKillerTraning } from "../components/HamsterKiller/HamsterKillerTraning";
import { TraningResultPage } from "../pages/TraningResultPage/TraningResultPage";


export const Router = () => {
    const [appLoaded, setAppLoaded] = useState(false);
    const [socket, setSocket] = useState<any>(undefined);

    const dispatch = useAppDispatch();

    const { token } = useAppSelector(state => state.tokenSlice);
    //const dataGameSlice = useAppSelector(state => state.gameSlice)


    useEffect(() => {
        if (token) {
            dispatch(getMyUsername()).then(() => setAppLoaded(true))
        }
    }, []);


    useEffect(() => {
        if (socket) {
            socket.onopen = function () {
                // socket.send();
            };
            socket.onclose = function () {
                window.location.reload();
            };
            socket.onerror = function (error: any) {
                console.error('Ошибка веб-сокета:', error);
                window.location.reload();
            };
            socket.onmessage = function (event: { data: string }) {
                const data = JSON.parse(event.data);
                console.log('data', data);

                switch (data.status) {
                    case AppConsts.FINDING:
                        dispatch(setGameId(data.gameId))
                        break;
                    case AppConsts.GAME_CREATED:
                        dispatch(setIsGameCreated({
                            isGameCreated: true,
                            gameId: data.gameId,
                            playersData: data.players,
                            isPlayersReady: false
                        }))

                        break;
                    case AppConsts.PLAYERS_READY:
                        if (data.tappedId) {
                            dispatch(setTappedId(data))
                        } else {
                            dispatch(setGameProcess({
                                gameId: data.gameId,
                                playersData: data.players,
                                position: data.position,
                                isPlayersReady: true
                            }))
                        }
                        break
                    case AppConsts.GAME_CANCEL:
                        dispatch(resetGameDataToInitialValues())
                        break;
                    case AppConsts.END_GAME:
                        dispatch(setGameResults(data))
                        break;
                    case AppConsts.BALANCE_IS_NOT_ENOUGH:
                        toast.error(data.message, {
                            style: {
                                marginTop: '16px'
                            },
                            autoClose: 2000
                        })
                        dispatch(resetGameDataToInitialValues())
                        break;
                    case AppConsts.SERVER_IS_OVERLOADED:
                        dispatch(resetGameDataToInitialValues())
                        toast.error('Сервер перегружен попробуйте позже')
                        break;
                    default:
                        break;
                }
            };
        } else {
            // setSocket(new WebSocket("wss://hamster-battle-app.pro"))
            //setSocket(new WebSocket("wss://web-app-telegramm-backend.ru"))
            setSocket(new WebSocket("ws://localhost:5000"))
        }


    }, [socket]);

    // const createSocket = () => {
    //     setSocket(new WebSocket("ws://localhost:5000"))
    // }

    const router = createBrowserRouter([
        {
            path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE : '/',
            element: <MainPage socket={socket} />,
        },
        {
            path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/traning' : '/traning',
            element: <HamsterKillerTraning />,
        },
        {
            path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/traning-result' : '/traning-result',
            element: <TraningResultPage />
        },
        {
            path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + "/game" : '/game',
            element: <GamePage socket={socket} />,
        },
        {
            path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + "/result" : '/result',
            element: <ResultPage />,
        },
        {
            path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/up-balance' : '/up-balance',
            element: <UpBalancePage />
        },
        {
            path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/withdraw' : '/withdraw',
            element: <WithdrawPage />
        },
        {
            path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/help' : '/help',
            element: <FeedbackForm text={'Сообщите нам о проблеме и мы обязательно с вами свяжемся'} withGoBack={true} />
        }
    ]);
    return (appLoaded && socket) ? <div>
        <RouterProvider router={router} />
    </div> : <Loader />;
}
