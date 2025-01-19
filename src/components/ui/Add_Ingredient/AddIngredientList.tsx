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
    <div className={clsx("", className)} {...props}>
      <ul id="ingredients" className="flex flex-col gap-2">
        {ingredients.map((ingredient) => {
          return (
            <li
              key={ingredient.ingredient}
              className="flex items-center justify-between px-4 even:bg-slate-100"
            >
              <div className="flex gap-4">
                <p>Ingredient:</p>
                <p>{ingredient.ingredient}</p>
              </div>
              {/* {!main && (
                <div className="">
                  <p>amount</p>
                  <p className="">{ingredient.amount}</p>
                </div>
              )} */}
              <div>
                <FontAwesomeIcon
                  onClick={() => removeIngredient(ingredient)}
                  icon={faTrash}
                  className="cursor-pointer p-3"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default IngredientListUI;
