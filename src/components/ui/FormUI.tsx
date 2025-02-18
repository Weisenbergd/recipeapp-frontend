import Button from "./FormButton";
import { FieldErrors } from "react-hook-form";
import FormErrors from "./FormErrors";
import { ApolloError } from "@apollo/client";
import Error from "./Error";

type FormValues = {
  username: string;
  password: string;
};

interface Props {
  children: React.ReactNode;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
  errors: FieldErrors<FormValues>;
  error?: ApolloError | undefined;
  buttonText: string;
}

const FormUI = (props: Props) => {
  return (
    <div className="mx-auto w-full overflow-x-hidden px-2 md:w-[600px]">
      <form
        className="mx-auto mt-16 flex w-full max-w-4xl flex-col gap-4"
        onSubmit={props.onSubmit}
      >
        {props.children}
        <Button>{props.buttonText}</Button>
      </form>
      {/* {Object.keys(props.errors).length > 0 && (
        <FormErrors errors={props.errors} />
      )} */}

      {/* Apollo errors */}
      <Error error={props.error} />
    </div>
  );
};
export default FormUI;
