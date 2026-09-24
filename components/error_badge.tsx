import { InformationCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';

export type BadgeProps = {
  text: string;
  size?: 'small' | 'medium' | 'large';
};

export function ErrorBadge({ text, size = 'medium' }: BadgeProps) {
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

  let colorClass = 'bg-red-100 text-red-600 ring-red-600/20';

  return (
    <span className={` border border-l-20 border-l-red-400 inline-flex items-center rounded-md ${sizeClass} font-medium ring-1 ring-inset ${colorClass}`}>
      <div className="flex flex-row">
        <div className='flex items-center'><InformationCircleIcon className="w-5 h-5 flex-shrink-0" /></div>
        <div className='ml-2'>{text}</div>
      </div>
      
    </span>
  );
}
