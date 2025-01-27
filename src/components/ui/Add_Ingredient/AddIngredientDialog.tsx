import clsx from "clsx";
import { HTMLAttributes, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const AddIngredientDialog = ({ children, className, ...rest }: Props) => {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div
      className={clsx("mx-auto max-w-[32rem] pt-6 text-xl", className)}
      {...rest}
    >
      <button
        className="p-2 text-blue-900"
        onClick={() => setOpenFilter(!openFilter)}
        type="button"
      >
        {openFilter ? "Hide" : "Filter Ingredients"}
      </button>
      <div
        // can't transition on h-0 or h-fit -- workaround using grid that wraps a single child
        className={`grid ${openFilter ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} transition-[grid-template-rows] delay-200`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};
export default AddIngredientDialog;
