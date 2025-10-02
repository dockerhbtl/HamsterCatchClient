import styles from './SingleOperation.module.css';
import cashout from '../../assets/images/cashout.png';
import repl from '../../assets/images/replenisment.png';

export const SingleOperation = ({operation}: any) => {

    const defineStatus = () => {
        switch (operation.status) {
            case 'COMPLETED':  // if (x === 'value1')
                return 'Готов'
            case 'CREATED':  // if (x === 'value2')
                return 'В обработке'
            case 'CANCELLED':
                return 'Отменен'
            default:
                return operation.status
        }

    }
    const commentArr = operation.comment?.split(',');

    return <div className={styles['main-wrapper']}>
        <div className={styles['left-wrapper']}>
            <div>
                <img src={operation.operation === 'REPLENISHMENT' ? repl : cashout} alt=""/>
            </div>
            <div className={styles['left-data']}>
                <div>{operation.operation === 'REPLENISHMENT' ? 'Пополнение' : 'Вывод'}</div>
                <div>{commentArr?.[1]}, {commentArr?.[2]}</div>
            </div>
        </div>
        <div className={styles['right-data']}>
            <div>{operation.sum}</div>
            <div>{defineStatus()}</div>
        </div>
    </div>
}