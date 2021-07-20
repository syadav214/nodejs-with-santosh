import React, { Component } from 'react';
import { MDBIcon, MDBDataTable } from 'mdbreact';
import AddCompanyModal from '../component/AddCompanyModal';
import AddBillModal from '../component/AddBillModal';
import EditBillModal from '../component/EditBillModal';

const url = process.env.REACT_APP_API;
const apiKey = process.env.REACT_APP_API_KEY;

class Bill extends Component {
  constructor() {
    super();
    this.state = {
      billData: {},
      yearsHtml: [],
      showAddComp: false,
      showAddBill: false,
      showEditBill: false,
      editBillID: 0
    };
  }

  componentWillMount() {
    this.getYear();
    this.getBills();
  }

  getYear() {
    fetch(url + '/year', {
      method: 'GET',
      headers: {
        'x-api-key': apiKey
      }
    })
      .then(result => result.json())
      .then(data => {
        if (data.success === true && data.body.length > 0) {
          const { minYear, maxYear } = data.body[0];
          const yearsData = [];
          yearsData.push(
            <option value="0" key={0}>
              All Years
            </option>
          );
          for (let yearCnt = minYear; yearCnt <= maxYear; yearCnt++) {
            yearsData.push(
              <option value={yearCnt} key={yearCnt}>
                {yearCnt}
              </option>
            );
          }
          this.setState({ yearsHtml: yearsData });
        }
      })
      .catch(err => console.log('getYear - error', err));
  }

  getBills(e) {
    let month = 0,
      year = 0,
      all = 0;

    if (e) {
      if (e.target.id === 'btnAll') {
        all = 1;
        if (document.getElementById('month')) {
          document.getElementById('month').value = '0';
        }
        if (document.getElementById('year')) {
          document.getElementById('year').value = '0';
        }
      } else {
        if (document.getElementById('month')) {
          month = document.getElementById('month').value;
        }
        if (document.getElementById('year')) {
          year = document.getElementById('year').value;
        }
      }
    }

    const columnsRows = {
      columns: [
        {
          label: 'Edit Bill',
          field: 'edit'
        },
        {
          label: 'Payment Date',
          field: 'date',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Company Name',
          field: 'name',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Bill Number',
          field: 'billNumber',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc',
          width: 100
        }
      ],
      rows: []
    };

    fetch(url + `/bills/${month}/${year}/${all}`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey
      }
    })
      .then(result => result.json())
      .then(data => {
        if (data.success === true && data.body.length > 0) {
          data.body.map(el => {
            const objBill = {
              field: (
                <MDBIcon
                  icon="edit"
                  size="lg"
                  id={el.id}
                  onClick={this.showEditBillModal.bind(this)}
                />
              ),
              date: el.date,
              name: el.name,
              billNumber: el.billNumber,
              amount: el.amount
            };
            columnsRows.rows.push(objBill);
            return false;
          });
          this.setState({ billData: columnsRows });
        } else {
          this.setState({ billData: {} });
        }
      })
      .catch(err => console.log('getBills - error', err));
  }

  showAddCompanyModal() {
    this.setState({ showAddComp: !this.state.showAddComp });
  }

  showAddBillModal(successWindow) {
    if (successWindow === 'refresh') {
      this.componentWillMount();
    }
    this.setState({ showAddBill: !this.state.showAddBill });
  }

  showEditBillModal(successWindow) {
    const updateState = {
      showEditBill: !this.state.showEditBill,
      editBillID: 0
    };
    if (successWindow === 'refresh') {
      this.componentWillMount();
    } else if (successWindow && successWindow.currentTarget) {
      updateState.editBillID = successWindow.currentTarget.id;
    }
    this.setState(updateState);
  }

  render() {
    const {
      billData,
      yearsHtml,
      showAddComp,
      showAddBill,
      showEditBill,
      editBillID
    } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col text-left">
            <button
              id="btnAddCompany"
              type="button"
              className="btn btn-secondary"
              onClick={this.showAddCompanyModal.bind(this)}
            >
              Add Company
            </button>
            &nbsp;
            <button
              id="btnAddBill"
              type="button"
              className="btn btn-secondary"
              onClick={this.showAddBillModal.bind(this)}
            >
              Add Bill
            </button>
          </div>
          <div className="col text-right">
            <select
              id="month"
              style={{ width: '150px' }}
              className="custom-select"
              onChange={this.getBills.bind(this)}
            >
              <option value="0">All Months</option>
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
            &nbsp;
            <select
              id="year"
              style={{ width: '150px' }}
              className="custom-select"
              onChange={this.getBills.bind(this)}
            >
              {yearsHtml}
            </select>
            <button
              id="btnAll"
              type="button"
              className="btn btn-primary"
              onClick={this.getBills.bind(this)}
            >
              All
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <MDBDataTable striped bordered small data={billData} />
          </div>
        </div>
        {showAddComp && (
          <AddCompanyModal
            showAddCompanyModal={this.showAddCompanyModal.bind(this)}
          />
        )}
        {showAddBill && (
          <AddBillModal showAddBillModal={this.showAddBillModal.bind(this)} />
        )}
        {showEditBill && (
          <EditBillModal
            showEditBillModal={this.showEditBillModal.bind(this)}
            id={editBillID}
          />
        )}
      </div>
    );
  }
}
export default Bill;
