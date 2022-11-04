import React from "react";

export default function InputForm({
  accept,
  handleOnChange,
  name,
  type,
  text,
  placeholder,
  styleText,
}) {
  return (
    <div
      className="flex items-center gap-3 mb-3 w-full
    "
    >
      <label
        htmlFor={name}
        className={
          "text-gray font-semibold w-[120px] md:w-[130px] text-sm " + styleText
        }
      >
        {text}
      </label>
      <input
        type={type}
        name={name}
        className="bg-gray/10 border border-solid border-gray/10 rounded-sm px-3 py-1  w-full"
        onChange={handleOnChange}
        placeholder={placeholder}
        accept={accept}
      />
    </div>
  );
}
