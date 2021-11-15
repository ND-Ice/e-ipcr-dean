import { Button } from "react-bootstrap";
import { useFormikContext } from "formik";

export default function SubmitButton(props) {
  const { title, ...otherProps } = props;
  const { handleSubmit } = useFormikContext();

  return (
    <Button onClick={handleSubmit} {...otherProps}>
      {title}
    </Button>
  );
}
