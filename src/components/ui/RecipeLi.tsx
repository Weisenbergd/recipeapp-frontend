import { useContext, useEffect, useState } from "react";
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
  const [isImageValid, setIsImageValid] = useState(false);
  // const [fallbackImage, setFallbackImage] = useState(
  //   "/path/to/placeholder.jpg",
  // )

  useEffect(() => {
    const checkImage = async () => {
      try {
        const response = await fetch(props.recipe.imageURL, { method: "HEAD" });

        // Check if the response is a valid image and has non-zero size
        const contentType = response.headers.get("Content-Type");
        const contentLength = response.headers.get("Content-Length");

        if (
          contentType &&
          contentType.startsWith("image") &&
          contentLength &&
          parseInt(contentLength) > 0
        ) {
          setIsImageValid(true);
        } else {
          setIsImageValid(false);
        }
      } catch (error) {
        setIsImageValid(false); // Handle error or invalid URL
      }
    };

    if (props.recipe.imageURL) {
      checkImage();
    }
  }, [props.recipe.imageURL]);

  // const user = useContext(AuthContext);
  return (
    // <li className="relative max-h-64 w-[full] overflow-hidden rounded-lg border  shadow-md duration-300 md:hover:size-full md:hover:-translate-y-2 md:hover:scale-110 md:hover:shadow-2xl">
    //   <Card className="">
    <li className="w-full">
      <Link to={props.recipe._id}>
        <div
          className="relative flex h-fit min-h-64 
                      w-[clamp(0px,100vw,fit)] max-w-[32rem] 
                      items-stretch gap-3 overflow-hidden 
                      rounded-2xl border shadow-md transition-transform duration-300 
                      hover:-translate-y-2 hover:scale-[1.02] sm:hover:shadow-lg 
                      md:w-[32rem] md:hover:scale-105 md:hover:shadow-xl lg:w-full"
        >
          {/* Image Section */}
          <div className="h-64 w-3/5 flex-shrink-0 bg-gray-200">
            {props.recipe.imageURL && isImageValid && (
              <img
                crossOrigin="anonymous"
                className="h-full w-full rounded-l-2xl object-cover"
                src={
                  isImageValid
                    ? props.recipe.imageURL
                    : `/food/food${Math.floor(Math.random() * 8) + 1}.webp`
                }
                alt="Recipe"
              />
            )}
          </div>

          {/* Text Section */}
          <div className="flex w-2/5 flex-1 flex-col gap-1 pt-6 md:gap-2">
            <h3 className="text-xl font-bold">{props.recipe.name}</h3>
            <p className="line-clamp-2 h-fit border-b-2 pb-1 text-sm">
              {props.recipe.summary}
            </p>

            {/* Ingredients List */}
            <ul className="flex h-fit flex-wrap items-center gap-1 overflow-hidden text-sm md:text-sm">
              {props.recipe.ingredients
                .slice(0, 4)
                .map((ingredient, i, arr) => (
                  <li
                    key={ingredient.ingredient + i}
                    className={` ${i < arr.length - 1 ? "after:ml-1 after:content-['•']" : i === 3 ? "after:content-['...']" : "after:content-['']"}`}
                  >
                    {ingredient.ingredient}
                  </li>
                ))}
            </ul>

            {/* Dietary Tags */}
            {props.recipe.dietaryTags && (
              <ul className="flex flex-wrap gap-1">
                {props.recipe.dietaryTags.map((tag) => (
                  <li
                    key={tag}
                    className={`rounded-full bg-gray-200 p-0.5 px-1 text-xs bg-${tag}`}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            {/* Recipe Time */}
            <p className="absolute right-4 top-2 text-sm font-medium text-gray-700">
              {props.recipe.time}
            </p>
          </div>
        </div>
      </Link>
    </li>
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
