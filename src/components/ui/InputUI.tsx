import { UseFormRegister } from "react-hook-form";

interface InputUIProps {
  name: string;
  label: string;
  required: boolean;
  type: string;
  placeholder?: string;

  defaultValue?: string | number;
  defaultChecked?: boolean;
  // reg for registering checkboxes as tags
  reg?: string;

  // required only for react-hook-form usage
  register?: any;
  validationSchema?: {
    required: string;
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: { value: number; message: string };
  };
}

const InputUI = ({
  name,
  label,
  register,
  required,
  type,
  validationSchema,
  defaultValue,
  defaultChecked,
  reg,
  placeholder,
}: InputUIProps): any => {
  // so that inputs can still be used outside react-hook-form
  if (!register) {
    register = () => {};
  }

  return (
    <div className="relative">
      {type != "textarea" && type != "file" && (
        <input
          className="peer w-auto bg-slate-100 placeholder-transparent"
          id={name}
          name={name}
          type={type}
          {...register(reg ? reg : name, validationSchema, {
            valueAsNumber: type === "number" ? true : false,
          })}
          required={required}
          defaultValue={defaultValue}
          defaultChecked={defaultChecked}
          value={reg ? name : undefined}
          placeholder={label}
        />
      )}

      {type === "textarea" && (
        <textarea
          className="fix peer w-auto resize-none"
          wrap="hard"
          id={name}
          name={name}
          {...register(name)}
          required={required}
          defaultValue={defaultValue}
        />
      )}

      {type === "file" && (
        <input
          id={name}
          name={name}
          {...register(name)}
          required={required}
          type={type}
        />
      )}

      <label
        className={`${type != "checkbox" ? "absolute -top-6 left-0 text-sm text-gray-400 transition-all peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm" : ""} `}
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
};
export default InputUI;
