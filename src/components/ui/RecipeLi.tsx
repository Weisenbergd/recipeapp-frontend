import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";
import Card from "./Card";

interface Props {
  recipe: {
    _id: string;
    name: string;
    ingredients: {
      ingredient: string;
      amount: string;
    }[];
    time: number;
    dietaryTags: string[];
    summary: string;
    author: {
      _id: string;
      username: string;
    };
    imageURL: string;
  };
  deleteRecipe: (
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined,
  ) => Promise<any>;
}

const RecipeLI = (props: Props) => {
  const user = useContext(AuthContext);
  return (
    // <li className="relative max-h-64 w-[full] overflow-hidden rounded-lg border  shadow-md duration-300 md:hover:size-full md:hover:-translate-y-2 md:hover:scale-110 md:hover:shadow-2xl">
    //   <Card className="">
    <Link
      className="relative flex w-[clamp(0px,100vw,25rem)] items-stretch gap-4 rounded-lg border shadow-md duration-300 hover:-translate-y-2 hover:scale-[1.02]  sm:hover:shadow-lg md:w-[30rem] md:hover:scale-105 md:hover:shadow-xl lg:w-[25rem]"
      to={props.recipe._id}
    >
      {/* Image */}
      <div className=" w-3/5">
        <img
          className="h-full w-full rounded-md object-cover"
          src={props.recipe.imageURL || "../../../public/cake.jpg"}
        />
      </div>

      {/* Text Area */}
      <div className="flex h-fit w-2/5 flex-col gap-2 py-2 md:py-6">
        <h3 className="text-xl font-bold">{props.recipe.name}</h3>
        <p className="mb-1 line-clamp-3 min-h-[3.7rem] border-b-2 pb-1 text-sm">
          {props.recipe.summary}
        </p>
        <ul className="flex h-12 flex-wrap gap-1 overflow-hidden">
          {props.recipe.ingredients.map((ingredient, i) => {
            return (
              <li
                className="text-sm after:ml-1 after:content-['•'] last:after:content-[] "
                key={ingredient.ingredient + i}
              >
                {ingredient.ingredient}
              </li>
            );
          })}
        </ul>

        <p className="absolute right-4 top-2">{props.recipe.time}</p>
        {props.recipe.dietaryTags && (
          <ul className="flex h-12 flex-wrap gap-1.5">
            {props.recipe.dietaryTags.map((tag) => {
              return (
                <li key={tag} className="text-sm">
                  {tag}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Link>
    //   </Card>
    // </li>
  );
};
export default RecipeLI;

{
  /* {user?.user?._id === props.recipe.author._id && (
          <div>
            <button
              onClick={() => {
                props.deleteRecipe({
                  variables: {
                    deleteRecipeId: props.recipe._id,
                  },
                });
              }}
            >
              trashcan
            </button>
          </div>
        )} */
}
