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

class AddCompanyModal extends Component {
  saveCompany() {
    let validForm = true;
    const postBody = {
      project_ID: document.getElementById('txtProjectID').value.trim(),
      name: document.getElementById('txtCompanyName').value.trim(),
      city: document.getElementById('txtCity').value.trim(),
      country: document.getElementById('txtCountry').value.trim(),
      contactEmail: document.getElementById('txtEmailID').value.trim()
    };

    for (let singleProp in postBody) {
      if (postBody[singleProp] === '') {
        validForm = false;
        break;
      }
    }

    if (validForm) {
      fetch(url + '/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify(postBody)
      })
        .then(result => result.json())
        .then(data => {
          toast.success('Company saved Successfully.', {
            position: 'top-center'
          });
          setTimeout(() => this.props.showAddCompanyModal(), 1000);
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
    const { showAddCompanyModal } = this.props;
    return (
      <div>
        <MDBModal isOpen={true} toggle={showAddCompanyModal} size="lg">
          <MDBModalHeader toggle={showAddCompanyModal}>
            Add Company
          </MDBModalHeader>
          <MDBModalBody>
            <ToastContainer
              hideProgressBar={true}
              newestOnTop={true}
              autoClose={1500}
            />
            <MDBContainer>
              <div className="md-form">
                <MDBInput
                  label="Company Name"
                  type="text"
                  id="txtCompanyName"
                />
              </div>
              <div className="md-form">
                <MDBInput label="Project ID" type="text" id="txtProjectID" />
              </div>
              <div className="md-form">
                <MDBInput label="City" type="text" id="txtCity" />
              </div>
              <div className="md-form">
                <MDBInput label="Country" type="text" id="txtCountry" />
              </div>
              <div className="md-form">
                <MDBInput label="Email ID" type="email" id="txtEmailID" />
              </div>
            </MDBContainer>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={showAddCompanyModal}>
              Close
            </MDBBtn>
            <MDBBtn color="primary" onClick={this.saveCompany.bind(this)}>
              Save changes
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

export default AddCompanyModal;
