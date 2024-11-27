import React from "react";

type ToggleButtonProps = {
  isToggled: boolean;
  onToggle: () => void;
  labelOn: string;
  labelOff: string;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isToggled,
  onToggle,
  labelOn,
  labelOff,
}) => {
  return (
    <button
      onClick={onToggle}
      className="text-white text-sm transition-colors hover:bg-gray-800 bg-black rounded px-3 py-1"
    >
      {isToggled ? labelOn : labelOff}
    </button>
  );
};

export default ToggleButton;
