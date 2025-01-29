import AddIngredient from "../components/logic/AddIngredient";
import GetRecipes from "../components/logic/GetRecipes";
import AddIngredientDialog from "../components/ui/Add_Ingredient/AddIngredientDialog";

function Main() {
  // wrapped in form else AddIngredient will be embeded in form elsewhere
  return (
    <div className=" px-3">
      <form className="mb-6">
        <AddIngredientDialog className="">
          <AddIngredient route="MAIN" setIngredients={() => {}} />
        </AddIngredientDialog>
      </form>
      <GetRecipes />
    </div>
  );
}

export default Main;
