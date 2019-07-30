import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import {
  Form,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Button
} from 'reactstrap'

import './Signin.css'

class Signin extends Component {

  state = {
    email: '',
    password: '',
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

  signin() {
    const { email, password } = this.state
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(err => this.setState({ errorMessage: err.message }))
  }

  render() {
    return (
      <div className="signinContainer">
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            name="email"
                            onChange={(event) => this.handleChange(event)}
                            placeholder="Username"
                            autoComplete="username" />
                        </InputGroup>
                        <InputGroup className="mb-4">
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
                            autoComplete="current-password" />
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Button onClick={() => this.signin()} color="primary" className="px-4">Login</Button>
                          </Col>
                        </Row>
                        <p style={{ color: 'red', marginTop: '10px' }} className="text-muted-red">{this.state.errorMessage && this.state.errorMessage}</p>
                      </Form>
                    </CardBody>
                  </Card>
                  <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                    <CardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <Link to="/signup">
                          <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Signin;
