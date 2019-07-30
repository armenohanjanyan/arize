import React, { Component } from 'react';
import firebase from 'firebase'
import {
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Input, 
  Label, 
  Form, 
  FormGroup ,
  Spinner
} from 'reactstrap';
import Images from '../Images/Images';

import './ImageGalery.css'


class ImageGalery extends Component {

  state = {
    name: '',
    email: '',
    phone: '',
    modal: false,
    errorMessage: '',
    loading: false
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          name: user.displayName,
          email: user.email,
          uid: user.uid
        })
        console.log(user)
        firebase.database().ref('/users/' + this.state.uid).on('value', data => {
         this.setState({phone: data.toJSON().phoneNumber})
        })
      } else {
        this.props.history.push('/')
      }
    })
  }

  logout() {
    firebase.auth().signOut()
  }

  toggle() {
    if (this.state.modal) {
      this.setState(prevState => ({
        modal: !prevState.modal,
        name: '',
        email: '',
        errorMessage: ''
      }));
    }
    if (!this.state.modal) {
      let user = firebase.auth().currentUser
      this.setState(prevState => ({
        modal: !prevState.modal,
        name: user.displayName,
        email: user.email,
      }));
    }
  }

  editUserData() {
    const { name, email, phone, uid } = this.state
    this.setState({loading: true})
    let user = firebase.auth().currentUser
    user.updateEmail(email).then(() => {
    }).catch((error) => {
      this.setState({ errorMessage: error.message, loading: false })
    })
    .then(() => {
      user.updateProfile({
          displayName: name,
        })
    })
    .then(() => {
     let updates = {}
     updates['/users/' + uid + '/phoneNumber'] = phone;
     updates['/users/' + uid + '/email'] = email;
     updates['/users/' + uid + '/name'] = name;
     firebase.database().ref().update(updates)
    })
    .then(() => {
      if (!this.state.errorMessage) {
        this.setState({
          modal: !this.state.modal,
          name: '',
          email: '',
          errorMessage: ''
        })
      }
    })
    .then(() => this.setState({loading: false}))
  }

  render() {
    const {loading} = this.state
    let spinner = <Spinner style={{ width: '100px', height: '100px', marginTop: '10%' }} />
    if (loading) {
      return spinner
    } else {
      return (
        <div className="container">
          <div className="header">
            <div className="userInfo">
              <div onClick={() => this.toggle()} className="editButton">
                Edit User profile
               </div>
            </div>
            <div onClick={() => this.logout()} className="logout">
              Log out
             </div>
          </div>
          <div className="imHeader">Add images to galery</div>
          <Images />
          <Modal isOpen={this.state.modal} toggle={() => this.toggle()} className={this.props.className} backdrop={this.state.backdrop}>
            <ModalHeader toggle={() => this.toggle()}>
              User Info
              <div>ID: {this.state.uid && this.state.uid}</div>
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value, errorMessage: '' })}
                    bsSize="sm"
                    name="email" />
                </FormGroup>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    bsSize="sm"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                    name="name" />
                </FormGroup>
                <FormGroup>
                  <Label for="examphoneplePassword">Phone number</Label>
                  <Input
                    value={this.state.phone}
                    onChange={(e) => this.setState({ phone: e.target.value })}
                    bsSize="sm"
                    name="phone" />
                </FormGroup>
              </Form>
              <p style={{ color: 'red', marginTop: '10px' }} className="text-muted-red">{this.state.errorMessage && this.state.errorMessage}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.editUserData()}>Save</Button>{' '}
              <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }
}

export default ImageGalery