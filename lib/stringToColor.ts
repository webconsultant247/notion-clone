const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  const color = "#" + "00000".substring(0, 6 - c.length) + c;

  // Calculate the brightness of the color
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Determine the text color based on the brightness
  const textColor = brightness > 125 ? "#000000" : "#FFFFFF";

  return { backgroundColor: color, textColor: textColor };
};

export default stringToColor;
