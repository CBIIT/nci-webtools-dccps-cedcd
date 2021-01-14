import React from 'react';
import { Modal } from 'react-bootstrap';
const ValidationModal = (props) => {
  return (
    <Modal show={props.show} backdrop="static">
      <Modal.Header>
        <Modal.Title>
          { props.title || 
            <span>Validation Errors</span>
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center p-3">
        { props.body || 
          <span>There were validation errors. Do you still wish to save your current progress?</span>
        }
      </Modal.Body>
      <Modal.Footer>
        { props.footer || 
            <div>
              <button 
                className='btn btn-light mr-1' 
                onClick={props.handleClose}>
                  Cancel
              </button>
              <button 
                className='btn btn-primary'  
                onClick={props.handleContentSave}>
                  Save
              </button>
            </div>
        }
      </Modal.Footer>
    </Modal>
  )
}

export default ValidationModal