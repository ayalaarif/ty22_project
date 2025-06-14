
import React,{ useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
   NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
   UncontrolledTooltip,
   Modal, ModalBody
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
// import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

function LandingPage() {
  const { id } = useParams();
  const [prestataire, setPrestataire] = useState(null);
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
 const [pills, setPills] = React.useState("1");
 const [userId, setUserId] = useState(() => localStorage.getItem("userId"));
 const [role, setRole] = useState(() => localStorage.getItem("role"));
const navigate = useNavigate();
const [isFavoris, setIsFavoris] = useState(false);
// const [tooltipText, setTooltipText] = useState("Ajouter ce professionnel aux favoris");
const [modalFavoris, setModalFavoris] = useState(false);
const [favorisMessage, setFavorisMessage] = useState("");

  
  React.useEffect(() => {
     document.body.classList.add("profile-page");
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
   
    // Récupération des données du prestataire
    fetch(`http://localhost:3001/api/profilPrestataire/${id}`)
      .then((res) => res.json())
      .then((data) => {
      setPrestataire(data);
      if ((data.posts || []).length > 0) {
        setPills("1"); // active automatiquement la première pill
      }
    })
      .catch((err) => console.error("Erreur de chargement du profil :", err));


      if (userId && id) {
    axios.get(`http://localhost:3001/api/favoris1/${userId}`)
      .then(res => {
        setIsFavoris(res.data.includes(id));
      })
      .catch(err => console.error("Erreur favoris:", err));
  }

  //     const fetchFavoris = async () => {
  //   if (userId && id) {
  //     try {
  //       const res = await axios.get(`http://localhost:3001/api/favoris/${userId}`);
  //       const favorisList = res.data.favoris || [];
  //       const found = favorisList.includes(id);
  //       setIsFavoris(found);
  //       setTooltipText(
  //         found ? "Ce professionnel est déjà dans vos favoris" : "Ajouter ce professionnel aux favoris"
  //       );
  //     } catch (err) {
  //       console.error("Erreur en récupérant les favoris", err);
  //     }
  //   }
  // };

  // fetchFavoris();



    return function cleanup() {
       document.body.classList.remove("profile-page");
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
     
  }, [userId,id]);


  const handleLogout = () => {
    setUserId(null);
    setRole(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("token"); 
  };

//   const handleAddFavoris = async () => {
//   if (!userId) {
//     navigate("/login");
//     return;
//   }

//   try {
//     await axios.post(`http://localhost:3001/api/favoris/${userId}/${id}`);
//      setFavorisMessage("Professionnel ajouté aux favoris avec succès !");
//     setModalFavoris(true);
//     setIsFavoris(true);
//     setTooltipText("Ce professionnel est déjà dans vos favoris");
//   } catch (error) {
//     console.error("Erreur lors de l'ajout aux favoris", error);
//     setFavorisMessage("Une erreur est survenue. Veuillez réessayer.");
//     setModalFavoris(true);
//   }
// };

const handleToggleFavoris = async () => {
  if (!userId) {
    navigate("/login");
    return;
  }

  try {
    if (isFavoris) {
      // 🔴 Supprimer des favoris
      await axios.delete(`http://localhost:3001/api/favoris/${userId}/${id}`);
      setFavorisMessage("Professionnel retiré des favoris.");
    } else {
      // 🟢 Ajouter aux favoris
      await axios.post(`http://localhost:3001/api/favoris/${userId}/${id}`);
      setFavorisMessage("Professionnel ajouté aux favoris.");
    }

    setIsFavoris(!isFavoris);
    setModalFavoris(true);
  } catch (error) {
    console.error("Erreur:", error);
    setFavorisMessage("Une erreur est survenue.");
    setModalFavoris(true);
  }
};


   if (!prestataire) {
    return <div style={{ textAlign: "center", marginTop: "100px" }}>Chargement...</div>;
  }
  
  
  
  
  return (
    <>
      <ExamplesNavbar userId={userId} role={role} onLogout={handleLogout} />
      <div className="wrapper">
        <LandingPageHeader
        prestataire={prestataire} 
         />
        <div className="section section-about-us">
          <Container>
            <div className="button-container">
                                  <Button className="btn-round" color="info" size="lg"  style={{ fontSize: "1rem", padding: "14px 28px" }}>
                                    Donner un avis 
                                  </Button>
                                  {/* <Button
  className="btn-round btn-icon"
  
  id="tooltip515203352"
  size="lg"
  onClick={handleAddFavoris}
>
  <i className="now-ui-icons ui-2_favourite-28" style={{ color: isFavoris ? "white" : "#6c757d" }}></i>
</Button>
<UncontrolledTooltip delay={0} target="tooltip515203352">
  {tooltipText}
</UncontrolledTooltip> */}
{/* <Button
style={{ color: isFavoris ? "white" : "#6c757d" }}
color="danger"
  className="btn-round btn-icon"
  size="lg"
  onClick={handleToggleFavoris}
  id="btn-favoris"
>
  <i className="now-ui-icons ui-2_favourite-28" style={{ color: isFavoris ? "#6c757d" : "white" }}></i>
</Button>
<UncontrolledTooltip delay={0} target="btn-favoris">
  {isFavoris ? "Retirer ce professionnel des favoris" : "Ajouter ce professionnel aux favoris"}
</UncontrolledTooltip> */}

{role !== "professionnel" && (
    <>
<Button
  className="btn-round btn-icon"
  size="lg"
  onClick={handleToggleFavoris}
  id="btn-favoris"
  style={{
    backgroundColor: isFavoris ? "white" : "#6c757d",
     border: "1px solid",
    borderColor:  "#6c757d" ,
  }}
>
  <i
    className="now-ui-icons ui-2_favourite-28"
    style={{
      color: isFavoris ? "#6c757d" : "white",
     
    }}
  ></i>
</Button>
<UncontrolledTooltip delay={0} target="btn-favoris">
  {isFavoris ? "Retirer ce professionnel des favoris" : "Ajouter ce professionnel aux favoris"}
</UncontrolledTooltip>
</>
)}
                                  
                      </div>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">Qui suis-je?</h2>
                <h5 className="description">
                 {prestataire.description2}
                </h5>
              </Col>
            </Row>
            <div className="separator separator-primary"></div>
            <div className="section-story-overview">
              <Row>
                <Col md="6">
                  <div
                    className="image-container image-left"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/img/login.png") + ")"
                    }}
                  >
                    <p className="blockquote blockquote-info">
                       Spécialité : {prestataire.specialite} <br />
                      Ville : {prestataire.ville}
                    </p>
                  </div>
                 {prestataire.posts.length > 0 && (
  <div 
  className="image-container"
  style={{
    backgroundImage: `url(${
      prestataire.posts && prestataire.posts[0]?.image
        ? `http://localhost:3001/${prestataire.posts[0].image}`
        : "/Profils/default.jpg"
    })`
  }}
></div>

)}

                </Col>
                <Col md="5">
               <div
  className="image-container image-right"
  style={{
    backgroundImage: `url(${
      prestataire.profil
        ? `http://localhost:3001/${prestataire.profil}`
        : "/Profils/default.jpg"
    })`
  }}
></div>
                  <h3>
                   À propos
                  </h3>
                  <p>
                    {prestataire.description}
                  </p>
                  <p>
                   <strong>Adresse :</strong> {prestataire.adresse}
                  </p>
                  <p>
                    <strong>Code postal :</strong> {prestataire.codePostal}
                  </p>
                  <p><strong>Pays :</strong> {prestataire.pays}</p>
                  <p><strong>Tarif horaire :</strong> {prestataire.tarifHoraire} €</p>
                  <p><strong>Site web :</strong> <a href={prestataire.siteWeb} target="_blank" rel="noopener noreferrer">{prestataire.siteWeb}</a></p>
                  <br></br>
                  <br></br>
                  <br></br>
                  {prestataire.posts.length > 0 && (
  <p>{prestataire.posts[0].description}</p>
)}
                </Col>
              </Row>
            </div>
           {prestataire.posts && prestataire.posts.length > 0 && (
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">Mon Portfolio</h4>
                <div className="nav-align-center">
                  <Nav className="nav-pills-info nav-pills-just-icons" pills role="tablist">
                    {prestataire.posts.length> 0 && (
                      <NavItem>
                        <NavLink
                          className={pills === "1" ? "active" : ""}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPills("1");
                          }}
                        >
                          <i className="now-ui-icons design_image"></i>
                        </NavLink>
                      </NavItem>
                    )}
                    {prestataire.posts.length> 4 && (
                      <NavItem>
                        <NavLink
                          className={pills === "2" ? "active" : ""}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPills("2");
                          }}
                        >
                          <i className="now-ui-icons design_image"></i>
                        </NavLink>
                      </NavItem>
                    )}
                    {prestataire.posts.length> 8 && (
                      <NavItem>
                        <NavLink
                          className={pills === "3" ? "active" : ""}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPills("3");
                          }}
                        >
                          <i className="now-ui-icons design_image"></i>
                        </NavLink>
                      </NavItem>
                    )}
                  </Nav>
                </div>
            
                <TabContent className="gallery" activeTab={`pills${pills}`}>
                  <TabPane tabId="pills1">
              <Row className="collections">
                {
                 prestataire.posts.slice(0, 4).map((post, idx) => (
                    <Col md="6" key={idx}>
                      <img
                        alt="..."
                        className="img-raised"
                        src={`http://localhost:3001/${post.image}` || "/Profils/default.jpg"}
                      />
                      <p className="text-center">{post.description}</p>
                    </Col>
                  ))
                
                }
              </Row>
            </TabPane>
            
            
                  {prestataire.posts.length > 4 && (
                    <TabPane tabId="pills2">
                      <Row className="collections">
                        {prestataire.posts.slice(4, 8).map((post, idx) => (
                          <Col md="6" key={idx}>
                            <img
                              alt="..."
                              className="img-raised"
                              src={`http://localhost:3001/${post.image}` || "/Profils/default.jpg"}
                            />
                            <p className="text-center">{post.description}</p>
                          </Col>
                        ))}
                      </Row>
                    </TabPane>
                  )}
            
                  {prestataire.posts.length > 8 && (
                    <TabPane tabId="pills3">
                      <Row className="collections">
                        {prestataire.posts.slice(8, 12).map((post, idx) => (
                          <Col md="6" key={idx}>
                            <img
                              alt="..."
                              className="img-raised"
                              src={`http://localhost:3001/${post.image}` || "/Profils/default.jpg"}
                            />
                            <p className="text-center">{post.description}</p>
                          </Col>
                        ))}
                      </Row>
                    </TabPane>
                  )}
                </TabContent>
              </Col>
            </Row>
            
            
            

            
  // <Row>
  //   <Col className="ml-auto mr-auto" md="6">
  //     <h4 className="title text-center">Mon portfolio</h4>

  //     <div className="nav-align-center">
  //       <Nav className="nav-pills-info nav-pills-just-icons" pills role="tablist">
  //         {prestataire.posts.length > 0 && (
  //           <NavItem>
  //             <NavLink
  //               className={pills === "1" ? "active" : ""}
  //               href="#"
  //               onClick={(e) => {
  //                 e.preventDefault();
  //                 setPills("1");
  //               }}
  //             >
  //               <i className="now-ui-icons design_image"></i>
  //             </NavLink>
  //           </NavItem>
  //         )}

  //         {prestataire.posts.length > 4 && (
  //           <NavItem>
  //             <NavLink
  //               className={pills === "2" ? "active" : ""}
  //               href="#"
  //               onClick={(e) => {
  //                 e.preventDefault();
  //                 setPills("2");
  //               }}
  //             >
  //               <i className="now-ui-icons location_world"></i>
  //             </NavLink>
  //           </NavItem>
  //         )}

  //         {prestataire.posts.length > 8 && (
  //           <NavItem>
  //             <NavLink
  //               className={pills === "3" ? "active" : ""}
  //               href="#"
  //               onClick={(e) => {
  //                 e.preventDefault();
  //                 setPills("3");
  //               }}
  //             >
  //               <i className="now-ui-icons sport_user-run"></i>
  //             </NavLink>
  //           </NavItem>
  //         )}
  //       </Nav>
  //     </div>
  //   </Col>

  //   <TabContent className="gallery" activeTab={`pills${pills}`}>
  //     {prestataire.posts.length > 0 && (
  //       <TabPane tabId="pills1">
  //         <Col className="ml-auto mr-auto" md="10">
  //           <Row className="collections">
  //             {prestataire.posts.slice(0, 4).map((post, index) => (
  //               <Col md="6" key={index} style={{ marginBottom: "1rem" }}>
  //                 <img
  //                   alt={post.description}
  //                   className="img-raised"
  //                   src={
  //                     post.image
  //                       ? `http://localhost:3001/${post.image}`
  //                       : "/Profils/default.jpg"
  //                   }
  //                   style={{ width: "100%", height: "auto" }}
  //                 />
  //                 <p className="text-center mt-2">{post.description}</p>
  //               </Col>
  //             ))}
  //           </Row>
  //         </Col>
  //       </TabPane>
  //     )}

  //     {prestataire.posts.length > 4 && (
  //       <TabPane tabId="pills2">
  //         <Col className="ml-auto mr-auto" md="10">
  //           <Row className="collections">
  //             {prestataire.posts.slice(4, 8).map((post, index) => (
  //               <Col md="6" key={index} style={{ marginBottom: "1rem" }}>
  //                 <img
  //                   alt={post.description}
  //                   className="img-raised"
  //                   src={
  //                     post.image
  //                       ? `http://localhost:3001/${post.image}`
  //                       : "/Profils/default.jpg"
  //                   }
  //                   style={{ width: "100%", height: "auto" }}
  //                 />
  //                 <p className="text-center mt-2">{post.description}</p>
  //               </Col>
  //             ))}
  //           </Row>
  //         </Col>
  //       </TabPane>
  //     )}

  //     {prestataire.posts.length > 8 && (
  //       <TabPane tabId="pills3">
  //         <Col className="ml-auto mr-auto" md="10">
  //           <Row className="collections">
  //             {prestataire.posts.slice(8).map((post, index) => (
  //               <Col md="6" key={index} style={{ marginBottom: "1rem" }}>
  //                 <img
  //                   alt={post.description}
  //                   className="img-raised"
  //                   src={
  //                     post.image
  //                       ? `http://localhost:3001/${post.image}`
  //                       : "/Profils/default.jpg"
  //                   }
  //                   style={{ width: "100%", height: "auto" }}
  //                 />
  //                 <p className="text-center mt-2">{post.description}</p>
  //               </Col>
  //             ))}
  //           </Row>
  //         </Col>
  //       </TabPane>
  //     )}
  //   </TabContent>
  // </Row>
)}


          </Container>
        </div>
        {/* <div className="section section-team text-center">
          <Container>
            <h2 className="title">Here is our team</h2>
            <div className="team">
              <Row>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/avatar.jpg")}
                    ></img>
                    <h4 className="title">Romina Hadid</h4>
                    <p className="category text-info">Model</p>
                    <p className="description">
                      You can write here details about one of your team members.
                      You can give more details about what they do. Feel free to
                      add some{" "}
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        links
                      </a>{" "}
                      for people to be able to follow them outside the site.
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-instagram"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/ryan.jpg")}
                    ></img>
                    <h4 className="title">Ryan Tompson</h4>
                    <p className="category text-info">Designer</p>
                    <p className="description">
                      You can write here details about one of your team members.
                      You can give more details about what they do. Feel free to
                      add some{" "}
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        links
                      </a>{" "}
                      for people to be able to follow them outside the site.
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-linkedin"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/eva.jpg")}
                    ></img>
                    <h4 className="title">Eva Jenner</h4>
                    <p className="category text-info">Fashion</p>
                    <p className="description">
                      You can write here details about one of your team members.
                      You can give more details about what they do. Feel free to
                      add some{" "}
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        links
                      </a>{" "}
                      for people to be able to follow them outside the site.
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-youtube"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div> */}
        
        <div className="section section-contact-us text-center">
          <Container>
            <h2 className="title">Contacter {prestataire.prenom}</h2>
            <p className="description">Votre projet est important pour nous.</p>
            <Row>
              <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                <InputGroup
                  className={
                    "input-lg" + (firstFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Nom..."
                    type="text"
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                  ></Input>
                </InputGroup>
                <InputGroup
                  className={
                    "input-lg" + (lastFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons ui-1_email-85"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email..."
                    type="text"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                  ></Input>
                </InputGroup>
                <div className="textarea-container">
                  <Input
                    cols="80"
                    name="name"
                    placeholder="Message...."
                    rows="4"
                    type="textarea"
                  ></Input>
                </div>
                <div className="send-button">
                  <Button
                    block
                    className="btn-round"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                    style={{ fontSize: "1rem", padding: "14px 28px" }}
                  >
                     Envoyer le message
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <DefaultFooter />
      </div>
      <Modal isOpen={modalFavoris} toggle={() => setModalFavoris(false)}>
  <div className="modal-header justify-content-center">
    <button
      className="close"
      type="button"
      onClick={() => setModalFavoris(false)}
    >
      <i className="now-ui-icons ui-1_simple-remove"></i>
    </button>
    <h4 className="title title-up">Favoris</h4>
  </div>
  <ModalBody>
    <p className="text-center">{favorisMessage}</p>
  </ModalBody>
  <div className="modal-footer">
    <Button color="primary" onClick={() => setModalFavoris(false)}>
      OK
    </Button>
  </div>
</Modal>

    </>
  );
}

export default LandingPage;
