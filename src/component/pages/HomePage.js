import React from "react";
// import Banner
import Main from "../MainBanner";
// import RowList
import RowList from "../RowList";
// import requests
import requests from "../Requests";

// create a function to display the home page
function Home() {
  return (
    <div>
      <Main />
      <RowList rowId= '1' title = 'Up Coming' fetchURL ={requests.popular}/>
      <RowList  rowId= '2' title = 'Popular' fetchURL ={requests.action}/>
      <RowList  rowId= '3' title = 'Kids & family' fetchURL ={requests.kidsFamily}/>
      <RowList  rowId= '4' title = 'Comedy' fetchURL ={requests.comedy}/>
      <RowList  rowId= '5' title = 'Documentaries' fetchURL ={requests.documentaries}/>
      {/* <RowList  rowId= '6' title = 'RetroTv' fetchURL ={requests.retroTv}/> */}
    </div>
  );
}
// export the function
export default Home;
