import './App.css';
import CanvasSizePopup from './components/CanvasSizePopup';
import Grid from './components/Grid';
import Tools from './components/Tools';
import React, { useState } from 'react';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [rows, setRows] = useState(null); 
  const [cols, setCols] = useState(null); 

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleGridSizeChange = (newRows, newCols) => {
    setRows(newRows);
    setCols(newCols);
    closeModal(); 
  };

  return (
    <>
      {modalIsOpen && (
        <CanvasSizePopup isOpen={modalIsOpen} closeModal={closeModal} handleGridSizeChange={handleGridSizeChange} />
      )}
      {!modalIsOpen && rows && cols && (
        <>
          <h1 className='title'>Pixelito</h1>
          <Tools />
          <Grid rows={rows} cols={cols} /> {}
        </>
      )}
    </>
  );
}

export default App;
