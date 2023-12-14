import React, { useState } from 'react'
import './Popup.scss'

const Popup = ({ onClose, onSave}) => {
    const [popup, setPopup] = useState('')

    const handleInputChange = (event)=>{
        setPopup(event.target.value)
    }   
    
    const handleSave = () =>{
        onSave(popup)
        onClose()
    }
  return (
    <div className="popup">
      <div className="popup-content">
        <span onClick={onClose} className="close-btn">
          &times;
        </span>
        <label htmlFor="exceptionInput">Exception:</label>
        <input
          type="text"
          id="exceptionInput"
          value={popup}
          onChange={handleInputChange}
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}

export default Popup