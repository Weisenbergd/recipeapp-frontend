import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { POST_USER } from "../../graphql/users";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../ui/Modal";
import { ModalContext } from "../../context/ModalContext";
import InputUI from "../ui/InputUI";
import { Link, useNavigate } from "react-router-dom";
import FormUI from "../ui/FormUI";

type FormValues = {
  username: string;
  password: string;
};

const SignupForm = () => {
  const modal = useContext(ModalContext);
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const newUserPost = await createUser({
      variables: {
        createUserInput: {
          username: formData.username,
          password: formData.password,
        },
      },
    });
    if (!newUserPost.data.createUser) {
      console.log("user already exists");
    } else {
      user?.setUser(newUserPost.data.createUser.username);
      const token = newUserPost.data.createUser.token;
      localStorage.setItem("token", `Bearer ${token}`);
      navigate("/");
    }
  };

  const [createUser, { data, error, reset }] = useMutation(POST_USER, {
    errorPolicy: "all",
  });

  // old code -- error in modal
  // useEffect(() => {
  //   if (error) {
  //     modal?.setModal(true);
  //   }
  // }, [error]);

  // if (modal?.modal && error)
  //   return (
  //     <Modal reset={reset}>
  //       <Error error={error} />
  //     </Modal>
  //   );

  // message if user already logged in
  if (user?.user?.username)
    return (
      <Modal reset={reset}>
        <>
          <p>already logged in</p>
          <Link to="/">test</Link>
        </>
      </Modal>
    );

  return (
    <FormUI
      onSubmit={handleSubmit(onSubmit)}
      errors={errors}
      error={error}
      buttonText="Signup"
    >
      <InputUI
        type="input"
        name="username"
        label="username"
        register={register}
        validationSchema={{
          required: "username is required",
          minLength: {
            value: 6,
            message: "username must be at least 6 characters",
          },
        }}
        required={true}
      />
      <InputUI
        type="input"
        name="password"
        label="password"
        register={register}
        validationSchema={{
          required: "password is required",
          minLength: {
            value: 6,
            message: "password must be at least 6 characters",
          },
        }}
        required={true}
      />
    </FormUI>
  );
};
export default SignupForm;
