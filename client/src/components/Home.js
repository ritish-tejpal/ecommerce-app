import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { setToken } from "../store";

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


function Home(props) {
    const images = 
    [
        {
        "id": "0",
        "author": "Alejandro Escamilla",
        "width": 5000,
        "height": 3333,
        "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
        "download_url": "https://picsum.photos/id/0/5000/3333"
        },
        {
        "id": "1",
        "author": "Alejandro Escamilla",
        "width": 5000,
        "height": 3333,
        "url": "https://unsplash.com/photos/LNRyGwIJr5c",
        "download_url": "https://picsum.photos/id/1/5000/3333"
        },
        {
        "id": "2",
        "author": "Alejandro Escamilla",
        "width": 5000,
        "height": 3333,
        "url": "https://unsplash.com/photos/N7XodRrbzS0",
        "download_url": "https://picsum.photos/id/2/5000/3333"
        },
        {
        "id": "3",
        "author": "Alejandro Escamilla",
        "width": 5000,
        "height": 3333,
        "url": "https://unsplash.com/photos/Dl6jeyfihLk",
        "download_url": "https://picsum.photos/id/3/5000/3333"
        },
        {
        "id": "4",
        "author": "Alejandro Escamilla",
        "width": 5000,
        "height": 3333,
        "url": "https://unsplash.com/photos/y83Je1OC6Wc",
        "download_url": "https://picsum.photos/id/4/5000/3333"
        },
        {
        "id": "5",
        "author": "Alejandro Escamilla",
        "width": 5000,
        "height": 3334,
        "url": "https://unsplash.com/photos/LF8gK8-HGSg",
        "download_url": "https://picsum.photos/id/5/5000/3334"
        },
    ]

    const CarouselPage = () => {
        return(
            <Carousel
                showArrows={true}
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
            >
                {images.map((image) => {
                    return(
                        <div>
                            <img src={image.download_url} alt={image.author} />
                        </div>
                    )
                })}
            </Carousel>
        )
    }


    return (
        <div className="home" style={{width: "40%"}}>
            <CarouselPage  />
        </div>
    );
}

export default Home;
