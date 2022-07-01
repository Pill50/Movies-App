import React, { useEffect, useState } from "react";
import Movies from "./components/Movies";

const FEATURE_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  useEffect(() => {
    getMovies(FEATURE_API);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchItem) {
      getMovies(SEARCH_API + searchItem);
      setSearchItem("");
    }
  };

  const handleOnchange = (e) => {
    setSearchItem(e.target.value);
  };

  return (
    <div className="root">
      <header>
        <form onSubmit={handleSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search...."
            value={searchItem}
            onChange={handleOnchange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movies key={movie.key} {...movie} />)}
      </div>
    </div>
  );
}

export default App;
