import React, { useState } from 'react';
import Modal from 'react-modal';

const CanvasSizePopup = ({ isOpen, closeModal, handleGridSizeChange }) => {
  const [sliderValue, setSliderValue] = useState(16);
  const handleSliderChange = (event) => {
    const newSize = parseInt(event.target.value);
    setSliderValue(newSize);
  };

  const handleSubmit = () => {
    handleGridSizeChange(sliderValue, sliderValue);
    closeModal();
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '325px',
      height: 'fit-content',
      paddingTop: '0',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <h1 style={{margin: '20px 0'}}>Pixelito</h1>
      <div>
        <label style={{ padding: '0 7px', }}htmlFor="gridSizeSlider">Select Grid Size:</label>
        <input
          type="range"
          id="gridSizeSlider"
          name="gridSizeSlider"
          min="8"
          max="64"
          step="8"
          value={sliderValue}
          onChange={handleSliderChange}
        />
        <span style={{ padding: '0 10px', }}>{sliderValue}x{sliderValue}</span>
      </div>
      <button onClick={handleSubmit} style={{ marginTop: '10px' }}>Apply</button>
    </Modal>
  );
};

export default CanvasSizePopup;
