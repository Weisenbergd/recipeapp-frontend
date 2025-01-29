import clsx from "clsx";
import { HTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

type InputUIProps = {
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
} & HTMLAttributes<HTMLInputElement>;

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
  className,
}: InputUIProps): any => {
  // todo -- why am i returning any here
  // so that inputs can still be used outside react-hook-form
  if (!register) {
    register = () => {};
  }

  //"bg-bl peer relative flex  w-full border border-gray-400 p-1 placeholder-transparent"

  return (
    <div
      className={clsx(
        "flex gap-1",
        type != "checkbox" ? "flex-col" : "flex-row gap-2 border bg-white p-4",
      )}
    >
      <label htmlFor={name}>{label}</label>
      {type != "textarea" && type != "checkbox" && type != "file" && (
        <input
          className={clsx("border border-gray-600 p-1", className)}
          id={name}
          name={name}
          type={type}
          {...register(reg ? reg : name, validationSchema, {
            valueAsNumber: type === "number" ? true : false,
          })}
          required={required}
          defaultValue={defaultValue}
          min={0}
          // defaultChecked={defaultChecked}
          // value={reg ? name : undefined}
        />
      )}
      {type === "textarea" && (
        <textarea
          className={clsx(
            " peer h-40 max-h-96  w-auto border border-gray-600 ",
            className,
          )}
          wrap="hard"
          id={name}
          name={name}
          {...register(name)}
          required={required}
          defaultValue={defaultValue}
        />
      )}
      {type === "checkbox" && (
        <input
          name={name}
          id={name}
          {...register("dietaryTags")}
          className={clsx("-order-1", className)}
          type={type}
          required={false}
          defaultChecked={defaultChecked}
          value={name}
        />
      )}
      {type === "file" && (
        <input
          className={clsx(
            "bg-bl peer relative flex  w-full border border-gray-400 p-1 placeholder-transparent",
            className,
          )}
          id={name}
          name={name}
          {...register(name)}
          required={required}
          type={type}
          accept={name === "image" ? "image/*" : "*"}
          validationSchema={{
            validate: (fileList: FileList | undefined) => {
              if (!fileList || fileList.length === 0) return true; // Not required, so allow empty
              const file = fileList[0];
              if (!file.type.startsWith("image/"))
                return "Only image files are allowed";
              if (file.size > 2 * 1024 * 1024)
                return "File size must be less than 2MB"; // Optional: Size limit
              return true;
            },
          }}
        />
      )}
    </div>
  );
};
export default InputUI;

{
  /* <label
className={`${type != "checkbox" && type != "file" && "absolute left-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-[.5rem] peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:left-0 peer-focus:text-sm peer-focus:text-black"} `}
htmlFor={name}
>
{label}
</label> */
}
