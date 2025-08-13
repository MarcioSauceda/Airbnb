import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ListingDetail from "../pages/ListingDetail";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "../components/Navbar";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route
                    path="/listing/:id"
                    element={
            <ProtectedRoute>
                <ListingDetail/>
            </ProtectedRoute>
            }
        />
    </Routes>
    </BrowserRouter>
    );
}
