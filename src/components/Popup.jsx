import React, { useState } from "react";
import "./Popup.scss";

const Popup = ({ onClose, onSave }) => {
  const [popup, setPopup] = useState("");

  const handleInputChange = (event) => {
    setPopup(event.target.value);
  };

  const handleSave = () => {
    onSave(popup);
    onClose();
  };
  return (
    <div className="popup">
    
    <div className="popup-content">
    <table>
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Exception In</th>
            <th>Item</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 2</td>
            <td>Data 2</td>             */}
          </tr>
        </tbody>
      </table>
    </div>
      
    <div className="popup-button">
    <button onClick={handleSave}>Ok</button>
    <button onClick={onClose} className="close-btn">Close</button>
    </div>

    </div>
  );
};

export default Popup;
