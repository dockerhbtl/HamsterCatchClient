import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux"

export const TraningResultPage = () => {
    const navigate = useNavigate();

    const taps = useAppSelector(state => state.gameSlice.newGameResult.taps);
    return <div>
        {taps.map((tap) => <div key={tap}>{tap}</div>)}
        <button onClick={() => navigate('/')}>go home</button>
    </div>
}