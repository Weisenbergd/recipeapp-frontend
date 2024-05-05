import AddIngredient from "../components/logic/AddIngredient";
import GetRecipes from "../components/logic/GetRecipes";
import AddIngredientDialog from "../components/ui/Add_Ingredient/AddIngredientDialog";

function Main() {
  // wrapped in form else AddIngredient will be embeded in form elsewhere
  return (
    <>
      <form className="mb-6">
        <AddIngredientDialog>
          <AddIngredient route="MAIN" setIngredients={() => {}} />
        </AddIngredientDialog>
      </form>
      <GetRecipes />
    </>
  );
}

export default Main;
