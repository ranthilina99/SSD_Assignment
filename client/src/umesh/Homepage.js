import React, {Component} from 'react';
import BackToTopButton from "./temp/BackToTopButton/BackToTopButton";
import Slideshow from "./temp/SlideShow/SlideShow";
import MenuCardBar from "./temp/MenuCard/MenuCardBar";
import ImageWithTextBar from "./temp/Containers/ImageWithTextBar";
import ParalaxContainer from "./temp/ParalaxContainer/ParalaxContainer";
import HeroSection from "./temp/HeroSection/HeroSection";
import './HomePage.css';
import Cards from "./temp/Card/Cards";
class Homepage extends Component {
    render() {
        return (
            <div>
                <BackToTopButton/>
                <HeroSection/>
                <br/><br/><br/>
                <MenuCardBar/>
                <Cards/>
                <Slideshow/>
                <ParalaxContainer/>
            </div>
        );
    }
}

export default Homepage;