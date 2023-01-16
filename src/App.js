import React from "react";
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
    return (<div>
        <BrowserRouter>
            <Routes>
                <Route index path="/home" element={<MainPage />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </BrowserRouter>
    </div>);
};

export default App;