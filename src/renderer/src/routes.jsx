import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ReturnToCustomers from "./pages/ReturnToCustomers";
import DefaultPage from "./components/DefaultPage";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<DefaultPage />}>
                    <Route index element={<Home />} />
                    <Route path='/retorno' element={<ReturnToCustomers />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}