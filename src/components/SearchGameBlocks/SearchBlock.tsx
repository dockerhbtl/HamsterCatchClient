import {ColorRing} from "react-loader-spinner";
import coin from '../../assets/images/coins.png'

export const SearchBlock = ({text, isLoading, clickCallback, disabled = false, freeGames = 0}: {
    text: string,
    isLoading: boolean,
    clickCallback: () => void,
    disabled: boolean,
    freeGames?: number
}) => {

    return <div style={freeGames ? {width: '100%'} : {}} onClick={disabled ? () => {
    } : () => clickCallback()}>
        {isLoading
            ? <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#EBFF00', '#A4CA27', '#A4CA27', '#A4CA27', '#EBFF00']}
            />
            : <div> {freeGames ? `` :
                ""// <img style={{marginRight: '8px'}} src={coin} alt="Coin"/>
            } {text} {freeGames ? ` (${freeGames}) ` : ''} </div>
        }
    </div>
}