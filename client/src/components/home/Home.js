import React from "react";
import Carousel from "./Carousel"


function Home() {
    return (
        <div>
            <div className="py-5">
                <h1 className="text-4xl text-left md:text-center">Home</h1>
            </div>
            <div className="container mx-auto p-7 ">
                <Carousel  />
            </div>
        </div>
    );
}

export default Home;
