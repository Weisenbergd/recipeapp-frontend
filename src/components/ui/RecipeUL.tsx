import {
  ApolloCache,
  DefaultContext,
  FetchMoreQueryOptions,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";
import RecipeLI from "./RecipeLi";
import { useCallback, useEffect, useRef, useState } from "react";

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
  isFetchingMore: boolean;
  setIsFetchingMore: React.Dispatch<React.SetStateAction<boolean>>;
};

const RecipeUL = ({
  data,
  fetchMore,
  deleteRecipe,
  loading,
  isFetchingMore,
  setIsFetchingMore,
}: Props) => {
  const initialized = useRef(false);
  const [offSet, setOffSet] = useState(data.getFiltered.recipes.length);
  const hasFetched = useRef(false); // Track if the fetch has already been triggered

  async function fetchAgain() {
    // Only fetch if not already triggered
    if (hasFetched.current) return; // Prevent multiple triggers

    hasFetched.current = true; // Set flag to true when the fetch starts

    await fetchMore({
      variables: {
        offset: data.getFiltered.recipes.length,
      },
    });

    console.log("Fetch completed.");
    hasFetched.current = false; // Reset flag after fetching is complete
  }

  useEffect(() => {
    // Check if we're at the bottom of the page on initial load

    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      console.log("At the bottom of the page");
      fetchAgain();
    }

    // Scroll event listener
    const handleScroll = () => {
      console.log(
        window.scrollY + 500,
        window.innerHeight,
        document.documentElement.scrollHeight,
      );

      if (
        window.scrollY + 500 + window.innerHeight >=
        document.documentElement.scrollHeight
      ) {
        fetchAgain(); // Call fetchAgain only when at the bottom of the page
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data.getFiltered.recipes.length]);

  return (
    <div>
      <ul
        id=""
        className="mx-auto grid place-items-center gap-6  lg:w-full lg:grid-cols-2 2xl:grid-cols-3"
      >
        {data.getFiltered.recipes.map(
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
                deleteRecipe={deleteRecipe}
              />
            );
          },
        )}
      </ul>

      {data.getFiltered.recipes.length === data.getFiltered.totalCount && (
        <div className="mt-5 bg-gray-100 p-8">
          <p>thats all!</p>
          <p>testing:</p>
          <p>totalCount on Screen {data.getFiltered.recipes.length}</p>
          <p>totalCount in Query: {data.getFiltered.totalCount}</p>
        </div>
      )}

      {/* <button
        onClick={() => {
          fetchAgain();
          setOffSet((prevState: number) => prevState + 1);
        }}
      >
        fetch more...
      </button> */}
    </div>
  );
};
export default RecipeUL;
