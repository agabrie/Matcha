import React from 'react';
import Slider from 'react-slick';

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, borderRadius: "50%", background: "#b19cd9"}}
        onClick={onClick}
      />
    );
  }
  
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, borderRadius: "50%", background: "#b19cd9"}}
        onClick={onClick}
      />
    );
  }
  
  function SlideView(props) {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
      };
      return (
        <div>
          <Slider {...settings}>
          {
                props.images.map(image => {
                    return (
											<img
												key={image}
												src={`${image.type},${image.data}`}
												alt=""
											/>
										);
                })
        }
          </Slider>
        </div>
      );
  }

export default SlideView