import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import IngredientListUI from "../ui/Add_Ingredient/AddIngredientList";
import AddIngredientUI from "../ui/Add_Ingredient/AddIngredientUI";

////////////////
// contains add ingredients "form" and list of added ingredients
// differences depending if main passed in as prop (for main route)
///////////////

interface Props {
  route?: string;
  setIngredients: Function;
  editIngredients?: any;
}

const AddIngredient = (props: Props) => {
  const route = props.route;
  const setParentIngredients = props.setIngredients;
  const [addError, setAddError] = useState<string>();

  const [ingredients, setIngredients] = useState<
    {
      ingredient: string;
      amount: string;
    }[]
  >([]);

  // filling in the form for editing ingredients
  useEffect(() => {
    if (props.editIngredients) {
      setIngredients(props.editIngredients);

      // for parent state/post
      setParentIngredients(props.editIngredients);
    }
  }, []);

  if (!route) {
    if (!setParentIngredients) {
      throw Error("props required");
    }
  }

  // if accessing from main route or new recipe route
  let main = false;
  if (route === "MAIN") {
    main = true;
  }

  const [searchParams, setSearchParams] = useSearchParams("ingredients=");

  // to focus ingredient input after adding ingredient
  const ref = useRef<HTMLInputElement>(null);

  // sets search params when adding ingredients on main route
  useEffect(() => {
    let search: string[] = [];
    main &&
      ingredients.map((ingredient) => {
        search.push(ingredient.ingredient);
      });
    setSearchParams(`ingredients=${search}`);
  }, [setSearchParams, ingredients, main]);

  // "form" event for adding ingredients
  function formAction(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const ingredient = document.getElementById(
      "ingredient",
    ) as HTMLInputElement;
    let amount = document.getElementById("amount") as HTMLInputElement;

    if (!ingredient?.value) throw Error("ingredient cant be empty");
    if (!main && !amount?.value) throw Error("amounts cant be empty");
    if (main) amount = {} as any;
    if (main) amount.value = "null";

    const currentIngredientsList = ingredients.map((ingredient) => {
      return ingredient.ingredient;
    });

    if (currentIngredientsList.includes(ingredient.value)) {
      setAddError("ingredient already added");
      throw Error("ingredient already added");
    }

    setAddError("");
    // for local state/list
    setIngredients([
      ...ingredients,
      {
        ingredient: ingredient.value,
        amount: amount.value,
      },
    ]);

    // for parent state/post
    setParentIngredients([
      ...ingredients,
      {
        ingredient: ingredient.value,
        amount: amount.value,
      },
    ]);

    ingredient.value = "";
    amount.value = "";
    ref.current?.focus();
  }

  // delete ingredient form list and state
  function removeIngredient(recipe: { ingredient: string; amount: string }) {
    const update = ingredients.filter((filter) => {
      return filter !== recipe;
    });

    setIngredients(update);
    setParentIngredients(update);
  }

  return (
    <div className="relative z-0 h-fit">
      <div className="relative z-20  bg-gray-200 py-4 pb-10 before:absolute before:inset-1/2 before:-z-10 before:h-full before:w-[120%] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-gray-200 before:content-['']">
        <AddIngredientUI
          main={main}
          addError={addError}
          formAction={formAction}
        />
        {ingredients.length > 0 && (
          <IngredientListUI
            ingredients={ingredients}
            removeIngredient={removeIngredient}
            main={main}
          />
        )}
      </div>
    </div>
  );
};
export default AddIngredient;
