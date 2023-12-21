import React, { useRef, useState } from "react";
import "./Style.scss";
import Select from "react-select";
import Popup from "./components/Popup";
import delegateList from "./json/DelegateList.json";
import Customernames from "./json/CustomerDifferentNames.json";
import Customers from "./json/Customer.json";
import ServiceType from "./json/Service List.json";
import Servicenames from "./json/ServiceDifferentNames.json";

const App = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [selectsValue, setSelectsValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [serviceTableRows, setServiceTableRows] = useState([
    {
      serviceName: null,
      nameInCertificate: "",
      requestedDateTime: "",
      unit: "",
      qty: "",
      lpoReferenceNo: "",
    },
  ]);

  const [delegateTableRows, setDelegateTableRows] = useState([
    {
      delegateName: null,
      address: "",
      email: "",
      pickup: null,
      drop: null,
      exception: "",
    },
  ]);
  const [savedData, setSavedData] = useState([]);

  const handleDropDownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handledropdownchanges = (event) => {
    setSelectValue(event.target.value);
  };

  const handleDropDownChanged = (event) => {
    setSelectsValue(event.target.value);
  };

  const handleTableRowChange = (event, index, field) => {
    if (field === "exception") {
      setShowPopup(true);
    }

    let updatedRows;

    if (field === "delegateName") {
      if (event) {
        updatedRows = [...delegateTableRows];
        updatedRows[index][field] = event;
      } else {
        updatedRows = delegateTableRows.filter((_, i) => i !== index);
      }
    } else if (field === "serviceName") {
      if (!serviceTableRows[index]) {
        serviceTableRows[index] = {
          serviceName: null,
          nameInCertificate: "",
          requestedDateTime: "",
          unit: "",
          qty: "",
          lpoReferenceNo: "",
        };
      }

      serviceTableRows[index][field] = event;
      updatedRows = [...serviceTableRows];
    } else {
      updatedRows = [...serviceTableRows];
      if (field === "address" || field === "email") {
        updatedRows[index][field] = event.target.value;
      } else {
        updatedRows[index][field] = event;
      }
    }
    if (
      index === updatedRows.length - 1 &&
      (field === "delegateName" || updatedRows[index][field] !== "")
    ) {
      const newRow =
        field === "delegateName"
          ? {
              delegateName: null,
              address: "",
              email: "",
              pickup: null,
              drop: null,
              exception: "",
            }
          : {
              serviceName: null,
              nameInCertificate: "",
              requestedDateTime: "",
              unit: "",
              qty: "",
              lpoReferenceNo: "",
            };

      updatedRows.push(newRow);

      if (field !== "delegateName") {
        setServiceTableRows(updatedRows);
        const nextRow = {
          serviceName: null,
          nameInCertificate: "",
          requestedDateTime: "",
          unit: "",
          qty: "",
          lpoReferenceNo: "",
        };
        setServiceTableRows((prevRows) => [...prevRows, nextRow]);
      } else {
        setDelegateTableRows(updatedRows);
      }
    } else {
      if (field === "delegateName") {
        setDelegateTableRows(updatedRows);
      } else {
        setServiceTableRows(updatedRows);
      }
    }
  };

  const serviceTableSelectRefs = useRef([]);
  const setServiceTableSelectRef = (index, ref) => {
    serviceTableSelectRefs.current[index] = ref;
  };

  const handleAddExceptionClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveException = (popup) => {
    console.log("Popup :", popup);
  };
  const handleSaveButtonClick = () => {
    let serviceRowCount = 2;
    let delegateRowCount = 3;

    if (selectsValue === "SomeCustomerType") {
      serviceRowCount = 2;
      delegateRowCount = 3;
    }

    const serviceTableData = serviceTableRows.slice(0, serviceRowCount);

    const delegateTableData = delegateTableRows.slice(0, delegateRowCount);

    const requestData = {
      requestId: document.getElementById("requestIdInput").value,
      customerName: selectedValue,
      serviceType: selectValue,
      customerType: selectsValue,
      serviceTableData,
      delegateTableData,
    };

    setServiceTableRows(
      Array.from({ length: serviceRowCount }, () => ({
        serviceName: null,
        nameInCertificate: "",
        requestedDateTime: "",
        unit: "",
        qty: "",
        lpoReferenceNo: "",
      }))
    );

    setDelegateTableRows(
      Array.from({ length: delegateRowCount }, () => ({
        delegateName: null,
        address: "",
        email: "",
        pickup: null,
        drop: null,
        exception: "",
      }))
    );

    setSavedData([...savedData, requestData]);
    setSelectedValue("");
    setSelectValue("");
    setSelectsValue("");

    document.getElementById("requestIdInput").value = "";

    serviceTableSelectRefs.current.forEach((selectRef) => {
      selectRef.setValue(null);
    });

    document.querySelector(".TableSelectOption7").value = "";
    document.querySelector(".TableSelectOption8").value = "";
    document.querySelector(".TableSelectOption9").value = "";
    document.querySelector(".TableSelectOption0").value = "";
    document.querySelector(".TableSelectOption11").value = "";
    alert("Your data is saved!");
  };

  console.log("Saveddat", savedData);

  const thStyle = {
    fontSize: "12px",
    border: "none",
    outline: "none",
    background: "none",
  };

  const option = ["option 1", "options 2", "options 3"];

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
    type: item.ScheduleType,
  }));
  const serviceNames = Servicenames.map((item) => ({
    value: item.ID,
    label: item.Name,
  }));

  return (
    <div className="App">
      <div className={"headPart"}>
        <span>Cloud System W L L</span>
      </div>
      <div className="container">
        <div className="firstInput">
          <div className="inputField">
            <span>Request No :</span>
            <input id="requestIdInput" type="text" placeholder="id" />
          </div>
          <div className="DropDowns">
            <label htmlFor="dropdown">Customer Name :</label>
            <Select
              className="customerDetailsDrop"
              options={CustomerNames}
              placeholder="Service Name"
              ref={(ref) => setServiceTableSelectRef(0, ref)}
            />
          </div>
        </div>
        <div className="secondInput">
          <div className="selectedoptions">
            <label htmlFor="dropdown">Service Type :</label>
            <Select
              className="customerDetailsDrop"
              options={serviceTypes}
              placeholder="Service Name"
              ref={(ref) => setServiceTableSelectRef(0, ref)}
            />
          </div>
          <div className="selectedoption">
            <label htmlFor="dropdown">Customer Types :</label>
            <Select
              className="customerDetailsDrop"
              options={CustomerOptions}
              placeholder="Service Name"
              ref={(ref) => setServiceTableSelectRef(0, ref)}
            />
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
            <thead>
              <tr>
                <th className="headone">Sl.No</th>
                <th className="headtwo">Service Name</th>
                <th className="headthree">Name in Certificate</th>
                <th className="headfour">Requested Date Time</th>
                <th className="headfive">Unit</th>
                <th className="headsix">Qty</th>
                <th className="headseven">LPO Reference No</th>
              </tr>
            </thead>
            <tbody>
              {serviceTableRows.map((row, index) => (
                <tr key={index}>
                  <td className="tableslno1" style={thStyle}>
                    <span className="firsttableno1">{index + 1}</span>
                  </td>
                  <td className="TableHead12" style={thStyle}>
                    <Select
                      className="TableSelectOption12"
                      options={serviceNames}
                      placeholder="Service Name"
                      onChange={(selectedOption) =>
                        handleTableRowChange(
                          selectedOption,
                          index,
                          "serviceName"
                        )
                      }
                    />
                  </td>
                  <td className="TableHead7" style={thStyle}>
                    <input
                      type="text"
                      className="TableSelectOption7"
                      placeholder="Name in Certificate"
                    />
                  </td>
                  <td className="TableHead8" style={thStyle}>
                    <input
                      type="date"
                      className="TableSelectOption8"
                      placeholder="Requested Date Time"
                    />
                  </td>
                  <td className="TableHead9" style={thStyle}>
                    <input
                      type="text"
                      className="TableSelectOption9"
                      options={option}
                      placeholder="Unit"
                    />
                  </td>
                  <td className="TableHead0" style={thStyle}>
                    <input
                      type="text"
                      className="TableSelectOption0"
                      options={option}
                      placeholder="Qty"
                    />
                  </td>
                  <td className="TableHead11" style={thStyle}>
                    <input
                      type="text"
                      className="TableSelectOption11"
                      options={option}
                      placeholder="LPO Reference No"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showPopup && (
            <Popup onClose={handleClosePopup} onSave={handleSaveException} />
          )}
        </div>
      </div>

      {/* Second-Table */}

      <div className="table">
        <div className="table-head">
          <span>Delegated Services</span>
        </div>

        <div className="table-body">
          <table>
            <thead className="secondhead">
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
              {delegateTableRows.map((row, index) => (
                <tr key={index}>
                  <th className="tableslno" style={thStyle}>
                    <span className="firsttableno">{index + 1}</span>
                  </th>
                  <th className="TableHead" style={thStyle}>
                    <Select
                      className="TableSelectOption"
                      options={delegateOptions}
                      placeholder="Delegate Name"
                      onChange={(selectedOption) =>
                        handleTableRowChange(
                          selectedOption,
                          index,
                          "delegateName"
                        )
                      }
                      value={row.delegateName}
                    />
                  </th>
                  <th className="TableHead1" style={thStyle}>
                    {/* Update the input field handling */}
                    <input
                      type="text"
                      className="TableSelectOption1"
                      placeholder="Address"
                      onChange={(event) =>
                        handleTableRowChange(event, index, "address")
                      }
                      value={row.address}
                    />
                  </th>
                  <th className="TableHead2" style={thStyle}>
                    {/* Update the input field handling */}
                    <input
                      type="text"
                      className="TableSelectOption2"
                      placeholder="Email"
                      onChange={(event) =>
                        handleTableRowChange(event, index, "email")
                      }
                      value={row.email}
                    />
                  </th>
                  <th className="TableHead3" style={thStyle}>
                    <Select
                      className="TableSelectOption3"
                      options={option.map((value) => ({ value, label: value }))}
                      placeholder="PickUp"
                      onChange={(selectedOption) =>
                        handleTableRowChange(
                          selectedOption.value,
                          index,
                          "pickup"
                        )
                      }
                      value={row.pickup ? row.pickup.value : null}
                    />
                  </th>
                  <th className="TableHead4" style={thStyle}>
                    <Select
                      className="TableSelectOption4"
                      options={option.map((value) => ({ value, label: value }))}
                      placeholder="Drop"
                      onChange={(selectedOption) =>
                        handleTableRowChange(
                          selectedOption.value,
                          index,
                          "drop"
                        )
                      }
                      value={row.drop ? row.drop.value : null}
                    />
                  </th>
                  <th className="TableHead6" style={thStyle}>
                    <button
                      className="TableSelectOption6"
                      onClick={() =>
                        handleTableRowChange(null, index, "exception")
                      }
                    >
                      Add Exception
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="savebutton">
        <button onClick={handleSaveButtonClick}>Save</button>
        <button>Clear</button>
        <button>Delete</button>
        <button>Close</button>
      </div>
    </div>
  );
};

export default App;
