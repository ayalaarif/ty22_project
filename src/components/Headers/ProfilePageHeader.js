
import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
import axios from "axios";

// core components

function ProfilePageHeader({ user }) {
 let pageHeader = React.createRef();
 const [favorisCount, setFavorisCount] = useState(0);
 const navigate = useNavigate();

React.useEffect(() => {
  
  if (window.innerWidth > 991) {
    const updateScroll = () => {
      if (pageHeader.current) {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      }
    };

    window.addEventListener("scroll", updateScroll);
    if (user._id) {
    axios.get(`http://localhost:3001/api/favoris/count/${user._id}`)
      .then((res) => {
        setFavorisCount(res.data.count);
        console.log("data",res.data.count);
        
      })
      .catch((err) => console.error(err));
  }
    
    // Appelle aussi une fois pour positionner au chargement
    updateScroll();
    

    return function cleanup() {
      window.removeEventListener("scroll", updateScroll);
    };
  }
  
}, [user._id]);
console.log("count",favorisCount);
console.log("userID",user._id);


  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
        
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.png") + ")",
            
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img 
            style={{
    width: 160,
    height: 160,
    objectFit: "cover",
    objectPosition: "center",

  }} alt="..." src={`http://localhost:3001/${user.profil}`}></img>
          </div>
          <h3 className="title" style={{ fontSize: "1.9em" }}>{user.prenom} {user.nom}</h3>
          {/* <p className="category">{user.description}</p> */}
          <div className="content">
            <div className="social-description">
              <h2>26</h2>
              <p>Avis</p>
            </div>
            <div className="social-description" style={{ cursor: user.role === "client" ? "pointer" : "default" }}
     onClick={() => {
       if (user.role === "client") {
         navigate(`/mes-favoris`);
       }}}>
              <h2>{favorisCount}</h2>
              <p>favoris</p>
            </div>
            <div className="social-description">
              <h2>48</h2>
              <p>vus</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;
