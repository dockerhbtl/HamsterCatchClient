import styles from './Withdraw.module.css';
import { useAppSelector } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { authApi } from "../../api/api";
import { ColorRing } from "react-loader-spinner";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import sbp from '../../assets/images/sbp.png';
import bankLogo from '../../assets/images/card.png';
import { toast } from "react-toastify";
import { SingleOperation } from "../../components/SingleOperation/SingleOperation";
import { MAIN_PAGE_ROUTE } from "../../consts/AppConsts";
import InputMask from 'react-input-mask';
import { Select } from "antd";

export const WithdrawPage = () => {
    const navigate = useNavigate()
    const balance = useAppSelector(state => state.authSlice.balance);
    const [isOperationLoaded, setIsOperationsLoaded] = useState(false);
    const [operations, setOperations] = useState([]);
    useEffect(() => {
        authApi.getOwnOperations().then((res) => {
            setOperations(res.data);
            setIsOperationsLoaded(true);
        })
    }, [])

    const [method, setMethod] = useState('SBP')
    const [sum, setSum] = useState('');
    const [number, setNumber] = useState('');
    const [bank, setBank] = useState('');
    const [cardNumber, setCardNumber] = useState('')

    const handleCreateWithdraw = () => {
        if (method === 'SBP') {
            if (isNaN(Number(sum)) || !number || !bank) return false;
            if (Number(sum) < 1000) {
                toast.error('Минимальная сумма для вывода 1000')
                return false;
            }
            const obj = {
                sum: sum,
                operation: 'CASHOUT',
                comment: 'Метод - SBP , номер - ' + number + ', банк - ' + bank
            }
            authApi.createWithdrawReq(obj).then(() => toast.success('Заявка создана!', { autoClose: 1000 }))
                .catch(() => toast.error('Произошла неизвестная ошибка, обратитесь в поддержку')).finally(() => {
                    setIsOperationsLoaded(false);
                    authApi.getOwnOperations().then((res) => {
                        setOperations(res.data);
                        setIsOperationsLoaded(true);
                    })
                })
        }
        if (method === 'bank') {
            if (isNaN(Number(sum)) || !cardNumber) return false;
            if (Number(sum) < 1000) {
                toast.error('Минимальная сумма для вывода 1000')
                return false;
            }
            const obj = {
                sum: sum,
                operation: 'CASHOUT',
                comment: 'Метод - bank , номер карты - ' + cardNumber
            }
            authApi.createWithdrawReq(obj).then(() => toast.success('Заявка создана!', { autoClose: 1000 }))
                .catch(() => toast.error('Произошла неизвестная ошибка, обратитесь в поддержку')).finally(() => {
                    setIsOperationsLoaded(false);
                    authApi.getOwnOperations().then((res) => {
                        setOperations(res.data);
                        setIsOperationsLoaded(true);
                    })
                })
        }
    }


    return <div className={styles['main-wrapper']}>
        <div className={styles['padding']}>
            <div className={styles['go-back']}>
                <div className={styles['go-back-wrapp']} onClick={() => navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE : '/')}>
                    <LeftOutlined />
                    <div>назад</div>
                </div>
            </div>
            <div>
                <div className={styles['withdraw-title']}>Вывод средств</div>
                <div className={styles['withdraw-balance']}>
                    <div>Доступно к выводу:</div>
                    <div>{balance} ₽</div>
                </div>
            </div>
            <div className={styles['method-wrapper']}>
                <div onClick={() => setMethod('SBP')}
                    style={method === 'SBP' ? { background: 'rgb(121, 121, 121)' } : {}}><img
                        src={sbp} style={{ width: '50px' }}
                        alt="SBP" /></div>
                <div onClick={() => setMethod('bank')}
                    style={method === 'bank' ? { background: 'rgb(121, 121, 121)' } : {}}><img
                        src={bankLogo} style={{ width: '50px' }}
                        alt="Card" /></div>
            </div>

            <div className={styles['form-wrapper']}>
                <label>Сумма:</label>
                <InputMask mask={'9999999999'} placeholder={'0 ₽'} value={sum}
                    maskChar={null} // позволяет вводить только числа и игнорирует остальные символы
                    alwaysShowMask={false}
                    onChange={(e) => setSum(e.target.value)} />
                {/*<input placeholder={'0 ₽'} type="text" value={sum} onChange={(e) => setSum(e.target.value)}/>*/}
                {method === 'SBP'
                    ? <>
                        <label>Номер телефона:</label>
                        <InputMask
                            mask="+7(999) 999-99-99"
                            maskChar=" "
                            placeholder="+7(999) 999-99-99"
                            type={'tel'}
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                        <label>Банк:</label>
                        <Select placeholder={'Тинькофф'} style={{ height: '60px', borderRadius: '16px' }}
                            value={bank ? bank : undefined}
                            onChange={setBank}>
                            <Select.Option value={'Tinkoff'}>Тинькофф</Select.Option>
                            <Select.Option value={'Sber'}>Сбер</Select.Option>
                            <Select.Option value={'VTB'}>ВТБ</Select.Option>
                            <Select.Option value={'Alfa'}>Альфа</Select.Option>
                        </Select>
                    </>
                    : ''
                }
                {method === 'bank'
                    ? <>
                        <label>Номер карты:</label>
                        <InputMask
                            mask="9999-9999-9999-9999"
                            maskChar=" "
                            placeholder="9999 9999 9999 9999"
                            type={'text'}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                    </>
                    : ''

                }
                <button onClick={handleCreateWithdraw}>Вывести</button>
            </div>
        </div>

        <div className={styles['history-wrapper']}>
            <div className={styles['history-title']}>История операций</div>
            {isOperationLoaded
                ? <div>
                    {operations.length > 0
                        ? <div>
                            {operations.map((operation, i) => <SingleOperation key={i} operation={operation} />)}
                        </div>
                        : <div>Нет операций</div>
                    }
                </div>
                : <div className={styles['loader-wrapper']}>
                    <ColorRing
                        visible={true}
                        height="55"
                        width="55"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#EBFF00', '#A4CA27', '#A4CA27', '#A4CA27', '#EBFF00']}
                    />
                </div>
            }
        </div>
    </div>
}