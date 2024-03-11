import { requests } from "@api/requests";

const RowItems = [
    { request: requests.fetchNowPlaying, title: "rows.title.nowPlaying" },
    { request: requests.fetchNetflixOriginals, title: "rows.title.netflixOriginals" },
    { request: requests.fetchTopRated, title: "rows.title.topRadted" },
    { request: requests.fetchActionMovies, title: "rows.title.action" },
    { request: requests.fetchComedyMovies, title: "rows.title.comedy" },
    { request: requests.fetchHorroryMovies, title: "rows.title.horrory" },
    { request: requests.fetchRomanceMovies, title: "rows.title.romance" },
    { request: requests.fetchDocumentaries, title: "rows.title.documentaries" },
];

export { RowItems };
