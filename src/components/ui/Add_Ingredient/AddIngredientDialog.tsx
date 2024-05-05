import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const AddIngredientDialog = (props: Props) => {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div>
      <button
        className="after:content-['_↗']"
        onClick={() => setOpenFilter(!openFilter)}
        type="button"
      >
        {openFilter ? "ingredient filter" : "ingredient filter"}
      </button>
      <div
        // can't transition on h-0 or h-fit -- workaround using grid that wraps a single child
        className={`grid ${openFilter ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} transition-[grid-template-rows] delay-200 ease-out`}
      >
        <div className="overflow-hidden">{props.children}</div>
      </div>
    </div>
  );
};
export default AddIngredientDialog;
