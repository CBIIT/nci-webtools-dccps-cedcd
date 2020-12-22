import React from 'react';
import { Modal } from 'react-bootstrap';
import "./modal.css"
const CenterModal = (props) => {
  return (
    <Modal show={props.show} animation={false}>
      <Modal.Header className="modalHeader">
        <Modal.Title>
          { props.title || 
            <h2>Saving Confirmation</h2>
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        { props.body || 
          <span>There are validation errors, are you sure to save?</span>
        }
      </Modal.Body>
      <Modal.Footer>
        { props.footer || 
            <div>
              <button className='btn btn-primary' 
                style={{
                  marginRight: '5px', 
                  // border: '1px solid #1c8282', 
                  // backgroundColor: 'white', 
                  // color: '#1c8282', 
                  // paddingTop: '5px'
                }} 
                onClick={props.handleClose}>
                  Close
              </button>
              <button className='btn btn-primary'  
                style={{
                  marginRight: '10px'
                }} 
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