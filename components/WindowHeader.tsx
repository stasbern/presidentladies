import '../app/globals.css'
import React, { useState, useEffect } from 'react';

const colorClasses = [
  '#3490dc',
  '#6574cd',
  '#9561e2',
  '#f66d9b',
  '#f6993f'
];

interface WindowHeader {
  title: string;
  children: (props: { bgColor: string }) => React.ReactNode;
}

export const WindowHeader: React.FC<WindowHeader> = ({ title, children }) => {
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    setBgColor(colorClasses[Math.floor(Math.random() * colorClasses.length)]);
  }, []);

  return (
    <div style={{ borderColor: bgColor, marginTop: '1.25rem', padding: '0.25rem' }}>
      <div style={{ backgroundColor: bgColor, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'black', marginLeft: '0.5rem', fontSize: '1.25rem' }}>{title}</h1>
        <h1 style={{ color: 'black', marginRight: '0.25rem', fontSize: '1.25rem'}}>_ x</h1>
      </div>
      {children({ bgColor })}
    </div>
  );
};