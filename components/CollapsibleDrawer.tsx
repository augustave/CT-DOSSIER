import React, { useState } from 'react';

interface CollapsibleDrawerProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

export const CollapsibleDrawer: React.FC<CollapsibleDrawerProps> = ({ title, children, defaultOpen = false, icon }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-current/20 pb-4">
            <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                className="flex items-center gap-3 w-full text-left font-mono text-xs uppercase tracking-widest font-bold opacity-secondary hover:opacity-primary transition-opacity group/drawer"
            >
                {icon}
                <span className="group-hover/drawer:underline underline-offset-4">{title}</span>
                <span className="ml-auto opacity-50">{isOpen ? '[-]' : '[+]'}</span>
            </button>
            <div className={`transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                {children}
            </div>
        </div>
    );
};
