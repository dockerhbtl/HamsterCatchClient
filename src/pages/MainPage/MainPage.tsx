import styles from './MainPage.module.css';
import { Header } from "../../components/Header/Header";
import logo from '../../assets/images/game-logo.png';
//import hamsterLogo from '../../assets/images/green_winner.png';
import { SearchGameBlocks } from "../../components/SearchGameBlocks/SearchGameBlocks";
import { MessageOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { MAIN_PAGE_ROUTE } from '../../consts/AppConsts';

export const MainPage = ({ socket }: { socket: WebSocket, }) => {
    const navigate = useNavigate();

    return <div className={styles['main-wrapper']}>
        <Header />
        <div className={styles['title-wrapper']}>
            <div>Скорее в бой!</div>
            <div>Стань чемпионом!</div>
        </div>
        <div className={styles['logo-test']}>
            <img src={logo} alt="New logo" />
        </div>
        <div>
            <SearchGameBlocks socket={socket} />
        </div>
        <div className={styles['help-btn']} onClick={() => navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/help' : '/help')}>
            <div>24/7</div>
            <div>
                <MessageOutlined />
            </div>
        </div>
    </div>
}