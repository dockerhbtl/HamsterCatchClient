import { useEffect, useState } from 'react';
import { GoBack } from '../../components/GoBack/GoBack';
import styles from './RatingPage.module.css';
import { Loader } from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getTopRating, setPage } from '../../store/reducers/RatingSlice';
import { useNavigate } from 'react-router-dom';
import { MAIN_PAGE_ROUTE } from '../../consts/AppConsts';

export const RatingPage = () => {
    const [appLoaded, setAppLoaded] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { count, data, page } = useAppSelector(state => state.ratingSlice.ratingTable);


    useEffect(() => {
        if (data.length === 0) {
            dispatch(getTopRating(1)).then(() => setAppLoaded(true));
        } else {
            setAppLoaded(true)
        }
    }, [data.length]);


    const handleGoToUser = (id: number) => {
        navigate(MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + '/user/' + id : '/user/' + id);
    }

    const handleLoadMore = () => {
        let newPage = page + 1;
        dispatch(getTopRating(newPage));
        dispatch(setPage(newPage));
    }


    return <div className={styles['main-wrapper']}>
        <GoBack text='Таблица рейтинга' />
        {appLoaded
            ? <div className={styles['table-wrapper']}>
                <div className={styles['title-wrapper']}>
                    <div>#</div>
                    <div>Username</div>
                    <div>Рейтинг</div>
                </div>
                {data.map((user, i) => {
                    return <div key={i} onClick={() => handleGoToUser(user.id)} className={styles['row-wrapper']} style={i % 2 ? { background: '#13164d' } : { background: '#323459' }}  >
                        <div>{i + 1}</div>
                        <div>{user.username}</div>
                        <div>{user.rating}</div>
                    </div>
                })}
                {data.length < count &&
                    <div className={styles['more-wrapper']} onClick={() => handleLoadMore()}>Загрузить еще</div>
                }
            </div>
            : <Loader />

        }
    </div>
}