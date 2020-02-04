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
    arrayBufferToBase64 = (buffer)=> {
        console.log(`buffer =>`,buffer); 
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        console.log(`bytes =>`,bytes); 

        bytes.forEach((b) => binary += String.fromCharCode(b));
        var data = window.btoa(binary);
        console.log(`data => ${data}`); 
        return window.btoa(binary);
    }
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
                return <Image key={this.arrayBufferToBase64(image.image.data)} src={`data:image/jpeg;base64,${this.arrayBufferToBase64(image.image.data)}`}/>
            })
        }
                </Slider>
            </Wrapper>
        )
    }
}