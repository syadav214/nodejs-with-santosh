import React, { Component } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  ToastContainer,
  toast
} from 'mdbreact';

const url = process.env.REACT_APP_API;
const apiKey = process.env.REACT_APP_API_KEY;

class EditBillModal extends Component {
  constructor() {
    super();
    this.state = { billData: {} };
    this.elementChange = this.elementChange.bind(this);
  }

  componentWillMount() {
    this.getBill();
  }

  getBill() {
    fetch(url + `/bill/${this.props.id}`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey
      }
    })
      .then(result => result.json())
      .then(data => {
        if (data.success === true && data.body.length > 0) {
          this.setState({ billData: data.body[0] });
        } else {
          this.setState({ billData: {} });
        }
      })
      .catch(err => console.log('getBill - error', err));
  }

  updateBill() {
    let validForm = true;
    const putBody = {
      date: document.getElementById('dtPayDate').value.trim(),
      amount: document.getElementById('txtAmount').value.trim(),
      billNumber: document.getElementById('txtBillNo').value.trim(),
      dueDate: document.getElementById('dtDueDate').value.trim(),
      comment: document.getElementById('txtComment').value.trim()
    };

    for (let singleProp in putBody) {
      if (putBody[singleProp] === '') {
        validForm = false;
        break;
      }
    }

    if (validForm) {
      fetch(url + `/bill/${this.props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify(putBody)
      })
        .then(result => result.json())
        .then(data => {
          toast.success('Bill updated Successfully.', {
            position: 'top-center'
          });
          setTimeout(() => this.props.showEditBillModal('refresh'), 1000);
        })
        .catch(err => {
          toast.error('Something went wrong.', {
            position: 'top-center'
          });
        });
    } else {
      toast.warn('Please enter value in all the fields.', {
        position: 'top-center'
      });
    }
  }

  elementChange(e) {
    const { billData } = this.state;
    switch (e.target.id) {
      case 'dtPayDate':
        billData.date = e.target.value;
        break;
      case 'txtAmount':
        billData.amount = e.target.value;
        break;
      case 'txtBillNo':
        billData.billNumber = e.target.value;
        break;
      case 'dtDueDate':
        billData.dueDate = e.target.value;
        break;
      case 'txtComment':
        billData.comment = e.target.value;
        break;
      default:
        break;
    }
    this.setState(billData);
  }

  render() {
    const { billData } = this.state;
    const { showEditBillModal } = this.props;

    return (
      <MDBModal isOpen={true} toggle={showEditBillModal} size="lg">
        <MDBModalHeader toggle={showEditBillModal}>Edit Bill</MDBModalHeader>
        <MDBModalBody>
          <ToastContainer
            hideProgressBar={true}
            newestOnTop={true}
            autoClose={1500}
          />
          <MDBContainer>
            <div className="md-form">
              <label htmlFor="dtPayDate">Payment Date:</label>
              &nbsp;
              <MDBInput
                type="date"
                id="dtPayDate"
                style={{ width: '200px' }}
                value={`${billData.date}`}
                onChange={this.elementChange.bind(this)}
              />
            </div>
            <div className="md-form">
              <MDBInput
                label="Amount"
                type="text"
                id="txtAmount"
                value={`${billData.amount}`}
                onChange={this.elementChange.bind(this)}
              />
            </div>
            <div className="md-form">
              <MDBInput
                label="Bill Number"
                type="text"
                id="txtBillNo"
                value={`${billData.billNumber}`}
                onChange={this.elementChange.bind(this)}
              />
            </div>
            <div className="md-form">
              <label htmlFor="dtDueDate">Due Date:</label>
              &nbsp;
              <MDBInput
                type="date"
                id="dtDueDate"
                style={{ width: '200px' }}
                value={`${billData.dueDate}`}
                onChange={this.elementChange.bind(this)}
              />
            </div>
            <div className="md-form">
              <MDBInput
                label="Comment"
                type="text"
                id="txtComment"
                value={`${billData.comment}`}
                onChange={this.elementChange.bind(this)}
              />
            </div>
          </MDBContainer>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={showEditBillModal}>
            Close
          </MDBBtn>
          <MDBBtn color="primary" onClick={this.updateBill.bind(this)}>
            Save changes
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  }
}

export default EditBillModal;
