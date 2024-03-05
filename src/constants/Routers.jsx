import Home from "@pages/Home";
import Series from "@pages/Series";
import Movie from "@pages/Movie";

const routers = [
    { name: "tab.home", path: "/", element: <Home /> },
    { name: "tab.series", path: "/series", element: <Series /> },
    { name: "tab.movie", path: "/movie", element: <Movie /> },
];

export { routers };
