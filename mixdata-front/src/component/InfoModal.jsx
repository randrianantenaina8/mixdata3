import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const InfoModal = (props) => {
  const { t } = useTranslation();

  const onHide = () => {
    if (props.onHide) {
      props.onHide();
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{props.data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={props.data.error ? { color: 'red' } : { color: 'black' }}>
          {t(props.data.content)}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onHide({ ...props.data, show: false })}>{t('Fermer')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;
