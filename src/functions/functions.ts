import dragonflyIcon from '../assets/images/dragonfly.png';
import cheetahIcon from '../assets/images/cheetah.png';
import catIcon from '../assets/images/cat.png';
import elephantIcon from '../assets/images/elephant.png';

import koalaIcon from '../assets/images/koala.png';
import slothIcon from '../assets/images/sloth.png';
import turtleIcon from '../assets/images/turtle.png';

export const defaineImageByTime = (time: number) => {
    if (time < 450) {
        return dragonflyIcon;
    } else if (time >= 450 && time < 550) {
        return cheetahIcon;
    } else if (time >= 550 && time < 650) {
        return catIcon;
    } else if (time >= 650 && time < 750) {
        return elephantIcon;
    } else if (time >= 750 && time < 850) {
        return koalaIcon;
    } else if (time >= 850 && time < 950) {
        return slothIcon;
    } else if (time >= 950) {
        return turtleIcon;
    } else {
        return turtleIcon;
    }
}

export const defaineImageByFullTime = (time: number, count: number) => {
    if (count < 10) {
        return turtleIcon;
    }
    if (time < 5000) {
        return dragonflyIcon;
    } else if (time >= 5000 && time < 6000) {
        return cheetahIcon;
    } else if (time >= 6000 && time < 7000) {
        return catIcon;
    } else if (time >= 7000 && time < 8000) {
        return elephantIcon;
    } else if (time >= 8000 && time < 8500) {
        return koalaIcon;
    } else if (time >= 8500 && time < 9500) {
        return slothIcon;
    } else if (time >= 9500) {
        return turtleIcon;
    } else {
        return turtleIcon;
    }
}