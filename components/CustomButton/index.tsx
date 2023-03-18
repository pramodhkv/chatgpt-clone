import React, { ElementType, MouseEvent, ReactElement, ReactNode } from "react";

interface ICustomButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  icon: ElementType;
  text: string;
  className?: string;
}

const CustomButton = (props: ICustomButtonProps) => {
  const { onClick, icon, text, className = "justify-center" } = props;

  const IconComponent = icon;

  return (
    <button className="CustomButton" onClick={onClick}>
      <div className={`flex space-x-2 items-center w-full ${className}`}>
        <IconComponent className="h-6 w-6" />
        <span>{text}</span>
      </div>
    </button>
  );
};

export default CustomButton;
