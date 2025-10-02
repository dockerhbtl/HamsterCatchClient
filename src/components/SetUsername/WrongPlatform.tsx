import styles from './SetUsername.module.css';

export const WrongPlatform = ({ level }: { level: number }) => {
    return <div className={styles['main-wrapper']}>
        <div className={styles['info-wrapper']}>
            <div>Игра доступна только на мобильных устройствах - {level}</div>
        </div>
    </div>
}