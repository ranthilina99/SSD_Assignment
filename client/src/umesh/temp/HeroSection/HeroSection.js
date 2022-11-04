import React, {Component} from 'react';
import { Button } from './Button';
import './HeroSection.css';
import video from '../SlideShow/home_page.mp4'
import {Link} from "react-router-dom";


class HeroSection extends Component {
    constructor(props) {
        super(props);
        this.state={

        }

    }
    render() {
        return (
            <div className='hero-container'>
                <video src={video} autoPlay loop muted />
                <h4 className="hero_h1">STRONGER IN 30 MINUTES</h4>
                <div className='hero-btns'>
                    <Button
                        className='btns'
                        buttonStyle='btn--outline'
                        buttonSize='btn--large'
                    >GET MY WORKOUT
                    </Button>
                </div>
                <br/> <br/> <br/>
                <div className="social_home_button">
                    <Button
                        buttonStyle='btn--outline'
                        buttonSize='btn--large'
                    > <i className="fab fa-facebook"></i>
                    </Button>
                    &nbsp;
                    &nbsp;
                    <Button
                        buttonStyle='btn--outline'
                        buttonSize='btn--large'
                    > <i className="fab fa-twitter"></i>
                    </Button>
                    &nbsp;
                    &nbsp;
                    <Button
                        buttonStyle='btn--outline'
                        buttonSize='btn--large'
                    > <i className="fab fa-instagram"></i>
                    </Button>
                    &nbsp;
                    &nbsp;
                    <Button
                        buttonStyle='btn--outline'
                        buttonSize='btn--large'
                    > <i className="fab fa-google"></i>
                    </Button>
                </div>
            </div>
        );
    }
}

export default HeroSection;