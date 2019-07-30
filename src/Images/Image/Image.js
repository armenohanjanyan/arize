import React from 'react';
import {
  Card,
  CardBody,
  CardFooter
} from 'reactstrap';


const image = (props) => {
  return (
    <div>
      <Card style={{
        margin: '10px',
        width: '300px',
        height: '200px',
      }}>
        <CardBody style={{
          backgroundImage: `url(${props.el[1].url})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
        </CardBody>
        <CardFooter style={{ fontSize: '8px', display: 'flex', justifyContent: 'space-between' }}>
          <i></i>
          <i onClick={() => props.deleteImage(props.el)} style={{ fontSize: '15px', cursor: 'pointer' }} className="far fa-trash-alt"></i>
        </CardFooter>
      </Card>
    </div>
  )
}

export default image