import { Dispatch, MouseEventHandler, SetStateAction } from "react";

export type CustomButtonProps = {
  title: string;
  containerStyles?: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
};

export type CustomFilterProps = {
  title: string;
};

export type SearchManufacturerProps = {
  manufacturer: string;
  setManufacturer: Dispatch<SetStateAction<string>>;
};