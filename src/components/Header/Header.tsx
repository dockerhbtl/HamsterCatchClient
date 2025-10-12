import { useAppSelector } from "../../hooks/redux";
import styles from './Header.module.css';
import { useNavigate } from "react-router-dom";
import ava from '../../assets/images/hamster-game.png';
import ratingImg from '../../assets/images/rating.png';
import moneyNew from '../../assets/images/moneyNew.png';
import { MAIN_PAGE_ROUTE } from "../../consts/AppConsts";

export const Header = () => {
    const navigate = useNavigate();
    const { balance, username, rating } = useAppSelector(state => state.authSlice);


    const handleNavigate = (route: string) => {
        navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + route : route)
    }


    return <div className={styles['header-wrapper']}>
        <div className={styles['name']} onClick={() => handleNavigate('/my-profile')}>
            <img src={ava} alt="Ava" />
            <div>{username.length > 10 ? username.substr(0, 8) + '...' : username}</div>
        </div>
        <div className={styles['balance-wrapper']} onClick={() => handleNavigate('/rating')}>
            <div>
                <div className={styles.balanceNew}>{balance} <img src={moneyNew} alt="money" /></div>
            </div>
            <div className={styles.rating}>
                {rating}<img src={ratingImg} alt="rating" />
            </div>
        </div>
    </div>
}