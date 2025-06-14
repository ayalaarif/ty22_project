import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function ProfilePageHeader({ user }) {
 let pageHeader = React.createRef();

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

    // Appelle aussi une fois pour positionner au chargement
    updateScroll();

    return function cleanup() {
      window.removeEventListener("scroll", updateScroll);
    };
  }
}, []);

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
            <div className="social-description">
              <h2>26</h2>
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
