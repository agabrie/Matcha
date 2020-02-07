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
        var binary = '';
        var bytes = new Uint8Array(buffer);
        for(let i = 0; i < bytes.byteLength; i++){
            binary += String.fromCharCode(bytes[i]);
        }
        var data = window.btoa(binary);
        return data;
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
                        return <Image key={this.arrayBufferToBase64(image.image.data.data)} src={`data:image/jpeg;base64,${this.arrayBufferToBase64(image.image.data.data)}`}/>
                    })
                }
                </Slider>
            </Wrapper>
        )
    }
}