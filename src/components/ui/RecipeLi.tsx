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
    <li className="h-full w-full">
      <Card className="">
        <Link className="flex gap-2" to={props.recipe._id}>
          <div className="-my-4 -ml-4 w-2/5">
            <img
              src={props.recipe.imageURL || "../../../public/cake.jpg"}
              className="size-full object-cover"
            />
          </div>
          <div className="flex  flex-col gap-2 pl-2">
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

        {/* {user?.user?._id === props.recipe.author._id && (
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
        )} */}
      </Card>
    </li>
  );
};
export default RecipeLI;
