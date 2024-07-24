import React, { useState, useEffect } from 'react';

// Define color classes for the outline inspired by the American flag: red, white, and blue
const outlineColorClasses = [
  '#b22234', // Red (similar to the American flag red)
  '#ffffff', // White
  '#3c3b6e', // Blue (similar to the American flag blue)
];

// Fixed background color
const fixedBgColor = '#1a2b3c'; // Dark blue for background

interface WindowHeaderProps {
  title: string;
  children: (props: { bgColor: string }) => React.ReactNode;
}

export const WindowHeader: React.FC<WindowHeaderProps> = ({ title, children }) => {
  const [borderColor, setBorderColor] = useState('');

  useEffect(() => {
    // Set a random border color from the outlineColorClasses array
    setBorderColor(outlineColorClasses[Math.floor(Math.random() * outlineColorClasses.length)]);
  }, []);

  // Text color remains consistent for readability
  const textColor = '#ffffff';

  return (
    <div className="border-2 mt-5 overflow-hidden" style={{ borderColor: borderColor }}>
      <div className="flex justify-between items-center px-2 py-1" style={{ backgroundColor: fixedBgColor }}>
        <h1 className="font-medium" style={{ color: textColor }}>{title}</h1>
        <div className="flex space-x-1">
        </div>
      </div>
      {children({ bgColor: fixedBgColor })}
    </div>
  );
};
