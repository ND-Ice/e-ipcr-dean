import {
  DatePicker,
  Password,
  SubmitButton,
  TextInput,
  Select,
  RadioButtons,
  ConditionalRadio,
} from ".";

export default function FormControl(props) {
  const { variant, ...otherProps } = props;

  if (variant === "input") return <TextInput {...otherProps} />;
  if (variant === "multiline")
    return <TextInput as="textarea" {...otherProps} />;
  else if (variant === "button") return <SubmitButton {...otherProps} />;
  else if (variant === "password") return <Password {...otherProps} />;
  else if (variant === "date") return <DatePicker {...otherProps} />;
  else if (variant === "select") return <Select {...otherProps} />;
  else if (variant === "radio") return <RadioButtons {...otherProps} />;
  else if (variant === "conditionalRadio")
    return <ConditionalRadio {...otherProps} />;
  else return null;
}
