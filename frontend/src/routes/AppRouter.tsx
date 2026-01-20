import { createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {path: "/", element: None},
    {path: "/bets", element: None},
    {path: "/bets/new", element: None},
]);

export default function AppRouter(){
    return <RouterProvider router={router}/>
}