import { createBrowserRouter, RouterProvider, Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import BetsListPage from "../pages/BetsListPage";
import NewBetPage from "../pages/NewBetPage";
import LoginPage from "../pages/LoginPage";

const ProtectedLayout = () => {
    const { session, loading } = useAuth();
    if (loading){
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (!session){
        return <Navigate to="/login" replace/>
    }
    return <Outlet/>
}

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage/>
    },
    //Protected
    {
        element: <ProtectedLayout/>,
        children: [
            {
                path: "/",
                element: <Navigate to="/bets" replace />,
            },
            {
                path:"/bets",
                element: <BetsListPage/>
            },
            {
                path: "/bets/new",
                element: <NewBetPage/>
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/bets" replace/>
    }
]);

export default function AppRouter(){
    return <RouterProvider router={router}/>
}