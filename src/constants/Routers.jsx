import Home from "@pages/Home";
import Series from "@pages/Series";
import Movie from "@pages/Movie";

const routers = [
    { name: "tab.home", path: "/Netflix", element: <Home /> },
    { name: "tab.series", path: "/Netflix/series", element: <Series /> },
    { name: "tab.movie", path: "/Netflix/movie", element: <Movie /> },
];

export { routers };
