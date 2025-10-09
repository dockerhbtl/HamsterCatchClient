import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux"

export const TraningResultPage = () => {
    const navigate = useNavigate();

    const taps = useAppSelector(state => state.gameSlice.newGameResult.taps);

    const sum = taps.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return <div>
        {taps.map((tap) => <div key={tap}>{tap}</div>)}
        <div>sum - {sum}</div>
        <button onClick={() => navigate('/')}>go home</button>
    </div>
}