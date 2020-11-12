const hexToRgb = hexColor => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const isColorLight = color => {
  const brightness = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;
  return brightness > 0.5;
};

const getFontColorForBackground = backgroundColor => {
  const color = hexToRgb(backgroundColor);
  return isColorLight(color) ? '#000000' : '#FFFFFF';
};

export default getFontColorForBackground;
