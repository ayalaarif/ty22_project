import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

function IndexNavbar({ userId, role, onLogout }) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return () => {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, []); // Ajoute un tableau de dépendances vide pour éviter le warning eslint

  return (
    <>
      {collapseOpen && (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      )}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              href="https://demos.creative-tim.com/now-ui-kit-react/#/index?ref=nukr-index-navbar"
              target="_blank"
              id="navbar-brand"
            >
              SiteWeb
            </NavbarBrand>
            <button
              className="navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse className="justify-content-end" isOpen={collapseOpen} navbar>
            <Nav navbar>
              {/* Liens d'ancrage avec icônes */}
              <NavItem>
                <NavLink href="#apropos">
                  <i className="now-ui-icons ui-2_chat-round"></i>
                  <p>À propos de nous</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#contact">
                  <i className="now-ui-icons ui-1_email-85"></i>
                  <p>Nous contacter</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#bests">
                  <i className="now-ui-icons ui-2_like"></i>
                  <p>Nos meilleurs prestataires</p>
                </NavLink>
              </NavItem>

              {/* Liens existants */}
              {userId ? (
                <NavItem>
                  <NavLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onLogout(); // Appelle la fonction de déconnexion
                    }}
                  >
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                    <p>Se déconnecter</p>
                  </NavLink>
                </NavItem>
              ) : (
                <>
                  <NavItem>
                    <NavLink tag={Link} to="/login">
                      <i className="now-ui-icons ui-1_lock-circle-open"></i>
                      <p>Se connecter</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/signup">
                      <i className="now-ui-icons ui-1_simple-add"></i>
                      <p>S'inscrire</p>
                    </NavLink>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
