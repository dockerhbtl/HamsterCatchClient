import { useAppSelector } from "../../hooks/redux";
import styles from './Header.module.css';
import { Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ava from '../../assets/images/avatar.png';
import money from '../../assets/images/money.png';
import dropdown from '../../assets/images/dropdown.png'
import { MAIN_PAGE_ROUTE } from "../../consts/AppConsts";

export const Header = () => {
    const navigate = useNavigate();
    const { balance, username } = useAppSelector(state => state.authSlice);
    const items = [
        {
            key: '1',
            label: ( ""
                // <Link to={MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/withdraw' : '/withdraw'} >
                //     Вывести средства
                // </Link>
            ),
        }
    ];


    return <div className={styles['header-wrapper']}>
        <div className={styles['name']}>
            <img src={ava} alt="Ava" />
            <div>{username.length > 10 ? username.substr(0, 8) + '...' : username}</div>
        </div>
        <Dropdown menu={{ items }} placement="bottom" arrow trigger={['click']}>
            <div className={styles['balance-wrapper']}>
                {String(balance).length <= 5 ?
                    ""//<img src={money} alt="money" />
                    : <div></div>
                }
                <div>{balance} C</div>
                <img src={dropdown} alt="dropdown" />
            </div>
        </Dropdown>
        {/*<div className={styles['up-balance']}>*/}
        {/*    <button onClick={() => navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/up-balance' : '/up-balance')}>Пополнить</button>*/}
        {/*</div>*/}
    </div>
}