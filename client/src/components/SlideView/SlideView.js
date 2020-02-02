import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

const Wrapper = styled.div`
    width:100%;
`;

const Image = styled.img`
  width: 46%;
  float: left;
  margin-right: 10px;
`;

export default class SlideView extends React.Component{
    render(){
        return (
            <Wrapper>
                <Slider
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                infinite={true}
                dots={true}>
                     {
                this.props.images.map(image => {
                return <Image key={image} src={image}/>
            })
        }
                </Slider>
            </Wrapper>
        )
    }
}