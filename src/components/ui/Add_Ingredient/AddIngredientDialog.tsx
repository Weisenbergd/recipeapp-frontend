import clsx from "clsx";
import { HTMLAttributes, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const AddIngredientDialog = ({ children, className, ...rest }: Props) => {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className={clsx("pb-6 pt-6 text-xl", className)} {...rest}>
      <button
        className="p-2"
        onClick={() => setOpenFilter(!openFilter)}
        type="button"
      >
        {openFilter ? "Ingredient Filter" : "Ingredient Filter"}
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
