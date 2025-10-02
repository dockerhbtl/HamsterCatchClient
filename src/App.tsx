import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { Router } from "./router/Router";
import { getToken } from "./store/reducers/TokenSlice";
import { useEffect, useState } from "react";
import { Loader } from "./components/Loader/Loader";
import { SetUsername } from "./components/SetUsername/SetUsername";
import { FeedBackFormWithoutNavigate } from "./components/FeedbackForm/FeedBackFormWithoutNavigate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorCodes } from "./consts/AppConsts";
import { WrongPlatform } from "./components/SetUsername/WrongPlatform";


function App() {
    //@ts-ignore
    const initData = window.Telegram?.WebApp?.initData;
     // const initData = 'query_id=AAEnfFZLAAAAACd8Vks-nq3p&user=%7B%22id%22%3A1263959079%2C%22first_name%22%3A%22%D0%9C%D0%B0%D1%82%D0%B2%D0%B5%D0%B9%22%2C%22last_name%22%3A%22%D0%91%D0%B0%D1%83%D0%BA%D0%BE%D0%B2%22%2C%22username%22%3A%22driveChatt%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1721853756&hash=ae93da661f5e8632f8c51f757a90e996ac92176e6fa1408d861c50cd2630e007';
    //
    //@ts-ignore
    const platform = window.Telegram?.WebApp?.platform;
    // const platform = 'ios';


    const dispatch = useAppDispatch();

    const { token, errorText, errorCode } = useAppSelector(state => state.tokenSlice);

    const [appLoaded, setAppLoaded] = useState(false);


    useEffect(() => {
        if (initData) {
            dispatch(getToken(initData)).then(() => setAppLoaded(true))
        }
    }, [])

    const defineErrorComponent = () => {
        switch (errorCode) {
            case errorCodes.blocked:
                return <FeedBackFormWithoutNavigate
                    text={errorText} />
            case errorCodes.emptyUsername:
                return <SetUsername />
            case errorCodes.wrongPlatfrom:
                return <WrongPlatform level={3} />
            case errorCodes.wrongData:
                return <FeedBackFormWithoutNavigate
                    text={'Ошибка авторизации, сообщие в поддержку'} />
            case errorCodes.userAlreadyExist:
                return <FeedBackFormWithoutNavigate
                    text={'Данный username уже занят, попобуйте поменять username в настройках телеграм'} />
            default:
                return <FeedBackFormWithoutNavigate
                    text={'Произошла неизвестная ошибка, обратитесь в поддержку'} />
        }
    }

     const isAcceptedPlatform = platform === 'android' || platform === 'ios' || platform === 'android_x';
    // const isAcceptedPlatform = true;

    return <div>
        <div>
            {isAcceptedPlatform
                ? <div>
                    {appLoaded
                        ? <div>
                            {token
                                ? <Router />
                                : defineErrorComponent()

                            }
                        </div>
                        : <>
                            <Loader />
                        </>
                    }
                </div>
                : <WrongPlatform level={2} />
            }
        </div>
        <ToastContainer />
    </div>
}

export default App;


export const AppWrapper = () => {
    const [AlD, sAlD] = useState(false);

    const dD = () => {
        if (navigator.maxTouchPoints > 2 && navigator.maxTouchPoints < 15) {
            sAlD(true);
        }
    }

    useEffect(() => {
        dD()
    }, []);


    return <div>
        {AlD
            ? <App />
            : <WrongPlatform level={1} />
        }
    </div>
}
