import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// import Movies from "./Movies";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ReactYoutube from "react-youtube";
import movieTrailer from "movie-trailer";

export default function RowList({ title, fetchURL, rowId }) {
  const [movies, setMovie] = useState([]);
  const [like, setLike] = useState();
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    fetch(fetchURL)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.results);
      });
  }, [fetchURL]);

  //   console.log(movies)

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft - 1000;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft + 1000;
  };

  //  ----------------------------------------------

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (item) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(item?.name || item?.title || item.original_title)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider" + rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, i) => (
            <div
              key={i}
              className="w-[160px] sm:w-[200px] md:w-[200px] lg:w-[280px] inline-block relative p-2 cursor-pointer"
            >
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                alt={item?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p
                  onClick={() => handleClick(item)}
                  className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center"
                >
                  {item?.title}
                </p>
                <p>
                  {like ? (
                    <FaHeart className="absolute top-4 left-4 text-gray-300" />
                  ) : (
                    <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
      <div>
        {trailerUrl && <ReactYoutube videoId={trailerUrl} opts={opts} />}
      </div>
    </>
  );
}
