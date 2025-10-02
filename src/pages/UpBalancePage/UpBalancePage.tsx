import styles from './UpBalance.module.css';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { MAIN_PAGE_ROUTE } from "../../consts/AppConsts";
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';

export const UpBalancePage = () => {
    const navigate = useNavigate();
    const [sum, setSum] = useState('');

    const handleCreateUpBalanceHref = () => {
        if (isNaN(Number(sum))) {
            toast.error('Wrong sum');
            return false;
        }
        if (Number(sum) < 500) {
            toast.error('Минимальная сумма пополнения 500');
            return false;
        }
        toast.success('Success');
    }

    return <div className={styles['main-wrapper']}>
        <div className={styles['go-back']}>
            <div className={styles['go-back-wrapp']} onClick={() => navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE : '/')}>
                <LeftOutlined />
                <div>назад</div>
            </div>
        </div>
        <div className={styles['content-wrapper']}>
            <div className={styles['title']}>Пополнение баланса</div>
            <div className={styles['controls-wrapper']}>
                <div>Сумма</div>
                <InputMask mask={'9999999999'} placeholder={'0 ₽'} value={sum}
                    maskChar={null} // позволяет вводить только числа и игнорирует остальные символы
                    alwaysShowMask={false}
                    onChange={(e) => setSum(e.target.value)} />
                <button onClick={handleCreateUpBalanceHref}>Пополнить</button>
            </div>
        </div>
    </div>
}