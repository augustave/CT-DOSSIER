import React from 'react';
import { motion } from 'framer-motion';
import { useContainerCenter } from '../hooks/useContainerCenter';

export const AnimatedGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { ref, center } = useContainerCenter();
    
    return (
        <div ref={ref} className="relative w-full h-full">
            {center ? (
                <motion.div
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                   {children}
                </motion.div>
            ) : (
                <div className="invisible">{children}</div>
            )}
        </div>
    );
};
