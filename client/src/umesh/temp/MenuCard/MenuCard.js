import React, {Component} from 'react';
import './MenuCard.css'


class MenuCard extends Component {

    render() {

        const {width, image, text,title} = this.props.properties
        return (
                <div className="w3-card-4" style={{width: width}}>
                    <div className="card" style={{width: width}}>
                        <img className="card-img-top" src={image} alt="Card cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{text}</p>
                                <a href="/" className="btn btn-primary">Learn More</a>
                            </div>
                    </div>
                </div>
        )
    }
}


export default MenuCard;
