import clsx from "clsx";
import { HTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Card = ({ children, className }: Props) => {
  return <div className={clsx(``, className)}>{children}</div>;
};
export default Card;
