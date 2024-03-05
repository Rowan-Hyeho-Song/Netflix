import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routers } from "@constants/Routers";
import Nav from "@components/Nav";

function App() {
    return (
        <>
            <BrowserRouter>
                <Nav />
                <Routes>{routers && routers.map(({ path, element, i }) => <Route key={`route-${i}`} path={path} element={element} />)}</Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
