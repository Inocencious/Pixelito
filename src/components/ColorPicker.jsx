import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ currentColor, handleColorChange, recentColors }) => {
  const [color, setColor] = useState(currentColor);

  const handleChange = (updatedColor) => {
    setColor(updatedColor.hex);
    handleColorChange(updatedColor.hex); 

    if (updatedColor.hex !== 'transparent' && !recentColors.includes(updatedColor.hex)) {
      const updatedRecentColors = [updatedColor.hex, ...recentColors.slice(0, 5)];
      handleRecentColors(updatedRecentColors); 
    }
  };

  return (
    <SketchPicker
      color={color}
      onChange={handleChange}
      disableAlpha={true}
      presetColors={recentColors}
    />
  );
};

export default ColorPicker;
