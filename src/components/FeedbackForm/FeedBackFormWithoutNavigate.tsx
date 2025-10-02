import styles from './FeedbackForm.module.css';
import {useState} from "react";
import {LeftOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {authApi} from "../../api/api";
import {toast} from "react-toastify";

export const FeedBackFormWithoutNavigate = ({text}: { text: string }) => {
    const [value, setValue] = useState('');
    const [telegram, setTelegram] = useState('')
    const handleSendForm = () => {
        if (!value) return false;
        const data = {
            telegram: telegram,
            text: value
        }
        authApi.createFeedback(data).then(() => toast.success('Сообщение отправлено!'))
    }
    return <div className={styles['main-wrapper']}>
        <div className={styles['title']}>{text}</div>
        <div className={styles['form-wrapper']}>
            <input type="text" value={telegram} onChange={(e) => setTelegram(e.target.value)}
                   placeholder={'Telegram'}/>
            <br/>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)}
                   placeholder={'Опишите проблему'}/>
            <button onClick={handleSendForm}>Отправить</button>
        </div>
    </div>
}