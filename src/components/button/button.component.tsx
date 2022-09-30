import { ButtonHTMLAttributes, FC } from "react";

import {
  BaseButton,
  GoogleSignIn,
  Inverted,
  ButtonSpinner,
} from "./button.styles";

export enum BUTTON_TYPES_CLASSES {
  base = "base",
  google = "google",
  inverted = "inverted",
}

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base): typeof BaseButton =>
  ({
    [BUTTON_TYPES_CLASSES.base]: BaseButton,
    [BUTTON_TYPES_CLASSES.google]: GoogleSignIn,
    [BUTTON_TYPES_CLASSES.inverted]: Inverted,
  }[buttonType]);

export type ButtonProps = {
  buttonType?: BUTTON_TYPES_CLASSES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  isLoading,
  ...otherProps
}) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
