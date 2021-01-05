import React from 'react';
import { Modal } from 'react-bootstrap';
import "./fileModal.css"
const FileModal = (props) => {
  return (
    <Modal id='fileModel' show={props.show} animation={false}>
      {/*<Modal.Header style={{backgroundColor: '#01857b'}}>
        <Modal.Title>
          { props.title  }
        </Modal.Title>
      </Modal.Header>*/}
      <Modal.Body>
        { props.body }
      </Modal.Body>
      <Modal.Footer>
        { props.footer}
      </Modal.Footer>
    </Modal>
  )
}

export default FileModal