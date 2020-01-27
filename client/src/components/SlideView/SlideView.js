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
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/3/38/Sib_Tiger.jpg"/>
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/0/06/Makari_the_Tiger.jpg"/>
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/3/38/Sib_Tiger.jpg"/>
                </Slider>
            </Wrapper>
        )
    }
}