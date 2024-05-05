import {
  ApolloCache,
  DefaultContext,
  FetchMoreQueryOptions,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";
import RecipeLI from "./RecipeLi";
import { useEffect } from "react";

interface Props {
  data: any;
  fetchMore: <
    TFetchData = any,
    TFetchVars extends OperationVariables = OperationVariables,
  >(
    fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData> & {},
  ) => Promise<any>;
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
  loading: any;
}

const RecipeUL = (props: Props) => {
  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      props.loading
    ) {
      return;
    }

    await props.fetchMore({
      variables: {
        offset: props.data.getFiltered.length,
      },
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [props.data.getFiltered]);

  return (
    <>
      <ul
        id="recipeul"
        className=" mb-6 grid  place-items-center gap-6 md:grid-cols-2 2xl:grid-cols-3"
      >
        {props.data.getFiltered.map(
          (
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
            },
            index: number,
          ) => {
            return (
              <RecipeLI
                key={index}
                recipe={recipe}
                deleteRecipe={props.deleteRecipe}
              />
            );
          },
        )}
      </ul>

      {/* <button
        onClick={async () => {
          await props.fetchMore({
            variables: {
              offset: props.data.getFiltered.length,
            },
          });
        }}
        className="border-2 border-solid border-black"
      >
        fetch more
      </button> */}
    </>
  );
};
export default RecipeUL;
