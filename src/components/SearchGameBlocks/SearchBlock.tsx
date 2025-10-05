import { ColorRing } from "react-loader-spinner";
import coin from '../../assets/images/coins.png'
import moneyNew from '../../assets/images/moneyNew.png';

export const SearchBlock = ({ text, isLoading, clickCallback, disabled = false, additionalText }: {
    text: string,
    isLoading: boolean,
    clickCallback: () => void,
    disabled: boolean,
    additionalText?: string | number;
}) => {

    return <div style={{ width: '100%' }} onClick={disabled ? () => {
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
            : <div>{text} {additionalText &&
                <>
                    {typeof additionalText === 'number' ? <>( {additionalText} <img src={moneyNew} style={{ height: '14px', marginRight: '6px', marginLeft: '2px', marginTop: '-2px' }} alt="money" />) </> : '(' + additionalText + ')'}
                </>
            } </div>
        }
    </div>
}