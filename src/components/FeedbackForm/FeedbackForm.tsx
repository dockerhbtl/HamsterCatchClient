import styles from './FeedbackForm.module.css';
import { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MAIN_PAGE_ROUTE } from "../../consts/AppConsts";
import { useAppSelector } from "../../hooks/redux";
import { authApi } from "../../api/api";
import { toast } from "react-toastify";

export const FeedbackForm = ({ text, withGoBack }: { text: string, withGoBack: boolean }) => {

    const telegram = useAppSelector(state => state.authSlice.username);

    const [value, setValue] = useState('');
    const handleSendForm = () => {
        if (!value) return false;
        const data = {
            telegram: telegram,
            text: value
        }
        authApi.createFeedback(data).then(() => toast.success('Сообщение отправлено!'))
    }
    const navigate = useNavigate()
    return <div className={styles['main-wrapper']}>
        {withGoBack
            ? <div className={styles['go-back']}>
                <div className={styles['go-back-wrapp']} onClick={() => navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE : '/')}>
                    <LeftOutlined />
                    <div>назад</div>
                </div>
            </div>
            : ''
        }
        <div className={styles['title']}>{text}</div>
        <div className={styles['form-wrapper']}>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)}
                placeholder={'Опишите проблему'} />
            <button onClick={handleSendForm}>Отправить</button>
        </div>
    </div>
}