import React from 'react';
import { Modal } from 'react-bootstrap';
const CenterModal = (props) => {
  return (
    <Modal show={props.show} >
      <Modal.Header>
        <Modal.Title>
          { props.title || 
            <span>Saving Confirmation</span>
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-5">
        { props.body || 
          <span>There are validation errors, are you sure to save?</span>
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