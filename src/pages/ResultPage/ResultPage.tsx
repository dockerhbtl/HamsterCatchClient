import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from './ResultPage.module.css';
import redWinner from '../../assets/images/red_winner.png';
import greenWinner from '../../assets/images/green_winner.png';
import looserRed from '../../assets/images/looser_red.png';
import looserGreen from '../../assets/images/looser_green.png';
import { useNavigate } from "react-router-dom";
import { getMyUsername } from "../../store/reducers/AuthSlice";
import winnerStar from '../../assets/images/winner_star.png';
import looserStar from '../../assets/images/looser_star.png';
import { MAIN_PAGE_ROUTE } from "../../consts/AppConsts";
import { useEffect, useState } from "react";

export const ResultPage = () => {


    return <div className={styles['main-wrapper']}>
        test
    </div>
}