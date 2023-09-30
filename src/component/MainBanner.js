import React, { useEffect, useState } from "react";
import Requests from "./Requests";

function Banner() {
  const [movies, setMovie] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    fetch(Requests.popular)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.results);
      });
  }, []);
  //   console.log(movie)

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="w-100 h-[550] text-white">
      <div className=" w-full h-full">
        <div className="absolute w-full h-[711px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl pt-5 md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button className=" border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:bg-white">
              Play
            </button>
            <button className=" border text-white border-gray-300 py-2 px-5 ml-3 hover:border-white">
              Wath Later
            </button>
            <p className="text-gray-400 py-3 text-sm ">
              {" "}
              Released: {movie?.release_date}
            </p>
            <p className="w-full py-5 md:max-w-[35%] lg:max-w-[50%] xl:max-w-[75%] text-gray-200">
              {" "}
              {truncate(movie?.overview, 150)}
            </p>
          </div>
        </div>
  
      </div>
    </div>
  );
}

export default Banner;
