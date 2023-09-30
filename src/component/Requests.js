const api_key = "af349256790790763b8b4da6e95944db";

const requests = {
  action: `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2020-01-01&primary_release_date.lte=2020-01-31&with_genres=28`,
  kidsFamily: `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=10751`,
  retroTv: `https://api.themoviedb.org/3/discover/tv api_key=${api_key}&with_genres=10770`,
  popular: `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`,
  comedy: `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=35`,
  tvShows: `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}`,
  documentaries: `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=99`,
};

export default requests;
