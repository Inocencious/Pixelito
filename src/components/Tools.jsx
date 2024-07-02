import React, { useState } from "react";
import ColorPicker from "./ColorPicker";

const Tools = ({
  currentColor,
  handleColorChange,
  toggleGridLines,
  handleSaveImage,
  recentColors,
  selectedTool,
  setSelectedTool,
  showGridLines,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <div className="tools">
      <ul>
        <li>
          <a onClick={togglePicker}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z" />
            </svg>
          </a>
        </li>
        <li>
          <a className={`tool-button ${selectedTool === 'paint' ? 'active' : ''}`} onClick={() => setSelectedTool('paint')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M339.3 367.1c27.3-3.9 51.9-19.4 67.2-42.9L568.2 74.1c12.6-19.5 9.4-45.3-7.6-61.2S517.7-4.4 499.1 9.6L262.4 187.2c-24 18-38.2 46.1-38.4 76.1L339.3 367.1zm-19.6 25.4l-116-104.4C143.9 290.3 96 339.6 96 400c0 3.9 .2 7.8 .6 11.6C98.4 429.1 86.4 448 68.8 448H64c-17.7 0-32 14.3-32 32s14.3 32 32 32H208c61.9 0 112-50.1 112-112c0-2.5-.1-5-.2-7.5z"/></svg>
          </a>
        </li>
        <li>
          <a className={`tool-button ${selectedTool === 'fill' ? 'active' : ''}`} onClick={() => setSelectedTool('fill')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6H386.7l42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>
          </a>
        </li>
        <li>
          <a className={`tool-button ${selectedTool === 'eraser' ? 'active' : ''}`} onClick={() => setSelectedTool('eraser')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z"/></svg>
          </a>
        </li>
        <li>
          <a className={`tool-button ${showGridLines ? 'active' : ''}`} onClick={toggleGridLines}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M32 480a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0-384a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM320 416a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0-320a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm0 128a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM224 480a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm0-448a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM416 416a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0-384a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM32 96a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM416 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM32 288a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm192 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm192 64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM32 320a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM416 192a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM32 128a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm192 64a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"/></svg>
          </a>
        </li>
        <li>
          <a onClick={handleSaveImage}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
          </a>
        </li>
      </ul>
      {showPicker && (
        <div className="color-picker">
          <ColorPicker
            currentColor={currentColor}
            handleColorChange={handleColorChange}
            recentColors={recentColors}
          />
        </div>
      )}
    </div>
  );
};

export default Tools;
