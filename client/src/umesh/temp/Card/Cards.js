import React from 'react';
import './Cards.css';
import Image1 from '../SlideShow/image (10).png'
import Image2 from '../SlideShow/image (7).png'
import Image3 from '../SlideShow/image (9).png'
import Image4 from '../SlideShow/image (5).png'
import Image5 from '../SlideShow/image (6).png'
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={Image1}
              text='Gym && Fitness'
            />
            <CardItem
              src={Image2}
              text='Schedule'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={Image3}
              label="Our Service"
              text='Set Sail Our Service visiting Uncharted Visitors'
            />
            <CardItem
              src={Image4}
              label="Our Program"
              text='Experience Our Program on Top of the Himilayan Mountains'
            />
            <CardItem
              src={Image5}
              label="Our Class"
              text='Ride through the Our Class on a guided camel tour'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
