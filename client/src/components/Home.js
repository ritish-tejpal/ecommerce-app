import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { setToken } from "../store";

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Header from "./Header";
import Navbar from "./navbar";
import Footer from "./Footer";


function Home(props) {
    // const token = useSelector((state) => state.user.token);
    // const dispatch = useDispatch();

    // window.addEventListener('load', () => {
    //     axios.post("http://127.0.0.1:8000/accounts/get-token/")
    //     .then(async (res) => {
    //       console.log(res.data);
    //     })
    //   })
    const CarouselPage = () => {
        return(
            <Carousel
                showArrows={true}
                autoPlay={true}
                infiniteLoop={true}
            >
                <div>
                    <img src="https://via.placeholder.com/640x360" alt="totk lol" />
                </div>
                <div>
                    <img src="https://via.placeholder.com/640x360" alt="" />
                </div>
            </Carousel>
        )
    }


    return (
        <div className="home">
            <Navbar />
            <Header />
            <CarouselPage />
            <Footer />
        </div>
    );
}

export default Home;
