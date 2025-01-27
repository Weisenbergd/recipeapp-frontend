import { useMutation, useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import {
  DELETE_RECIPE,
  MUTATE_RECIPE,
  GET_RECIPES,
} from "../../graphql/recipes";
import { useEffect, useRef, useState } from "react";

import RecipeUL from "../ui/RecipeUL";
import { limit } from "../../vars";

const GetRecipes = () => {
  const initialRender = useRef(0);
  const [params, setParams] = useSearchParams();
  let ingredientList = params.getAll("ingredients");

  // to do: persist ingredient if back button pressed
  // remember scroll location
  // don't resetStore if same ingredients

  const { data, client, error, loading, fetchMore, refetch } = useQuery(
    GET_RECIPES,
    {
      variables: {
        ingredientList,
        offset: 0,
        limit,
      },
      fetchPolicy: "network-only",
    },
  );

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
    if (initialRender.current >= 2) {
      refetch();
    }
    initialRender.current++;
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
