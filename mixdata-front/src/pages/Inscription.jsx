import axios from 'axios';
import { useState } from 'react';
import * as React from 'react';
import { Fragment } from "react";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Message from '../component/Message';
import { Col, Container, Row, } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CToast, CToaster, CToastBody } from '@coreui/react';
import { useRef } from 'react';
import { API_URL } from '@utils/constants';
import { CircularProgress } from "@mui/material";

export const Inscription = () => {


  const INITIAL_STATE = {
    username: "",
    firstname: "",
    email: "",
    password: ""
  }

  const [modal, setModal] = useState({
    show: false,
    title: "",
    content: [""],
    error: false
  });

  const showMessage = (arg) => {


    setModal(arg);
    if (!arg.error) {
      // navigate("/");
    }
  }

  const onHide = () => {
    // Mettez à jour l'état du modal pour le masquer ou réinitialisez les données
    setModal({ show: false, content: [] });
  };

  const navigate = useNavigate();

  // States for registration
  const [form, setForm] = React.useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    let val = (event.target.type === "checkbox") ? event.target.checked : event.target.value;
    handleFieldChange(event.target.name, val === "" ? INITIAL_STATE[event.target.name] : val);
  };
  

  const handleFieldChange = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  }

  // States for checking the errors
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [toast, addToast] = useState(0)

  const toaster = useRef()

  // Handling the form submission
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();  
    if (form.username === '' || form.email === '' || form.password === '' || form.firstname === '') {
      setError(true);
      setSubmitted(false);
      setLoading(false); // Arrêter le chargement ici
    } else {
      setLoading(true); // Commencer le chargement si le formulaire est valide
      save({
        ...form,
        username: `${form.username}`.toLowerCase(),
      });
    }
  };

  const [hasError, setHasError] = useState(false);
  const [erreur, setErreur] = useState('');

  const save = (payload) => {
    axios
      .post(`${API_URL}/register`, payload)
      .then((res) => {
        setLoading(false);
        if (!res.data.error) {
          addToast(SuccesToast);
          setTimeout(() => {
            setSubmitted(true);
            setError(false);
            navigate("/");
          }, 1000);
        } else {
          console.log("res.data.details", res.data.details);
          showMessage({
            show: true,
            title: "Error",
            content: res.data.details,
            error: true,
          });
        }
      })
      .catch((err) => {
        setHasError(true); // Mise à jour de l'état hasError à true
        setErreur(err); 
        setLoading(false);
      });
  };

  const emailMessage = () => {
    if (!hasError) {
      return (
        <div className="error" style={{ display: error ? "" : "none" }}>
          {form.email === "" && (
            <span style={{ color: "red" }}>
              Veuillez entrer votre adresse e-mail.
            </span>
          )}
          {!isEmailValid && form.email !== "" && (
            <span style={{ color: "red" }}>
              Veuillez entrer une adresse e-mail valide.
            </span>
          )}
        </div>
      );
    } else {
      // Vérifier si erreur et erreur.response sont définis avant d'accéder à leurs propriétés
      if (
        erreur &&
        erreur.response &&
        erreur.response.data &&
        erreur.response.data.data &&
        erreur.response.data.data.details
      ) {
        const isEmailError = erreur.response.data.data.details.some(
          (detail) => {
            if (typeof detail === "string") {
              return detail.includes("email");
            } else if (typeof detail === "object" && detail !== null) {
              // Gérer le cas où detail est un objet
              // Par exemple, vérifier une propriété spécifique dans l'objet
              // ou appliquer une logique appropriée selon vos besoins
              // Ici, vous pouvez retourner false ou true selon votre logique
              return false; // Par exemple, retourne false si l'objet ne contient pas d'erreur email
            } else {
              // Gérer les autres cas si nécessaire
              return false; // Par exemple, retourne false pour tout autre type de détail
            }
          }
        );

        return (
          isEmailError && (
            <div className="error">
              <span style={{ color: "red" }}>
                {erreur.response.data.data.details.map((detail, index) => (
                  <span key={index}>{detail.message ?? detail}</span>
                ))}
              </span>
            </div>
          )
        );

      }
    }
  };

  const usernameMessage = () => {
    if (!hasError) {
      return (
        <div className="error" style={{ display: error ? "" : "none" }}>
          {form.username === "" && (
            <span style={{ color: "red" }}>Veuillez entrer votre pseudo.</span>
          )}
        </div>
      );
    } else {
      // Vérifier si erreur et erreur.response sont définis avant d'accéder à leurs propriétés
      if (
        erreur &&
        erreur.response &&
        erreur.response.data &&
        erreur.response.data.data &&
        erreur.response.data.data.details
      ) {
        const isPseudoError = erreur.response.data.data.details.some(
          (detail) => {
            if (typeof detail === "string") {
              return detail.includes("pseudo");
            } else if (typeof detail === "object" && detail !== null) {
              // Gérer le cas où detail est un objet
              // Par exemple, vérifier une propriété spécifique dans l'objet
              // ou appliquer une logique appropriée selon vos besoins
              // Ici, vous pouvez retourner false ou true selon votre logique
              return false; // Par exemple, retourne false si l'objet ne contient pas d'erreur pseudo
            } else {
              // Gérer les autres cas si nécessaire
              return false; // Par exemple, retourne false pour tout autre type de détail
            }
          }
        );
        return (
          isPseudoError && (
            <div className="error">
              <span style={{ color: "red" }}>
                {erreur.response.data.data.details.map((detail, index) => (
                  <span key={index}>{detail.message ?? detail}</span>
                ))}
              </span>
            </div>
          )
        );
      }
    }
  };

  const SuccesToast = (
    <CToast title="Bootstrap React">
      <CToastBody>
        <p className='text-green'>
          Utilisateur {form.username} enregistré avec succès!!
        </p>
      </CToastBody>
    </CToast>
  )
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>Utilisateur {form.username} enregistré avec succès!!</h1>
      </div>
    );
  };
  
  // Showing error message if error is true
  const isEmailValid = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
    form.email
  );
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
      form.password
    );

  const passwordMessage = () => {
    console.log("error2", error);
    return (
      <Fragment>
        <div className="error" style={{ display: error ? "" : "none" }}>
          {form.password === "" && (
            <span style={{ color: "red" }}>
              Veuillez entrer votre mot de passe.
            </span>
          )}
        </div>
        <div className="error">
          {!isPasswordValid && form.password !== "" && (
            <span style={{ color: "red" }}>
              Le mot de passe doit comporter au moins 8 caractères : une
              minuscule, une majuscule, un chiffre et un caractère spécial.
            </span>
          )}
        </div>
      </Fragment>
    );
  };

  const firstnameMessage = () => {
    return (
      <div className="error" style={{ display: error ? "" : "none" }}>
        {form.firstname === "" && (
          <span style={{ color: "red" }}>Veuillez entrer votre prénom.</span>
        )}
      </div>
    );
  };

  /*** style variable ***/

  const InputedStyle = {
    height: "37px",
    backgroundColor: "#F3F7F9",
    border: "1px solid rgba(217, 217, 217, 0.35)",
    borderRadius: "5px",
  };
  const fontWeightTitle = {
    fontWeight: "600"
  };
  const connexionBtn = {
    height: "40px",
    background: "#299CDB",
    borderRadius: "8px",
    border: "none"
  }
  const leftSideImg = {
    height: "552px"
  }
  const MaxleftSideImg = {
    height: "602px"
  }
  const autoScreenheight = {
    height: "100vh"
  }
  const logocolor = {
    color: "#3F50B6"
  }

  /*** password toogle hide show */
  const [passwordType, setPasswordType] = useState("password");
  const [setPasswordInput] = useState("");
  // const handlePasswordChange = (evnt) => {
  //   setPasswordInput(evnt.target.value);
  // }
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  return (
    <div className="form pt-0 w-100">
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <Message show={modal?.show} onHide={onHide} data={modal} />

      <div
        className="d-flex align-items-center flex-wrap justify-content-center"
        style={autoScreenheight}
      >
        <div>
          <h2
            className="text-center fs-1 mb-5 mx-5"
            style={Object.assign(logocolor, fontWeightTitle)}
          >
            MIXDATA
          </h2>
          <Container className="container-fluid d-flex align-items-center wrap justify-content-center">
            <Row
              className="bg-white px-0"
              style={{
                width: "774px",
                borderRadius: "8px",
                boxShadow: "1px 1px 10px 1px rgba(0, 0, 0, 0.03)",
                height: "auto",
              }}
            >
              <Col
                className="bg-image-auth d-none-xs "
              >
              </Col>
              <Col className="pe-4 ps-4 py-4">
                <legend className="mb-3" style={fontWeightTitle}>
                  S'inscrire
                </legend>
                <Form>
                  <Form.Group className="mb-4" controlId="email">
                    <Form.Label
                      style={Object.assign(fontWeightTitle, {
                        display: "block",
                      })}
                    >
                      E-mail *
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      className="input"
                      type="text"
                      placeholder="e-mail"
                      name="email"
                      style={InputedStyle}
                    />
                    {emailMessage()}
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="username">
                    <Form.Label
                      style={Object.assign(fontWeightTitle, {
                        display: "block",
                      })}
                    >
                      Votre pseudo *
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      className="input"
                      type="text"
                      placeholder="pseudo"
                      name="username"
                      style={InputedStyle}
                    />
                    {usernameMessage()}
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label
                      style={Object.assign(fontWeightTitle, {
                        display: "block",
                      })}
                    >
                      Mot de passe *
                    </Form.Label>
                    <div
                      className="input d-flex align-items-center  ps-0"
                      style={InputedStyle}
                    >
                      <Form.Control
                        onChange={handleChange}
                        className="input border-0"
                        type={passwordType}
                        placeholder="mot de passe"
                        name="password"
                        style={InputedStyle}
                      />
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
                    {passwordMessage()}
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="firstname">
                    <Form.Label
                      style={Object.assign(fontWeightTitle, {
                        display: "block",
                      })}
                    >
                      Votre prénom *
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      className="input"
                      type="text"
                      placeholder="prénom"
                      name="firstname"
                      style={InputedStyle}
                    />
                    {firstnameMessage()}
                  </Form.Group>
                  <div className="messages fs-7 my-0 py-0">
                    {successMessage()}
                  </div>
                  <Form.Group className="mb-3">
                    <Button
                      onClick={handleSubmit}
                      className="w-100 mb-2"
                      style={Object.assign(connexionBtn, fontWeightTitle)}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress /> : "Enregistrer"}
                    </Button>
                  </Form.Group>
                </Form>
                <div className="d-flex w-100 justify-content-center">
                  <Link as={Link} to="/">
                    Se connecter ?
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}
