import {
  ApolloCache,
  DefaultContext,
  FetchMoreQueryOptions,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";
import RecipeLI from "./RecipeLi";
import { useCallback, useEffect } from "react";

type Props = {
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
  loading: boolean;
};

const RecipeUL = ({ data, fetchMore, deleteRecipe, loading }: Props) => {
  const handleFetch = useCallback(async () => {
    const noScrollbar =
      document.documentElement.scrollHeight <= window.innerHeight;

    const nearBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 100; // Buffer for triggering near the bottom

    if ((noScrollbar || nearBottom) && !loading) {
      await fetchMore({
        variables: {
          offset: data.getFiltered.length,
        },
      });
    }
  }, [data.getFiltered.length, loading, fetchMore]);

  useEffect(() => {
    // Trigger an initial fetch if there's no scrollbar
    const noScrollbar =
      document.documentElement.scrollHeight <= window.innerHeight;

    if (noScrollbar && !loading) {
      handleFetch();
    }

    // Debounced event handler
    let timer: any = null;

    const handleEvent = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        handleFetch();
      }, 100); // Debounce interval (100ms)
    };

    window.addEventListener("scroll", handleEvent);
    window.addEventListener("resize", handleEvent);

    return () => {
      window.removeEventListener("scroll", handleEvent);
      window.removeEventListener("resize", handleEvent);
    };
  }, [handleFetch, loading]);

  return (
    <ul
      id=""
      className="mx-auto grid w-fit place-items-center gap-6 lg:w-full lg:grid-cols-2 2xl:grid-cols-3"
    >
      {data.getFiltered.map(
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
            <RecipeLI key={index} recipe={recipe} deleteRecipe={deleteRecipe} />
          );
        },
      )}
    </ul>
  );
};
export default RecipeUL;
