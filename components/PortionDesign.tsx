import { cn } from '@/lib/utils';
import React from 'react'




const PortionDesign = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("p-1 md:p-3 rounded-lg shadow-xl", className)}>{children}</div>
  );
};

export default PortionDesign;
