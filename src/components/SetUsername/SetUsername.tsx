import styles from './SetUsername.module.css';

export const SetUsername = () => {
    return <div className={styles['main-wrapper']}>
        <div className={styles['info-wrapper']}>
            <div>Для игры необходимо задать Telegram username</div>
            <div>Settings -{`>`} Edit -{`>`} Username</div>
        </div>
    </div>
}