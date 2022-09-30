import { InputHTMLAttributes, FC } from "react";
import { InputLabel, Input, Group } from "./form-input.styles";

type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <InputLabel shrink={Boolean(otherProps.value)}>{label}</InputLabel>
      )}
    </Group>
  );
};

export default FormInput;
