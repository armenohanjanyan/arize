import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import {
  Form,
  Input,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap'

import './Signup.css'

class Signup extends Component {

  state = {
    email: '',
    password: '',
    name: '',
    phone: '',
    errorMessage: ''
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.history.push('/images')
      }
    })
  }

  handleChange(e) {
    let name = e.target.name,
      value = e.target.value
    this.setState({
      errorMessage: '',
      [name]: value
    })
  }

  createUser() {
    const { email, password, name, phone } = this.state
    let response
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((res) => {
        response = res.user
        let user = firebase.auth().currentUser
        if (user !== null) {
          user.updateProfile({
            displayName: name,
          })
        }
      })
      .then(() => firebase.database().ref('users/' + response.uid).set({
        phoneNumber: phone,
        email: email,
        name: name,
        uid: response.uid
      }))
      .catch(err => this.setState({ errorMessage: err.message }))
  }

  render() {
    return (
      <div className="signupContainer">
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="9" lg="7" xl="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <Form>
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="name"
                          onChange={(event) => this.handleChange(event)}
                          type="text"
                          placeholder="Username"
                          autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fas fa-envelope-square"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="email"
                          onChange={(event) => this.handleChange(event)}
                          placeholder="Email"
                          autoComplete="email" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-key"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          onChange={(event) => this.handleChange(event)}
                          placeholder="Password"
                          autoComplete="new-password" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-phone"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="phone"
                          onChange={(event) => this.handleChange(event)}
                          placeholder="Phone Number"
                          autoComplete="phone" />
                      </InputGroup>
                      <Button style={{ marginBottom: '10px' }} onClick={() => this.createUser()} color="success" block>Create Account</Button>
                      <Link to="/">
                        <Button onClick={() => this.createUser()} color="secondary" block>Login</Button>
                      </Link>
                    </Form>
                    <p style={{ color: 'red', marginTop: '10px' }} className="text-muted-red">{this.state.errorMessage && this.state.errorMessage}</p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Signup;
