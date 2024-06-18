
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from 'react-i18next';

const Message = (props) => {
  const { t } = useTranslation();

    const onHide = props.onHide;

    console.log('props', props)
    return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Erreur
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

      {props.data.content.map((row, index) => (
                <p style={props.data.error ? {color: "red"} : {color: "black"}} key={index}>{t(row)}</p>
              ))}


        {/* <h4>Centered Modal</h4> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onHide({ ...props.data, show: false, })}>Fermer</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default Message;