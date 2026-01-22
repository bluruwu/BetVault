import { createBrowserRouter, RouterProvider} from "react-router-dom";
import BetsListPage from "../pages/BetsListPage";
import NewBetPage from "../pages/NewBetPage";

const router = createBrowserRouter([
  { path: "/", element: <BetsListPage /> },
  { path: "/bets", element: <BetsListPage /> },
  { path: "/bets/new", element: <NewBetPage /> },
]);

export default function AppRouter(){
    return <RouterProvider router={router}/>
}