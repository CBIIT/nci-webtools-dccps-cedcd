import React from 'react';
import { Modal } from 'react-bootstrap';
const CenterModal = (props) => {
  return (
    <Modal show={props.show} backdrop="static">
      <Modal.Header>
        <Modal.Title>
          { props.title || 
            <span>Confirmation Required</span>
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-5">
        { props.body || 
          <span>There were validation errors. Do you still wish to save your current progress?</span>
        }
      </Modal.Body>
      <Modal.Footer>
        { props.footer || 
            <div>
              <button 
                className='btn btn-primary mr-1' 
                onClick={props.handleClose}>
                  Close
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

export default CenterModal