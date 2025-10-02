import { Blocks } from "react-loader-spinner"

export const Loader = ({ text }: { text?: string }) => {
    return <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
        <div>{text}</div>
        <Blocks
            height="80"
            width="80"
            color="rgb(24, 44, 218)"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
        />
    </div>
}