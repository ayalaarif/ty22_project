import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";



// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Alert
} from "reactstrap";


function LoginPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

const [email, setEmail] = React.useState("");
const [password, setPassword] = React.useState("");
const [alertSuccess, setAlertSuccess] = React.useState(false);
const [alertError, setAlertError] = React.useState(false);
const [errorMessage, setErrorMessage] = React.useState("");

const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3001/api/login", {
      email,
      password
    });
   
    localStorage.setItem("token", res.data.token); // facultatif
    setAlertSuccess(true);
     setTimeout(() => {
      navigate("/index");
     }, 1500);
  } catch (err) {
    setErrorMessage(err.response?.data?.message || "Erreur de connexion");
    setAlertError(true);

  }
};


  return (
    <>
      {/* <ExamplesNavbar /> */}
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    {/* <div className="logo-container"> */}
                      {/* <img
                        alt="..."
                        src={require("assets/img/now-logo.png")}
                      ></img> */}
                      <div class="text-center card-header">
                        <h3 class="title-up card-title">Connexion</h3>
                      </div>
                    {/* </div> */}
                  </CardHeader>
                  <div className="section section-notifications">
                  {/* ✅ Notification succès */}
<Alert color="success" isOpen={alertSuccess}>
  <Container>
    <div className="alert-icon">
      <i className="now-ui-icons ui-2_like"></i>
    </div>
    <strong>Succès !</strong> Opération réussie.
    <button type="button" className="close" onClick={() => setAlertSuccess(false)}>
      <span aria-hidden="true">
        <i className="now-ui-icons ui-1_simple-remove"></i>
      </span>
    </button>
  </Container>
</Alert>

{/* ❌ Notification erreur */}
<Alert color="danger" isOpen={alertError}>
  <Container>
    <div className="alert-icon">
      <i className="now-ui-icons objects_support-17"></i>
    </div>
    <strong>Erreur !</strong> {errorMessage}
    <button type="button" className="close" onClick={() => setAlertError(false)}>
      <span aria-hidden="true">
        <i className="now-ui-icons ui-1_simple-remove"></i>
      </span>
    </button>
  </Container>
</Alert>
</div>

                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email..."
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Mot de passe...."
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      href="#pablo"
                      onClick={handleLogin}
                      size="lg"
                    >
                      Se connecter
                    </Button>
                    <div className="pull-left">
                      <h6>
                      
                          <Link className="link" to="/signup"> Créer un compte </Link>
                         
                     
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Mot de passe oublié?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        {/* <TransparentFooter /> */}
      </div>
    </>
  );
}

export default LoginPage;
