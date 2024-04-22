import React, { ChangeEvent } from "react";

type CheckboxType = {
  name: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
};

const Checkbox: React.FC<CheckboxType> = ({
  name,
  label,
  onChange,
  checked,
  disabled,
}) => {
  const onCheckBoxChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.checked);
  };

  return (
    <>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onCheckBoxChangeHandle}
        disabled={disabled}
      />
      <span>{label}</span>
    </>
  );
};

export default Checkbox;
