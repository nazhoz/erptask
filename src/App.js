import React, { useState } from "react";
import "./Style.scss";
import Select from "react-select";
import Popup from "./components/Popup";
import delegateList from './json/DelegateList.json'
import Customernames from './json/CustomerDifferentNames.json'
import Customers from './json/Customer.json'
import ServiceType from './json/Service List.json'
import Servicenames from './json/ServiceDifferentNames.json'

const App = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [selectsValue, setSelectsValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [tableRows, setTableRows] = useState([
    { delegateName: "", address: "", email: "", pickup: "", drop: "", exception: "" },
  ]);

  const options = ["option 1", "options 2", "options 3"];

  const handleDropDownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handledropdownchanges = (event) => {
    setSelectValue(event.target.value);
  };

  const handleDropDownChanged = (event) => {
    setSelectsValue(event.target.value);
  };

  const handleTableRowChange = (selectedOption, index, field) => {
    const updatedRows = [...tableRows];
    updatedRows[index][field] = selectedOption; // Store the entire option object
  
    // Check if the user is typing in the last row
    if (index === updatedRows.length - 1 && selectedOption && selectedOption.value !== "") {
      // Add a new empty row
      updatedRows.push({ delegateName: "", address: "", email: "", pickup: "", drop: "", exception: "" });
    }
  
    // Update the state with the modified rows
    setTableRows(updatedRows);
  };

  const thStyle = {
    fontSize: "12px",
    border: "none",
    outline: "none",
    background: "none",
  };

  const option = [
    { value: "option 1", label: "option 1" },
    { value: "option 2", label: "option 2" },
    { value: "option 3", label: "option 3" },
  ];

  const delegateOptions = delegateList.map((delegate) => ({
    value: delegate.DelegateID,
    label: delegate.DelegateName,
  }));
  const CustomerOptions = Customers.map((item) => ({
    value: item.CustomerID,
    label: item.CustomerName,
  }));
  const CustomerNames = Customernames.map((item) => ({
    value: item.CustomerID,
    label: item.Name,
  }));
  const serviceTypes = ServiceType.map((item) => ({
    value: item.ID,
    label: item.ServiceName,
    type:item.ScheduleType
  }));
  const serviceNames = Servicenames.map((item) => ({
    value: item.ID,
    label: item.Name,
    // type:item.ScheduleType
  }));

  const handleAddExceptionClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveException = (popup) => {
    console.log("Popup :", popup);
  };

  return (
    <div className="App">
      <div className={"headPart"}>
        <span>Cloud System W L L</span>
      </div>
      <div className="container">
        <div className="firstInput">
          <div className="inputField">
            <span>Request No :</span>
            <input type="text" placeholder="id" />
          </div>
          <div className="DropDowns">
            <label htmlFor="dropdown">Customer Name :</label>
            <select id="dropdown" value={selectedValue} onChange={handleDropDownChange}>
              <option value="" disabled hidden>
                Select...
              </option>
              {CustomerNames.map((option, index) => (
                <option key={index} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="secondInput">
          <div className="selectedoptions">
            <label htmlFor="dropdown">Service Type :</label>
            <select id="dropdown" value={selectValue} onChange={handledropdownchanges}>
              <option value="" hidden>
                Select...
              </option>
              {serviceTypes.map((option, index) => (
                <option key={index} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="selectedoption">
            <label htmlFor="dropdown">Customer Types :</label>
            <select id="dropdown" value={selectsValue} onChange={handleDropDownChanged}>
              <option value="" hidden>
                Select...
              </option>
              {CustomerOptions.map((option, index) => (
                <option key={index} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* First Table */}
      <div className="table">
        <div className="table-head">
          <span>Service Details</span>
        </div>

        <div className="table-body">
          <table>
            <thead className="first-table-head">
              <tr>
                <th>Sl.No</th>
                <th>Service Name</th>
                <th>Name in Certificate</th>
                <th>Requested Date Time</th>
                <th>Unit</th>
                <th>Qty</th>
                <th>LPO Reference No</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tableslno1" style={thStyle}>
                  <span className="firsttableno1">1</span>
                </td>
                <td className="TableHead12" style={thStyle}>
                  <Select className="TableSelectOption12" options={serviceNames} placeholder="Service Name" />
                </td>
                <td className="TableHead7" style={thStyle}>
                  <input type='text'  className="TableSelectOption7" placeholder="Name in Certificate" />
                </td>
                <td className="TableHead8" style={thStyle}>
                  <input type="date" className="TableSelectOption8" placeholder="Requested Date Time" />
                </td>
                <td className="TableHead9" style={thStyle}>
                  <input type='text' className="TableSelectOption9" options={option} placeholder="Unit" />
                </td>
                <td className="TableHead0" style={thStyle}>
                <input type='text' className="TableSelectOption0" options={option} placeholder="Qty" />
                </td>
                <td className="TableHead11" style={thStyle}>
                <input type='text'  className="TableSelectOption11" options={option} placeholder="LPO Reference No" />
                </td>
              </tr>
            </tbody>
          </table>
          {showPopup && <Popup onClose={handleClosePopup} onSave={handleSaveException} />}
        </div>
      </div>

      {/* Second Table */}
      <div className="table">
        <div className="table-head">
          <span>Delegated Services</span>
        </div>

        <div className="table-body">
          <table>
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Delegate Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>PickUp</th>
                <th>Drop</th>
                <th>Exception</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, index) => (
                <tr key={index}>
                  <th className="tableslno" style={thStyle}>
                    <span className="firsttableno">{index + 1}</span>
                  </th>
                  <th className="TableHead" style={thStyle}>
                  <Select
                      className="TableSelectOption"
                      options={delegateOptions}
                      placeholder="Delegate Name"
                      onChange={(selectedOption) => handleTableRowChange(selectedOption, index, 'delegateName')}
                      value={row.delegateName}
                    />

                  </th>
                  <th className="TableHead1" style={thStyle}>
                  <input type='text' 
                      className="TableSelectOption1"
                      placeholder="Address"
                      onChange={(selectedOption) => handleTableRowChange(selectedOption, index, 'address')}
                      value={row.address}
                    />
                  </th>
                  <th className="TableHead2" style={thStyle}>
                  <input type='text' 
                      className="TableSelectOption2"
                      placeholder="Email"
                      onChange={(selectedOption) => handleTableRowChange(selectedOption, index, 'email')}
                      value={row.email}
                    />
                  </th>
                  <th className="TableHead3" style={thStyle}>
                    <Select
                      className="TableSelectOption3"
                      options={option}
                      placeholder="PickUp"
                      onChange={(selectedOption) => handleTableRowChange(selectedOption, index, 'pickup')}
                      value={row.pickup}
                    />
                  </th>
                  <th className="TableHead4" style={thStyle}>
                    <Select
                      className="TableSelectOption4"
                      options={option}
                      placeholder="Drop"
                      onChange={(selectedOption) => handleTableRowChange(selectedOption, index, 'drop')}
                      value={row.drop}
                    />
                  </th>
                  <th className="TableHead6" style={thStyle}>
                    <Select
                      className="TableSelectOption6"
                      options={option}
                      placeholder="Add Exception"
                      onChange={(selectedOption) => handleTableRowChange(selectedOption, index, 'exception')}
                      value={row.exception}
                    />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="savebutton">
        <button>Save</button>
        <button>Clear</button>
        <button>Delete</button>
        <button>Close</button>
      </div>
    </div>
  );
};

export default App;
