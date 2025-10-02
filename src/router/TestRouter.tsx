import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { MAIN_PAGE_ROUTE } from "../consts/AppConsts";

export const TestRouter = () => {
    const router = createBrowserRouter([
        {
            path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE : '/',
            element: <First />,
        },
        {
            path: MAIN_PAGE_ROUTE ? MAIN_PAGE_ROUTE + "/second" : '/second',
            element: <Second />,
        },
    ]);
    return <div>
        <RouterProvider router={router} />
    </div>
}

const First = () => {
    const navigate = useNavigate();
    return <div>
        First
        <button onClick={() => navigate(MAIN_PAGE_ROUTE ? '/' + MAIN_PAGE_ROUTE + '/second' : '/second')}>go second</button>
    </div>
}

const Second = () => {
    const navigate = useNavigate();
    return <div>
        Second
        <button onClick={() => navigate(MAIN_PAGE_ROUTE ? '/' + MAIN_PAGE_ROUTE + '/' : '/')}>go first</button>
    </div>
}