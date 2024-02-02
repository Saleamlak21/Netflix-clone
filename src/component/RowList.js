import React, { useEffect, useState } from "react";  // react hooks
import { MdChevronLeft, MdChevronRight } from "react-icons/md"; //  icons from react-icons
import { FaHeart, FaRegHeart } from "react-icons/fa"; //  icons from react-icons
import ReactYoutube from "react-youtube"; //  react-youtube to play youtube video
import movieTrailer from "movie-trailer"; //  movie-trailer to get movie trailer
 
// create a function to display the list of movies
export default function RowList({ title, fetchURL, rowId }) {
  const [movies, setMovie] = useState([]); //  state to store the list of movies
  const [like, setLike] = useState(); //  state to store the like status
  const [trailerUrl, setTrailerUrl] = useState(""); //  state to store the trailer url

//   useEffect to fetch the list of movies from the api
  useEffect(() => {
    fetch(fetchURL)
      .then((res) => res.json())
      .then((data) => {
        //set the list of movies to the state
        setMovie(data.results);
      });
  }, [fetchURL]);

//   function to slide the list of movies
  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft - 1000;
  };

  //  function to slide the list of movies
  const slideRight = () => {
    var slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft + 1000;
  };

  //   options to play the youtube video
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
//function to handle the click event
  const handleClick = (item) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
        //   get the movie trailer url
      movieTrailer(item?.name || item?.title || item.original_title)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          //set the trailer url to the state
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
//   return the list of movies
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
