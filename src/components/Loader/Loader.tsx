import { Blocks, TailSpin } from "react-loader-spinner"

export const Loader = ({ text }: { text?: string }) => {
    return <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
        <div>{text}</div>
        <TailSpin
            height="80"
            width="80"
            color="#8BAD1C"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>
}