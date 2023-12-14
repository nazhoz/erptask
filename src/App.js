import React, { useState } from "react";
import './Style.scss'
import Select from 'react-select';
import Popup from "./components/Popup";


const App = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [selectsValue, setSelectsValue] = useState("");
  const [showPopup, setShowPopup] = useState(false)
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);

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

  // =================== table option dropdown===========================================
  const option =[
    {value:'option 1', label:'option 1', },
    {value:'option 2', label:'option 2', },
    {value:'option 3', label:'option 3', },
  ]

  const thStyle = {
    fontSize:'12px',
    border: 'none',
    outline: 'none',
    background: 'none',
  }

  // ================================== POPUP =======================================

  const handleAddExceptionClick = ()=>{
    setShowPopup(true)
    setIsDropdownDisabled(true);
  }

  const handleClosePopup = ()=>{
    setShowPopup(false)
    setIsDropdownDisabled(false);
  }

  const handleSaveException = (popup)=>{
    console.log('Popup :', popup)
  }


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
          <select
            id="dropdown"
            value={selectedValue}
            onChange={handleDropDownChange}
          >
            <option value="" disabled hidden>Select...</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          </div>      
        </div>
        <div className="secondInput">
          <div className="selectedoptions">
          <label htmlFor="dropdown">Service Type :</label>
          <select
            id="dropdown"
            value={selectValue}
            onChange={handledropdownchanges}
          >
            <option value="" hidden>Select...</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          </div>
            <div className="selectedoption">
            <label htmlFor="dropdown">Customer Types :</label>
          <select
            id="dropdown"
            value={selectsValue}
            onChange={handleDropDownChanged}
          >
            <option value="" hidden >Select...</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
            </div>
          
        </div>
      </div>

      

          {/*============================ FIRST TABLE ==================================== */}

      <div className="table">
        <div className="table-head">
          <span>Service Details</span>
        </div>

        <div className="table-body">
      <table>
        <thead className="first-table-head">
          <tr>
            <th className="tableslno" style={thStyle}>
              <span className="firsttableno">Sl. No</span>
            </th>
            <th className="TableHead" style={thStyle}>
              <Select className="TableSelectOption" options={option} placeholder="Service Name" />
            </th>
            <th className="TableHead1" style={thStyle}>
              <Select className="TableSelectOption1" options={option} placeholder="Name in Certificate" />
            </th>
            <th className="TableHead2" style={thStyle}>
              <Select className="TableSelectOption2" options={option} placeholder="Requested Date Time" />
            </th>
            <th className="TableHead3" style={thStyle}>
              <Select className="TableSelectOption3" options={option} placeholder="Unit" />
            </th>
            <th className="TableHead4" style={thStyle}>
              <Select className="TableSelectOption4" options={option} placeholder="Qty" />
            </th>
            <th className="TableHead5" style={thStyle}>
              <Select className="TableSelectOption5" options={option} placeholder="LPO Refrence No" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1</td>
            <td>Data 1</td>           
            <td>Data 1</td>           
            <td>Data 1</td>           
            <td>Data 1</td>           
            <td>Data 1</td>           
            <td>Data 1</td>           
          </tr>
        </tbody>
      </table>
      {showPopup && (
        <Popup onClose={handleClosePopup} onSave={handleSaveException}/>
      )}
    </div>
      </div>

      
              {/*============================ SECOND TABLE ==================================== */}

      <div className="table">
        <div className="table-head">
          <span>Delegated Services</span>
        </div>

        <div className="table-body">
      <table>
        <thead>
          <tr>
            <th className="tableslno" style={thStyle}>
              <span className="firsttableno">Sl. No</span>
            </th>
            <th className="TableHead" style={thStyle}>
              <Select className="TableSelectOption" options={option} placeholder="Delegate Name" />
            </th>
            <th className="TableHead1" style={thStyle}>
              <Select className="TableSelectOption1" options={option} placeholder="Address" />
            </th>
            <th className="TableHead2" style={thStyle}>
              <Select className="TableSelectOption2" options={option} placeholder="Email" />
            </th>
            <th className="TableHead3" style={thStyle}>
              <Select className="TableSelectOption3" options={option} placeholder="PickUp" />
            </th>
            <th className="TableHead4" style={thStyle}>
              <Select className="TableSelectOption4" options={option} placeholder="Drop" />
            </th>
            <th className="TableHead6" style={thStyle}>
            <Select className="TableSelectOption6" options={option} isDisabled={isDropdownDisabled} placeholder="Add Exception" />
              <button className="tableSelectOption6btn" onClick={handleAddExceptionClick} />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1</td>
            <td>Data 1</td>           
            <td>Data 1</td>           
            <td>Data 1</td>           
            <td>Data 1</td>           
            <td>Data 1</td>           
            <td>Data 1</td>           
          </tr>
          
        </tbody>
      </table>
    </div>
      </div>


      <div className="savebutton">
        {/* <div className="allbuttons"> */}
          <button>Save</button>
          <button>Clear</button>
          <button>Delete</button>
          <button>Close</button>
        {/* </div> */}
      </div>

      
    </div>
  );
};

export default App;
