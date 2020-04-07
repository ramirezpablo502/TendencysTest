import React, { Component } from 'react';
import { Nav, Navbar, Table, Container, Row, Col, Form, Button, Modal, Image } from 'react-bootstrap';
import Backend from './backend';
import SuccessImage from './images/tick.svg';
import FacebookImage from './images/facebook.svg';
import TwitterImage from './images/twitter.svg';
import InstagramImage from './images/instagram.svg';

class TablePaymentIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list_payments: [],
      numberOrder: 0,
      sku: '',
      name: '',
      quantity: '',
      price: '',
      showModal: false
    }
  }

  componentWillMount(){
    const self = this;

    Backend.TestInformation(response => {
      console.log(response)
      self.setState({
        list_payments: response.order.items,
        numberOrder: response.order.number
      });
    });
  }

  renderListPayments() {
    const self = this;
    var result = [];
    self.state.list_payments.forEach(function (row) {
      result.push(
        <tr>
          <th>{row.sku}</th>
          <th>{row.name}</th>
          <th>{row.quantity}</th>
          <th>{Number(row.price).toFixed(2)}</th>
        </tr>
      );
    });
    return result;
  }

  renderTotalAmount(){
    const self = this;
    var result = 0;
    self.state.list_payments.forEach(function (row) {
      result = result + Number(row.price);
    });
    return result.toFixed(2);
  }

  addedProduct(){
    const self = this;

    if(this.state.sku !== '' && this.state.name !== '' && this.state.quantity !== '' && this.state.price !== ''){
      const obj = {'sku': this.state.sku, 'name': this.state.name, 'quantity': this.state.quantity , 'price': this.state.price };
      this.setState({
        list_payments: this.state.list_payments.concat(obj),
        sku: '',
        name: '',
        quantity: '',
        price: ''
      });
      setTimeout(function(){ alert("The product was successfully added"); }, 500);
    } else {
      alert("Capture the required data");
    }
  }

  handleShow(){
    this.setState({
      showModal: true
    });
  }

  handleClose(){
    this.setState({
      showModal: false
    });
  }
  render() {
    return (
      <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Payments</Navbar.Brand>
      </Navbar>
      <br/>
      <Container>
        <Row>
          <Col md={12} className="text-left">
            <div>
              <h5>purchase order number: #{this.state.numberOrder}</h5>
            </div>
          </Col>
        </Row>
      </Container>
      <br/>
      <Container>
        <Row>
          <Col md={5}>
            <div className="container_content">
              <Form.Group as={Row}>
                <Form.Label column md="2" className="label-signup">Sku</Form.Label>
                <Col md="10">
                  <Form.Control className="input_content" type="text" value={this.state.sku} onChange={(sku) => { this.setState({ sku: sku.target.value }); }} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column md="2" className="label-signup">Name</Form.Label>
                <Col md="10">
                  <Form.Control className="input_content" type="text" value={this.state.name} onChange={(name) => { this.setState({ name: name.target.value }); }} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column md="2" className="label-signup">Quantity</Form.Label>
                <Col md="10">
                  <Form.Control className="input_content" type="number" value={this.state.quantity} onChange={(quantity) => { this.setState({ quantity: quantity.target.value }); }} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column md="2" className="label-signup">Price</Form.Label>
                <Col md="10">
                  <Form.Control className="input_content" type="number" value={this.state.price} onChange={(price) => { this.setState({ price: price.target.value }); }} />
                </Col>
              </Form.Group>
              <Form.Group>
                <Button style={{ marginBottom: 0, width: "50%" }} onClick={() => { this.addedProduct(); }}>Add product</Button>
              </Form.Group>
            </div>
          </Col>
          <Col md={7}>
            <div className="container_content">
              <Table striped hover size="sm">
                <thead>
                  <tr>
                    <th>Sku</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderListPayments()}
                </tbody>
              </Table>
              <div>
              <p>The total of the account is: <bold>{this.renderTotalAmount()}</bold></p>
                <Form.Group>
                  <Button variant="success" style={{ marginBottom: 0, width: "50%" }} onClick={() => { this.handleShow(); }}>Pay</Button>
                </Form.Group>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal className="modal_container" show={this.state.showModal} onHide={()=>{this.handleClose()}}>
        <div>
          <Image className="modal_image_success" src={SuccessImage} />
          <p className="text_thanks">THANK YOU</p>
          <p className="text_congratulations">Congratulations. The payment process <br/> for your payment was successful.</p>
          <br/>
          <br/>
          <p className="text_follow">FOLLOW US</p>
          <div className="container_flex">
            <Image src={FacebookImage} />
            <Image src={TwitterImage} />
            <Image src={InstagramImage} />
          </div>
        </div>
      </Modal>
      </div>
    );
  }
} export default TablePaymentIndex;
