import { gql } from "@apollo/client";

// export const GET_RECIPES = gql`
//   query GetRecipes($offset: Int, $limit: Int) {
//     getRecipes(offset: $offset, limit: $limit) {
//       _id
//       name
//       summary
//       dietaryTags
//       ingredients {
//         ingredient
//       }
//       priority
//       time
//       author {
//         _id
//       }
//     }
//   }
// `;

export const GET_RECIPES = gql`
  query GetFiltered($ingredientList: [String!]!, $offset: Int, $limit: Int) {
    getFiltered(
      ingredientList: $ingredientList
      offset: $offset
      limit: $limit
    ) {
      _id
      name
      summary
      dietaryTags
      ingredients {
        ingredient
      }
      priority
      time
      author {
        _id
        username
      }
      imageURL
    }
  }
`;

export const GET_SINGLE_RECIPE = gql`
  query GetSingleRecipe($recipeId: String) {
    getSingleRecipe(recipeId: $recipeId) {
      _id
      name
      ingredients {
        ingredient
        amount
      }
      time
      directions
      dietaryTags
      summary
      author {
        _id
        username
      }
      imageURL
    }
  }
`;

export const GET_S3URL = gql`
  query GetS3URL($folder: String!) {
    getS3URL(folder: $folder) {
      S3URL
    }
  }
`;

export const POST_RECIPE = gql`
  mutation Mutation($input: CreateRecipeInput) {
    createRecipe(input: $input) {
      _id
      name
      summary
      ingredients {
        ingredient
        amount
      }
      directions
      time
      dietaryTags
      imageURL
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($deleteRecipeId: ID!) {
    deleteRecipe(id: $deleteRecipeId)
  }
`;

export const MUTATE_RECIPE = gql`
  mutation MutateRecipe($mutateRecipeInput: UpdateRecipeInput) {
    mutateRecipe(input: $mutateRecipeInput) {
      _id
      name
      summary
      ingredients {
        ingredient
        amount
      }
      directions
      time
      dietaryTags
    }
  }
`;
