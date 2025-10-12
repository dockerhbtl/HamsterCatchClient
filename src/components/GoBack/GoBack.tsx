import { useNavigate } from 'react-router-dom';
import { MAIN_PAGE_ROUTE } from '../../consts/AppConsts';
import styles from './GoBack.module.css';
import { LeftOutlined } from "@ant-design/icons";

export const GoBack = ({ text }: { text: string }) => {
    const navigate = useNavigate();
    return <div className={styles.wrapper}><div onClick={() => navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE : '/')}><LeftOutlined /></div>  {text} </div>
}