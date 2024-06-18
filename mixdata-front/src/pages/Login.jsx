import { useRef, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InfoModal from "../component/InfoModal";
import { useNavigate, Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import bgImage from "../assets/Images/auth/authbg.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useApplication } from "../hooks/UseApplication";
import { useToast } from "../Context/ToastContext";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const username = useRef("");
  const password = useRef("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useApplication();
  const toaster = useToast();

  const saveSession = (username, password) => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  };

  const clearSession = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
  };

  const handleRememberMeChange = () => {
    if (!rememberMe) {
      saveSession(usernameValue, passwordValue);
    } else {
      clearSession();
    }
  };

   const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const loginSubmit = async () => {
    setIsFormSubmitted(true);
    setLoading(true);
    await login({
      username: usernameValue,
      password: passwordValue,
    }).then((result) => {
    setLoading(false);
      if(!result.error){
        navigate("/land");
        window.location.reload();
      }else{
        console.log("toaster", toaster)
        if (isFormSubmitted) {
          toaster.notifyError("Veuillez vérifier vos identifiants");
        }
          
      }

    });
  };

  const [modal, setModal] = useState({
    show: false,
    title: "",
    content: "",
    error: false,
  });

  const navigate = useNavigate();

  const testCall = (arg) => {
    if (arg && arg.error) {
      setModal(arg);
      if (!arg.error) {
        navigate("/land");
      }
    } else {
      setModal({ show: false, content: "" });
    }
  };

  /*** style variable */

  const InputedStyle = {
    height: "37px",
    backgroundColor: "#F3F7F9",
    border: "1px solid rgba(217, 217, 217, 0.35)",
    borderRadius: "5px",
  };
  const fontWeightTitle = {
    fontWeight: "600",
  };
  const connexionBtn = {
    height: "40px",
    background: "#299CDB",
    borderRadius: "8px",
    border: "none",
  };
  const autoScreenheight = {
    height: "100vh",
  };
  const logocolor = {
    color: "#3F50B6",
  };
  const containerWd = {
    width: "774px",
  };

  /*** password toogle hide show */
  const [passwordType, setPasswordType] = useState("password");
  
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const validateForm = () => {
    if (!usernameValue || !passwordValue) {
      return false;
    }
    return true;
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      loginSubmit();
    }
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername && savedPassword) {
      setUsernameValue(savedUsername);
      setPasswordValue(savedPassword);
      setRememberMe(true);
    } else {
      setRememberMe(false);
    }
  }, []);

  

  return (
    <>
      <InfoModal show={modal?.show} onHide={testCall} data={modal} />
      <div
        className="d-flex align-items-center flex-wrap justify-content-center h-sm-auto w-100"
        style={autoScreenheight}
      >
        <div className=" my-lg-0 my-md-0 my-sm-5 my-5">
          <h2
            className="text-center fs-1 mb-5 mx-5"
            style={Object.assign(logocolor, fontWeightTitle)}
          >
            MIXDATA
          </h2>
          <Container
            className="container-fluid d-flex align-items-center flex-wrap justify-content-center w-xs-normal"
            style={containerWd}
          >
            <Row
              className="justify-content-center bg-white w-100 align-items-center px-0 flex-lg-nowrap flex-sm-wrap flex-wrap"
              style={{
                maxWidth: "774px",
                borderRadius: "8px",
                boxShadow: "1px 1px 10px 1px rgba(0, 0, 0, 0.03)",
                height: "auto",
              }}
            >
              <Col className="ps-0 pe-lg-2 pe-sm-0 pe-0 col-lg col-md col-sm-12 col-12 h-lg-100 h-sm-50 h-md-440">
                <Image
                  className="fluid w-100 h-100 fit-cover"
                  src={bgImage}
                ></Image>
              </Col>
              <Col className="col pe-4 py-lg-0 p-md-4 p-sm-5 p-4 my-3 mx-4 my-lg-0 my-sm-3 bg-white mx-lg-0 mx-sm-4 rounded">
                <legend className="mb-3" style={fontWeightTitle}>
                  Connexion
                </legend>
                <form >
                  <Form.Group className="mb-4" controlId="formUserName">
                    <Form.Label style={fontWeightTitle}>
                      Votre pseudo
                    </Form.Label>
                    <Form.Control
                      className="input"
                      type="text"
                      placeholder="pseudo"
                      ref={username}
                      required
                      value={usernameValue}
                      onChange={(e) => setUsernameValue(e.target.value)}
                      style={InputedStyle}
                    />
                    {isFormSubmitted && usernameValue === "" && (
                      <span style={{ color: "red" }}>
                        Le pseudo est obligatoire
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label style={fontWeightTitle}>
                      Mot de passe
                    </Form.Label>
                    <div
                      className="input d-flex align-items-center  ps-0"
                      style={InputedStyle}
                    >
                      <Form.Control
                        className="border-0 bg-transparent"
                        placeholder="*********"
                        ref={password}
                        required
                        type={passwordType}
                        value={passwordValue}
                        onKeyUp={handleKeyUp}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        style={InputedStyle}
                      />
                      <div className="h-fit ">
                        <p
                          className="btn border-0 outline-0 bg-transparent mb-0"
                          onClick={togglePassword}
                        >
                          {passwordType === "password" ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </p>
                      </div>
                    </div>
                    {isFormSubmitted && passwordValue === "" && (
                      <span style={{ color: "red" }}>
                        Le mot de passe est obligatoire
                      </span>
                    )}
                  </Form.Group>
                  <div className="input-group mb-4 align-items-center">
                    <input
                      className="form-check-input mt-0 me-2 rounded-1"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => {
                        setRememberMe(!rememberMe);
                        handleRememberMeChange();
                      }}
                    ></input>
                    <label className="fw-normal">Se souvenir</label>
                  </div>
                  <Button
                    variant="primary"
                    className="w-100 mb-3"
                    type="button"
                    style={{ ...connexionBtn, ...fontWeightTitle }}
                    onClick={loginSubmit}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress /> : "Se connecter"}
                  </Button>

                  <div className="d-flex w-100 justify-content-center flex-wrap">
                    <span>Pas encore de compte ?</span>
                    <Link className="text-center" as={Link} to="/inscription">
                      <span className="d-block ms-2">S'inscrire ici</span>
                    </Link>
                  </div>
                </form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};
export default Login;
