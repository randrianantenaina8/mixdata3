import { useState } from 'react';
import * as React from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import InfoModal from './InfoModal';
 
export const LoginComponent = (props) => {

  const INITIAL_STATE = {
    email: "",
    password: ""
  }

  const navigate = useNavigate();
 
  const [form, setForm] = React.useState(INITIAL_STATE);

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

 
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username === '' || form.email === '' || form.password === '' || form.firstname === '') {
      setError(true);
      setSubmitted(false);
    } else {
      setSubmitted(true);
      setError(false);
      navigate("/");
      
    }
  };
 
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>utilisateur {form.username} autorisé avec succès!!</h1>
      </div>
    );
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <p>Veuillez completer tout les champs</p>
      </div>
    );
  };
  const [modalShow, setModalShow] = useState(false);
  return (
    <div  className="form"
    >
 
      {/* Calling to the methods */}
      <div className="messages">
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch modal with grid
      </Button>

      <InfoModal show={modalShow} onHide={() => setModalShow(false)} />
        {/* {errorMessage()}
        {successMessage()} */}
      </div>

      <div className="content">
      <Form>

                    
                    
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label style={{display: "block"}}>E-mail</Form.Label>
            <Form.Control
              onChange={handleChange}
              className="input"
              // style={{marginInline: "5px"}}
              type="text" placeholder="email" name="email"/>
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label style={{display: "block"}}>Mot de passe</Form.Label>
            <Form.Control
            onChange={handleChange}
            className="input"
            // style={{marginInline: "5px"}}
            type="text" placeholder="password" name="password"/>
        </Form.Group>


        <Form.Group className='mb-3'
          >
          <Button onClick={handleSubmit}>Se connecter</Button>
        </Form.Group>

        </Form>
      </div>

    </div>
  );
}
