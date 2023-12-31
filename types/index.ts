import { Dispatch, MouseEventHandler, SetStateAction } from "react";

export type CustomButtonProps = {
  title: string;
  containerStyles?: string;
  textStyles?: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
};

export type CustomFilterProps = {
  title: string;
  options: OptionProps[];
  setFilter: React.Dispatch<SetStateAction<Object>>;
};

export type SearchBarProps = {
  setSearch: () => void;
}

export type OptionProps = {
  title: string;
  value: string;
}

export type SearchManufacturerProps = {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

export type CarProps = {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
};

export type CarDetailsProps = {
  isOpen: boolean;
  closeModal: () => void
  car: CarProps
}

export type FilterProps = {
  manufacturer: string;
  year: number;
  fuel: string;
  limit: number;
  model: string;
}

export type ShowMoreProps = {
  pageNumber: number;
  isNext: boolean;
  setLimit: React.Dispatch<SetStateAction<Object>>;
};