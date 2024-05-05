import NewRecipeForm from "../components/logic/NewEditRecipeForm";

const PostRecipe = () => {
  // passing in 'x' because ts complains when working with null
  return (
    <>
      <NewRecipeForm props={{ id: "x" }} />
    </>
  );
};
export default PostRecipe;
