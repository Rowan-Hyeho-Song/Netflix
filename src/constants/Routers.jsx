import Home from "@pages/Home";
import Series from "@pages/Series";
import Movie from "@pages/Movie";

const routers = [
    { name: "Home", path: "/", element: <Home /> },
    { name: "Series", path: "/series", element: <Series /> },
    { name: "Movie", path: "/movie", element: <Movie /> },
];

export { routers };
