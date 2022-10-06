import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/mainPage";
import ComicsPage from "../pages/comicsPage";
import SingleComicPage from "../pages/singlComicPage";
import ErrorPage from "../pages/errorPage";


const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path='/comics/:comicid' element={<SingleComicPage />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )    
}

export default App;