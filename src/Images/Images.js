import React, { Component } from 'react';
import firebase from 'firebase'
import { Button, 
  Modal, 
  ModalHeader,
  ModalBody,
  ModalFooter, 
  Input, 
  FormGroup } from 'reactstrap';

  import './Images.css'
  import Image from './Image/Image'



class Images extends Component {

  componentWillMount() {
    firebase.database().ref('/images').on('value', data => {
      this.setState({images: data.toJSON()})
    })
  }

  state = {
    image: '',
    images: null
  }

  toggle() {
      this.setState(prevState => ({
        modal: !prevState.modal,
      }));
  }

  toggleClose() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      image: ''
    }));
  }

  onFileChange = (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0]
      this.setState(() => ({ image }))
    }
  }
  
  addImage () {
    if (this.state.image) {
      firebase.storage().ref('images/' + this.state.image.name).put(this.state.image)
      .on('state_changed',
      (snapshot) => {

      },
      (error) => {

      },
      () => {
        firebase.storage().ref('images').child(this.state.image.name).getDownloadURL()
          .then(url => {
           firebase.database().ref('/images').push({
              imageName: this.state.image.name,
              url
           })          
          })
          .then(() => this.setState({
            modal: !this.state.modal,
            image: ''
          }))
      }
    )
    }
  }

  deleteImage(element) {
    firebase.database().ref('images/' + element[0]).remove()
    firebase.storage().ref('images/' + element[1].imageName).delete()
  }

  render() {
    const {images} = this.state
    return (
        <div className="imagesContainer">
          <div className="buttons">
            <Button onClick={() => this.toggle()} color="primary">Add Image</Button>
          </div>
          <div className="myImages">
              {images && Object.entries(images).map((el, i) => {
                return <Image key={i} deleteImage={this.deleteImage} el={el} />
              })}
          </div>
        <Modal isOpen={this.state.modal} toggle={() => this.toggle()} className={this.props.className} backdrop={this.state.backdrop}>
          <ModalHeader toggle={() => this.toggleClose()}>Coose an image</ModalHeader>
          <ModalBody>
          <FormGroup>
              <Input type="file" name="image" id="image" onChange={(e) => this.onFileChange(e)} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.addImage()}>Save</Button>{' '}
            <Button color="secondary" onClick={() => this.toggleClose()}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Images