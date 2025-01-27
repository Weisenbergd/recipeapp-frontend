import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/users";
import { AuthContext } from "../../context/AuthContext";
import FormErrors from "../ui/FormErrors";
import InputUI from "../ui/InputUI";
import Button from "../ui/FormButton";
import Error from "../ui/Error";
import FormUI from "../ui/FormUI";

type FormValues = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const modal = useContext(ModalContext);
  const userContext = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const user = await login({
      variables: {
        loginInput: {
          username: formData.username,
          password: formData.password,
        },
      },
    });

    userContext?.setUser(user.data.login.username);
    localStorage.setItem("token", `Bearer ${user.data.login.token}`);
    modal?.setModal(false);
  };

  const [login, { data, error }] = useMutation(LOGIN);

  if (error) console.log("error", error.message);
  if (data) console.log("data", data);

  return (
    <div className="mx-auto flex flex-col">
      <FormUI
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        error={error}
        buttonText="Login"
      >
        <div className="flex flex-col gap-4">
          <InputUI
            name="username"
            label="username"
            required={true}
            type="input"
            register={register}
          />
          <InputUI
            name="password"
            label="password"
            required={true}
            type="input"
            register={register}
          />
        </div>
      </FormUI>

      <Link
        onClick={() => modal?.setModal(!modal.modal)}
        to="/signup"
        className="mt-2 self-end text-blue-900"
      >
        New user? Signup &rarr;
      </Link>
    </div>
  );
};
export default LoginForm;
