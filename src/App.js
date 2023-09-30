import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/pages/HomePage";



function App() {
  return (
    < >
     <Navbar/>
     <Routes>
        <Route path="/" element= {<Home/>} />
     </Routes>
    
    </>
  );
}

export default App;
