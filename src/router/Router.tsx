import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import { MainPage } from "../pages/MainPage/MainPage";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect, useState } from "react";
import { getMyUsername } from "../store/reducers/AuthSlice";
import { Loader } from "../components/Loader/Loader";
import { AppConsts, MAIN_PAGE_ROUTE } from "../consts/AppConsts";
import {
    resetGameDataToInitialValues,
    setDisconnected,
    setGameId,
    setGameProcess,
    setGameResults,
    setIsGameCreated,
    setTappedId
} from "../store/reducers/GameSlice";
import { GamePage } from "../pages/GamePage/GamePage";
import { UpBalancePage } from "../pages/UpBalancePage/UpBalancePage";
import { WithdrawPage } from "../pages/WithdtawPage/WithdrawPage";
import { FeedbackForm } from "../components/FeedbackForm/FeedbackForm";
import { toast } from "react-toastify";
import { HamsterKillerTraning } from "../components/HamsterKiller/HamsterKillerTraning";
import { TraningResultPage } from "../pages/TraningResultPage/TraningResultPage";
import { GameResultPage } from "../pages/TraningResultPage/GameResultPage";
import { MyProfile } from "../pages/MyProfile/MyProfile";


export const Router = () => {
    const [appLoaded, setAppLoaded] = useState(false);
    const [socket, setSocket] = useState<any>(undefined);

    const dispatch = useAppDispatch();

    const { token } = useAppSelector(state => state.tokenSlice);



    useEffect(() => {
        if (token) {
            dispatch(getMyUsername()).then(() => setAppLoaded(true))
        }
    }, []);


    const createSocketAndStartSearch = (id: string, sum: number) => {
        const createdSocket = new WebSocket("ws://localhost:5000");
        createdSocket.onopen = function () {
            createdSocket.send(JSON.stringify({
                name: id,
                method: AppConsts.NEW_GAME,
                sumToPlay: sum
            }))
        };
        createdSocket.onclose = function () {
            // window.location.reload();
        };
        createdSocket.onerror = function (error: any) {
            console.error('Ошибка веб-сокета:', error);
            //  window.location.reload();
        };
        createdSocket.onmessage = function (event: { data: string }) {
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
                    break;
                case AppConsts.GAME_LEAVE:
                    dispatch(setDisconnected());
                    createdSocket.close();
                    setSocket(null);
                    break;
                case AppConsts.GAME_CANCEL:
                    dispatch(resetGameDataToInitialValues());
                    createdSocket.close();
                    setSocket(null);
                    break;
                case AppConsts.END_GAME:
                    dispatch(setGameResults(data));
                    createdSocket.close();
                    setSocket(null);
                    break;
                case AppConsts.BALANCE_IS_NOT_ENOUGH:
                    toast.error(data.message, {
                        style: {
                            marginTop: '16px'
                        },
                        autoClose: 2000
                    })
                    dispatch(resetGameDataToInitialValues());
                    createdSocket.close();
                    setSocket(null);
                    break;
                case AppConsts.SERVER_IS_OVERLOADED:
                    dispatch(resetGameDataToInitialValues())
                    toast.error('Сервер перегружен попробуйте позже');
                    createdSocket.close();
                    setSocket(null);
                    break;
                default:
                    break;
            }
        };
        setSocket(createdSocket)
    }


    const router = createBrowserRouter([
        {
            path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE : '/',
            element: <MainPage socket={socket} createSocketAndStartSearch={createSocketAndStartSearch} />,
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
            path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + "/game-results" : '/game-results',
            element: <GameResultPage />,
        },
        {
            path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/my-profile' : '/my-profile',
            element: <MyProfile />,
        },
        {
            path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + "/rating" : '/rating',
            element: <div>Страница рейтинга</div>,
        },
        // {
        //     path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/up-balance' : '/up-balance',
        //     element: <UpBalancePage />
        // },
        // {
        //     path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/withdraw' : '/withdraw',
        //     element: <WithdrawPage />
        // },
        {
            path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/help' : '/help',
            element: <FeedbackForm text={'Сообщите нам о проблеме и мы обязательно с вами свяжемся'} withGoBack={true} />
        }
    ]);
    return (appLoaded) ? <div>
        <RouterProvider router={router} />
    </div> : <Loader />;
}
