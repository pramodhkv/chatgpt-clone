import React, { ElementType } from "react";

interface IDisplayInfoProps {
  header: string;
  listItems: string[];
  icon: ElementType;
}

const DisplayInfo = (props: IDisplayInfoProps) => {
  const { header, listItems, icon } = props;
  const IconComponent = icon;

  return (
    <div className="DisplayInfo">
      <div className="flex flex-col items-center justify-center mb-5">
        <IconComponent className="h-8 w-8" />

        <h2>{header}</h2>
      </div>
      <div className="space-y-2">
        {listItems.map((text, index) => (
          <p className="info-text" key={`text-item-${index}`}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DisplayInfo;
