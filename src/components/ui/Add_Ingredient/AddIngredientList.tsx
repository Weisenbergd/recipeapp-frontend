import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { HTMLAttributes } from "react";

type Props = {
  ingredients: {
    ingredient: string;
    amount: string;
  }[];
  removeIngredient(recipe: { ingredient: string; amount: string }): void;
  main: boolean;
} & HTMLAttributes<HTMLDivElement>;

const IngredientListUI = ({
  ingredients,
  removeIngredient,
  main,
  className,
  ...props
}: Props) => {
  return (
    <div className={clsx("pt-2", className)} {...props}>
      <ul id="ingredients" className="flex flex-col  border border-gray-400">
        {ingredients.map((ingredient) => {
          return (
            <li
              key={ingredient.ingredient}
              className="flex items-center gap-3 border-b border-gray-400 px-2 py-2 even:bg-slate-100"
            >
              <div className="self-end">
                <FontAwesomeIcon
                  onClick={() => removeIngredient(ingredient)}
                  icon={faTrash}
                  className="cursor-pointer p-2"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex gap-4">
                  {/* <p>Ingredient:</p> */}
                  <p className="font-bold">{ingredient.ingredient}</p>
                </div>
                {!main && (
                  <div className="">
                    {/* <p>amount</p> */}
                    <p className="font-serif text-sm font-light">
                      {ingredient.amount}
                    </p>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default IngredientListUI;
