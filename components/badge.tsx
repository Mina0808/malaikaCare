import React from 'react';

export type BadgeProps = {
  text: string;
  size?: 'small' | 'medium' | 'large';
  color?: 'green' | 'red' | 'blue' |'sky-blue'|'dark-blue' |'light-green'|'brown'|'dark-green'|'gray'| 'yellow' | 'light-gray';
};

export function Badge({ text, size = 'medium', color = 'green' }: BadgeProps) {
  let sizeClass = '';
  switch (size) {
    case 'small':
      sizeClass = 'px-1.5 py-0.5 text-xs';
      break;
    case 'medium':
      sizeClass = 'px-2 py-1 text-xl';
      break;
    case 'large':
      sizeClass = 'px-3 py-1.5 text-2xl';
      break;
  }

  let colorClass = '';
  switch (color) {
    case 'sky-blue':
      colorClass = 'text-sky-blue-500 bg-sky-blue-100 ring-skyblue-500/20';
      break;
    case 'dark-blue':
      colorClass = 'bg-blue-100 text-blue-800 ring-green-800/20';
      break;
    case 'light-gray':
      colorClass = 'bg-gray-100 text-gray-500 ring-gray-500/20';
      break;
    case 'red':
      colorClass = 'bg-red-100 text-red-600 ring-red-600/20';
      break;
    case 'yellow':
      colorClass = 'bg-yellow-100 text-yellow-600 ring-yellow-600/20';
      break;
    case 'light-green':
      colorClass = 'bg-green-100 text-green-500 ring-green-500/20';
      break;
    case 'green':
      colorClass = 'bg-green-100 text-green-600 ring-green-600/20';
      break;
    case 'blue':
      colorClass = 'bg-blue-100 text-blue-600 ring-blue-600/20';
      break;
    case 'brown':
      colorClass = 'bg-amber-100 text-amber-900 ring-green-900/20';
      break;
    case 'gray':
      colorClass = 'bg-gray-100 text-gray-800 ring-gray-800/20';
      break;
    case 'dark-green':
      colorClass = 'bg-green-100 text-green-800 ring-green-800/20';
      break;

  }

  return (
    <span className={`inline-flex items-center rounded-md ${sizeClass} font-medium ring-1 ring-inset ${colorClass}`}>
      {text}
    </span>
  );
}
