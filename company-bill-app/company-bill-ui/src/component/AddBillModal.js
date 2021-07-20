import React, { Component } from 'react';
import {
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBBtn,
  MDBContainer,
  MDBInput,
  MDBModalFooter,
  ToastContainer,
  toast
} from 'mdbreact';

const url = process.env.REACT_APP_API;
const apiKey = process.env.REACT_APP_API_KEY;

class AddBillModal extends Component {
  constructor() {
    super();
    this.state = { companyHtml: [] };
  }

  componentWillMount() {
    this.getCompany();
  }

  getCompany() {
    fetch(url + '/company', {
      method: 'GET',
      headers: {
        'x-api-key': apiKey
      }
    })
      .then(result => result.json())
      .then(data => {
        if (data.success === true && data.body.length > 0) {
          const companyData = [];
          companyData.push(
            <option value="" key={0}>
              Select Company
            </option>
          );

          data.body.map(el => {
            companyData.push(
              <option value={el.id} key={el.id}>
                {el.name}
              </option>
            );
            this.setState({ companyHtml: companyData });
            return false;
          });
        }
      })
      .catch(err => console.log('getCompany - error', err));
  }

  saveBill() {
    let validForm = true;
    const postBody = {
      company_ID: document.getElementById('ddlCompany').value.trim(),
      date: document.getElementById('dtPayDate').value.trim(),
      amount: document.getElementById('txtAmount').value.trim(),
      billNumber: document.getElementById('txtBillNo').value.trim(),
      dueDate: document.getElementById('dtDueDate').value.trim(),
      comment: document.getElementById('txtComment').value.trim()
    };

    for (let singleProp in postBody) {
      if (postBody[singleProp] === '') {
        validForm = false;
        break;
      }
    }

    if (validForm) {
      fetch(url + '/bill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify(postBody)
      })
        .then(result => result.json())
        .then(data => {
          toast.success('Bill saved Successfully.', {
            position: 'top-center'
          });
          setTimeout(() => this.props.showAddBillModal('refresh'), 1000);
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

  render() {
    const { companyHtml } = this.state;
    const { showAddBillModal } = this.props;
    return (
      <MDBModal isOpen={true} toggle={showAddBillModal} size="lg">
        <MDBModalHeader toggle={showAddBillModal}>Add Bill</MDBModalHeader>
        <MDBModalBody>
          <ToastContainer
            hideProgressBar={true}
            newestOnTop={true}
            autoClose={1500}
          />
          <MDBContainer>
            <div className="md-form">
              <label htmlFor="ddlCompany">Company:</label>
              <br />
              <br />
              <select
                id="ddlCompany"
                className="custom-select"
                style={{ width: '200px' }}
              >
                {companyHtml}
              </select>
            </div>
            <div className="md-form">
              <label htmlFor="dtPayDate">Payment Date:</label>
              &nbsp;
              <MDBInput type="date" id="dtPayDate" style={{ width: '200px' }} />
            </div>
            <div className="md-form">
              <MDBInput label="Amount" type="text" id="txtAmount" />
            </div>
            <div className="md-form">
              <MDBInput label="Bill Number" type="text" id="txtBillNo" />
            </div>
            <div className="md-form">
              <label htmlFor="dtDueDate">Due Date:</label>
              &nbsp;
              <MDBInput type="date" id="dtDueDate" style={{ width: '200px' }} />
            </div>
            <div className="md-form">
              <MDBInput label="Comment" type="text" id="txtComment" />
            </div>
          </MDBContainer>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={showAddBillModal}>
            Close
          </MDBBtn>
          <MDBBtn color="primary" onClick={this.saveBill.bind(this)}>
            Save changes
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  }
}

export default AddBillModal;
