import React from "react";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
    return (<div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/login" element={<LoginPage />}/>
            </Routes>
        </BrowserRouter>
    </div>);
};

export default App;