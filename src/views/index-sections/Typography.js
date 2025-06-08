import React from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Typography() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const profiles = [
    "julie.jpg",
    "julie.jpg",
    "julie.jpg",
    "julie.jpg",
    "julie.jpg",
    "julie.jpg",
    "julie.jpg",
  ];

  return (
    <div className="section">
      <Container>
        <div className="space-50"></div>
        <div id="images">
          <h4>Nos meilleurs prestataires</h4>
          <Slider {...settings}>
            {profiles.map((img, index) => (
              <div key={index} className="text-center px-2">
                <img
                  alt={`profil-${index}`}
                  className="rounded-circle img-raised"
                  src={require(`assets/img/${img}`)}
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <p className="category mt-2" style={{ marginLeft: "-7px", textAlign: "left" }}>
                  Prestataire {index + 1}
                </p>
              </div>
            ))}
          </Slider>

        </div>
      </Container>
    </div>
  );
}

export default Typography;
