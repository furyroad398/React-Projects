import React from "react";
import '../css/Home.css'
import Navbar from "./Navbar";
import Products from "./Product";

function Home() {
    return(
        <div className="wrapper ">
            <Navbar/>
            <Products/>
        </div>
    )
}

export default Home;