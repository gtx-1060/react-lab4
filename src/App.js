import React from "react";
import {Routes, Route, BrowserRouter, Navigate, HashRouter} from 'react-router-dom'
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import AdminPanelPage from "./pages/AdminPanelPage";

const App = () => {
    return (<div>
        <HashRouter>
            <Routes>
                <Route index path="/home" element={<MainPage />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/panel" element={<AdminPanelPage />}/>
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </HashRouter>
    </div>);
};

export default App;