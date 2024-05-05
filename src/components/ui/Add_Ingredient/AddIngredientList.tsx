import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  ingredients: {
    ingredient: string;
    amount: string;
  }[];
  removeIngredient(recipe: { ingredient: string; amount: string }): void;
  main: boolean;
}

const IngredientListUI = (props: Props) => {
  return (
    <div>
      <h2 className="">Ingredients:</h2>
      <ul
        id="ingredients"
        className="grid grid-cols-1 gap-4 border-b-2 border-white"
      >
        {props.ingredients.map((ingredient) => {
          return (
            <li
              key={ingredient.ingredient}
              className="relative flex flex-col items-start gap-1 p-2"
            >
              <div className="flex items-center gap-2">
                <p>ingredient</p>
                <p>{ingredient.ingredient}</p>
              </div>
              {!props.main && (
                <div className="flex items-center gap-2">
                  <p>amount</p>
                  <p className="">{ingredient.amount}</p>
                </div>
              )}
              <FontAwesomeIcon
                onClick={() => props.removeIngredient(ingredient)}
                icon={faTrash}
                className="absolute bottom-0 right-0 cursor-pointer p-3"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default IngredientListUI;
