"use client";

import React from "react";

interface SpriteIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  color?: string;
}

const SpriteIcon: React.FC<SpriteIconProps> = ({ name, color, ...props }) => {
  return (
    <svg {...props} fill={color ?? "currentColor"}>
      <use href={`/icons/symbol-defs.svg#${name}`} />
    </svg>
  );
};

export default SpriteIcon;
