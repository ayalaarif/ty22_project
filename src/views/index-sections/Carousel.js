import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators,
} from "reactstrap";
import axios from "axios";

function CarouselSection() {
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/AllPosts")  
      .then(res => {
        setItems(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const onExiting = () => setAnimating(true);
  const onExited = () => setAnimating(false);
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <div className="section" id="carousel">
      <Container>
        <div className="title">
          <h4>Ce que propose nos professionnels et artisans</h4>
        </div>
        <Row className="justify-content-center">
          <Col lg="8" md="12">
            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
              <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
              />
              {items.map((item, index) => (
                 <CarouselItem
    onExiting={onExiting}
    onExited={onExited}
    key={item._id}
   
    style={{ cursor: "pointer" }}
  >
    
      <img
  src={item.image}
  alt={item.description}
  style={{ width: "100%", height: "500px", objectFit: "cover", cursor: "pointer" }}
  onClick={() => navigate(`/profilPrestataire/${item.user._id}`)}
/>
    
    <div className="carousel-caption d-none d-md-block">
      <h5>{item.description}</h5>
      <p>{item.user.prenom} {item.user.nom}</p>
    </div>
  </CarouselItem>
              ))}
              <a
                className="carousel-control-prev"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  previous();
                }}
                role="button"
              >
                <i className="now-ui-icons arrows-1_minimal-left"></i>
              </a>
              <a
                className="carousel-control-next"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  next();
                }}
                role="button"
              >
                <i className="now-ui-icons arrows-1_minimal-right"></i>
              </a>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CarouselSection;
