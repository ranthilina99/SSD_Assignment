import React from 'react';
import img1 from './image (1).png';
import img2 from './image (2).png';
import img3 from './image (3).png';
import img4 from './image (4).png';
import img5 from './image (5).png';
import img6 from './image (10).png';
import {Carousel} from "react-bootstrap";
import ReactPlayer from 'react-player'
import './slideStyles.css'

const images = [
    img1,
    img2,
    img3
];


const Slideshow = () => {
    return (
        <div className="slide-container-inner">
            <Carousel >
                <Carousel.Item interval={5000}>
                    <img
                        className="d-block w-100"
                        src={img1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src={img2}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={img3}
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={img4}
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={img5}
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={img6}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}


export default Slideshow;
