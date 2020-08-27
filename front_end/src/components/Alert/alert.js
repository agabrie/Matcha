import React from "react";
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

function AlertMessage (props) {
     
    if (props.show){
        return (
            <Alert variant="success">
            <p>{props.message}</p>
            <div className="d-flex justify-content-end">
                
          <Button onClick={() => props.toggleShow()} variant="outline-success">
            OK
          </Button>
          </div>
            </Alert>
        )
    }
    return null
  }

  export default AlertMessage