import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const ValidationModal = (props) => {
  return (
    <Modal show={props.show} backdrop="static">
      <Modal.Header className={props.headerClassName}>
        <Modal.Title className={props.titleClassName}>
          { props.title || 
            <span>Validation Errors</span>
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={props.bodyClassName || "text-center p-3"}>
        { props.body || 
          <span>There were validation errors. Do you still wish to save your current progress?</span>
        }
      </Modal.Body>
      <Modal.Footer className={props.footerClassName}>
        { props.footer || 
            <div className="w-100 text-sm-right text-center">
                <Button 
                  variant="secondary" 
                  onClick={props.handleClose}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={props.handleContentSave}>
                  Save
                </Button>
            </div>
        }
      </Modal.Footer>
    </Modal>
  )
}

export default ValidationModal