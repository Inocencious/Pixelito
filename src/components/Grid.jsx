import React, { useState, useRef, useEffect } from 'react';
import Tools from './Tools'; 
import CanvasSizePopup from './CanvasSizePopup'; 

const Grid = ({ rows, cols }) => {
  const gridWidth = 480;
  const gridHeight = 480; 
  const displayCellSize = Math.min(gridWidth / cols, gridHeight / rows);
  const logicalCellSize = 1;
  const gridLineWidth = 0.5;

  const [gridColors, setGridColors] = useState(initialGrid());
  const [currentColor, setCurrentColor] = useState('#000000'); 
  const [showGridLines, setShowGridLines] = useState(true); 
  const [isMouseDown, setIsMouseDown] = useState(false); 
  const [recentColors, setRecentColors] = useState(['#ffffff', '#cccccc']); 
  const [selectedTool, setSelectedTool] = useState('paint'); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const displayCanvasRef = useRef(null);
  const logicalCanvasRef = useRef(null);

  function initialGrid() {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 'transparent')
    );
  }

  useEffect(() => {
    const displayCanvas = displayCanvasRef.current;
    const displayCtx = displayCanvas.getContext('2d');
    const logicalCanvas = logicalCanvasRef.current;
    const logicalCtx = logicalCanvas.getContext('2d');

    drawLogicalGrid(logicalCtx);
    drawDisplayGrid(displayCtx);
  }, [gridColors, showGridLines]);

  useEffect(() => {
    setCurrentColor(recentColors[0]);
  }, [recentColors]);

  const drawLogicalGrid = (ctx) => {
    ctx.clearRect(0, 0, cols * logicalCellSize, rows * logicalCellSize);

    gridColors.forEach((rowColors, rowIndex) => {
      rowColors.forEach((color, colIndex) => {
        ctx.fillStyle = color;
        ctx.fillRect(
          colIndex * logicalCellSize,
          rowIndex * logicalCellSize,
          logicalCellSize,
          logicalCellSize
        );
      });
    });
  };

  const drawDisplayGrid = (ctx) => {
    ctx.clearRect(0, 0, cols * displayCellSize, rows * displayCellSize);

    gridColors.forEach((rowColors, rowIndex) => {
      rowColors.forEach((color, colIndex) => {
        ctx.fillStyle = color;
        ctx.fillRect(
          colIndex * displayCellSize,
          rowIndex * displayCellSize,
          displayCellSize,
          displayCellSize
        );
      });
    });

    if (showGridLines) {
      ctx.beginPath();
      ctx.lineWidth = gridLineWidth;
      ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

      for (let i = 0; i <= cols; i++) {
        ctx.moveTo(i * displayCellSize, 0);
        ctx.lineTo(i * displayCellSize, rows * displayCellSize);
      }

      for (let i = 0; i <= rows; i++) {
        ctx.moveTo(0, i * displayCellSize);
        ctx.lineTo(cols * displayCellSize, i * displayCellSize);
      }

      ctx.stroke();
    }
  };

  const handleCanvasClick = (event) => {
    paintCell(event);
  };

  const handleCanvasMouseDown = (event) => {
    setIsMouseDown(true);
    paintCell(event);
  };

  const handleCanvasMouseMove = (event) => {
    if (isMouseDown) {
      paintCell(event);
    }
  };

  const handleCanvasMouseUp = () => {
    setIsMouseDown(false);
  };

  const floodFill = (grid, x, y, targetColor, replacementColor) => {
    if (targetColor === replacementColor) return grid;

    const fillGrid = [...grid];
    const rows = fillGrid.length;
    const cols = fillGrid[0].length;

    const queue = [[x, y]];

    while (queue.length > 0) {
      const [currentX, currentY] = queue.pop();

      if (
        currentX < 0 ||
        currentX >= cols ||
        currentY < 0 ||
        currentY >= rows ||
        fillGrid[currentY][currentX] !== targetColor
      ) {
        continue;
      }

      fillGrid[currentY][currentX] = replacementColor;

      queue.push([currentX + 1, currentY]);
      queue.push([currentX - 1, currentY]);
      queue.push([currentX, currentY + 1]);
      queue.push([currentX, currentY - 1]);
    }

    return fillGrid;
  };

  const paintCell = (event) => {
    const displayCanvas = displayCanvasRef.current;
    const displayCtx = displayCanvas.getContext('2d');
    const logicalCanvas = logicalCanvasRef.current;
    const logicalCtx = logicalCanvas.getContext('2d');
    const rect = displayCanvas.getBoundingClientRect();

    const x = Math.floor((event.clientX - rect.left) / displayCellSize);
    const y = Math.floor((event.clientY - rect.top) / displayCellSize);

    if (x >= 0 && x < cols && y >= 0 && y < rows) {
      if (selectedTool === 'paint') {
        const newGridColors = [...gridColors];
        newGridColors[y][x] = currentColor;
        setGridColors(newGridColors);

        drawLogicalGrid(logicalCtx); 
        drawDisplayGrid(displayCtx); 
      } else if (selectedTool === 'fill') {
        const targetColor = gridColors[y][x];
        const newGridColors = floodFill(gridColors, x, y, targetColor, currentColor);
        setGridColors(newGridColors);

        drawLogicalGrid(logicalCtx); 
        drawDisplayGrid(displayCtx); 
      } else if (selectedTool === 'eraser') {
        const newGridColors = [...gridColors];
        newGridColors[y][x] = 'transparent';
        setGridColors(newGridColors);

        drawLogicalGrid(logicalCtx); 
        drawDisplayGrid(displayCtx); 
      }

      if (currentColor !== 'transparent' && !recentColors.includes(currentColor)) {
        const updatedRecentColors = [currentColor, ...recentColors.slice(0, 7)];
        setRecentColors(updatedRecentColors);
      }
    }
  };

  const handleColorChange = (color) => {
    setCurrentColor(color); 
  };

  const handleSaveImage = () => {
    const logicalCanvas = logicalCanvasRef.current;
    const ctx = logicalCanvas.getContext('2d');

    ctx.clearRect(0, 0, logicalCanvas.width, logicalCanvas.height);

    drawLogicalGrid(ctx);

    const link = document.createElement('a');
    link.href = logicalCanvas.toDataURL('image/png'); 
    link.download = 'pixel_art.png';
    link.click(); 

    drawDisplayGrid(ctx);
  };

  const handleToggleGridLines = () => {
    setShowGridLines((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGridSizeChange = (newRows, newCols) => {
    setRows(newRows);
    setCols(newCols);
    setGridColors(initialGrid());
  };

  return (
    <div>
      <Tools
        currentColor={currentColor}
        handleColorChange={handleColorChange}
        showGridLines={showGridLines}
        toggleGridLines={handleToggleGridLines}
        handleSaveImage={handleSaveImage}
        recentColors={recentColors} 
        selectedTool={selectedTool} 
        setSelectedTool={setSelectedTool} 
      />
      <div className="grid">
        <canvas
          ref={displayCanvasRef}
          width={cols * displayCellSize}
          height={rows * displayCellSize}
          onClick={handleCanvasClick}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          style={{
            border: '1px solid black',
            imageRendering: 'pixelated',
          }}
        />
      </div>

      <canvas
        ref={logicalCanvasRef}
        width={cols * logicalCellSize}
        height={rows * logicalCellSize}
        style={{ display: 'none' }}
      />

      <CanvasSizePopup
        isOpen={isModalOpen}
        closeModal={handleCloseModal}
        handleGridSizeChange={handleGridSizeChange}
        initialSize={cols}
      />
    </div>
  );
};

export default Grid;
