import { useMutation, useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import {
  DELETE_RECIPE,
  MUTATE_RECIPE,
  GET_RECIPES,
} from "../../graphql/recipes";
import React, { StrictMode, useEffect, useRef } from "react";

import RecipeUL from "../ui/RecipeUL";
import { limit } from "../../vars";

const GetRecipes = () => {
  const initialRender = useRef(1);
  const [params, setParams] = useSearchParams();
  let ingredientList = params.getAll("ingredients");

  // to do: persist ingredient if back button pressed
  // remember scroll location
  // don't resetStore if same ingredients

  const { data, client, error, loading, fetchMore } = useQuery(GET_RECIPES, {
    variables: {
      ingredientList,
      offset: 0,
      limit: 4,
    },
  });

  // !important -- using any here.
  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    onError: (error) => console.log(error),
    update(cache, { data }) {
      const { getFiltered } = cache.readQuery<any>({
        query: GET_RECIPES,
        variables: {
          ingredientList,
          offset: 0,
          limit,
        },
      });
      cache.writeQuery({
        query: GET_RECIPES,
        variables: {
          ingredientList,
          offset: 0,
          limit,
        },
        data: {
          getFiltered: getFiltered.filter(
            (recipe: any) => recipe._id !== data.deleteRecipe,
          ),
        },
      });
    },
  });

  const [mutateRecipe] = useMutation(MUTATE_RECIPE, {
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    // value of 3 because strict mode renders twice
    if (initialRender.current < 3) {
      console.log("this only appears on first load");
      if (import.meta.env.DEV) {
        initialRender.current++;
      } else {
        initialRender.current = initialRender.current + 2;
      }
      return;
    }

    const test = async () => {
      console.log("this appears after inital load");
      ingredientList = params.getAll("ingredients");
      await client.refetchQueries({ include: [GET_RECIPES] });
    };
    if (initialRender.current >= 3) test();
  }, [params]);

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <RecipeUL
      loading={loading}
      data={data}
      fetchMore={fetchMore}
      deleteRecipe={deleteRecipe}
    />
  );
};
export default GetRecipes;
