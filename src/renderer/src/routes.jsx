import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ReturnToCustomers from "./pages/ReturnToCustomers";
import DefaultPage from "./components/DefaultPage";
import LoanBatteries from "./pages/LoanBatteries";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<DefaultPage />}>
                    <Route index element={<Home />} />
                    <Route path='/retorno' element={<ReturnToCustomers />} />
                    <Route path='/baterias-de-emprestimo' element={<LoanBatteries />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}