import { FieldErrors } from "react-hook-form";

type FormValues = {
  name: string;
  summary: string;
  ingredients: {
    ingredient: string;
    amount: string;
  }[];
  time: number;
  tags: string[];
  directions: string;

  username: string;
  password: string;
};

interface Props {
  errors: FieldErrors<FormValues>;
}

const FormErrors = (props: Props) => {
  return (
    <ul>
      {props.errors.name && <li>{props.errors.name.message}</li>}
      {props.errors.summary && <li>{props.errors.summary.message}</li>}
      {props.errors.ingredients && <li>{props.errors.ingredients.message}</li>}
      {props.errors.directions && <li>{props.errors.directions.message}</li>}
      {props.errors.time && <li>{props.errors.time.message}</li>}
      {props.errors.username && <li>{props.errors.username.message}</li>}
      {props.errors.password && <li>{props.errors.password.message}</li>}
    </ul>
  );
};
export default FormErrors;
