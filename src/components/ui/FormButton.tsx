import clsx from "clsx";
import { HTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
  formAction?(e: React.MouseEvent<HTMLButtonElement>): void;
} & HTMLAttributes<HTMLButtonElement>;

const Button = ({ children, formAction, className }: Props) => {
  return (
    <button
      className={clsx(
        `h-fit w-fit rounded-md bg-black p-3 text-white`,
        className,
      )}
      onClick={formAction}
    >
      {children}
    </button>
  );
};
export default Button;
