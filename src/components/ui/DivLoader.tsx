import React from "react";

interface Props {
  size?: string; // Size of the spinner (default: 'w-8 h-8')
  position?: string; // Positioning of the spinner (default: 'absolute inset-0')
  bgColor?: string; // Background color (default: 'bg-gray-100')
}

const DivLoader: React.FC<Props> = ({
  size = "w-8 h-8",
  position = "absolute inset-0",
  bgColor = "bg-gray-100",
}) => {
  return (
    <div className={`flex items-center justify-center ${position} ${bgColor}`}>
      <div
        className={`border-b-2 border-t-2 border-blue-500 ${size} animate-spin rounded-full`}
      />
    </div>
  );
};

export default DivLoader;
