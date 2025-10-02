import {Modal} from "antd";
import styles from './SearchGameModal.module.css';
import {ColorRing} from "react-loader-spinner";
import {useAppSelector} from "../../hooks/redux";
import money from '../../assets/images/money.png';
import yellowHamster from '../../assets/images/yellow_hamster.png';
import shadowHamster from '../../assets/images/shadow_hamster.png';

export const SearchGameModal = ({handleStopSearching}: { handleStopSearching: () => void }) => {
    const username = useAppSelector(state => state.authSlice.username);
    const isSearching = useAppSelector(state => state.gameSlice.isSearching);

    return <Modal open={true} className={styles['modal-wrapper']} onCancel={handleStopSearching}
                  footer={[]}
                  width={'90%'}>
        <div className={styles['content-wrapper']}>
            <div className={styles['search-info-wrapper']}>
                <div>Среднее время поиска игры 45-80 секунд</div>
            </div>
            <div className={styles['loader-wrapper']}>
                <ColorRing
                    visible={true}
                    height="35"
                    width="35"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#EBFF00', '#A4CA27', '#A4CA27', '#A4CA27', '#EBFF00']}
                />
            </div>
            <div className={styles['search-data']}>
                <div>
                    Ищем соперника для
                </div>
                <div>
                    {username}
                </div>
            </div>
            <div className={styles['game-nominal-wrapper']}>
                <div className={styles['game-nominal']}>
                    <img src={money} alt="Coin"/>
                    <div>
                        {isSearching === 0
                            ? 'Бесплатная игра'
                            : `Игра за ${isSearching} ₽`
                        }
                    </div>
                </div>
            </div>
            <div className={styles['hamsters-wrapper']}>
                <img src={yellowHamster} alt="Hamster"/>
                <img src={shadowHamster} alt="Hamster"/>
            </div>
            <div className={styles['cancel-game-wrapper']}>
                <button onClick={handleStopSearching}>Отменить поиск</button>
            </div>
        </div>
    </Modal>
}