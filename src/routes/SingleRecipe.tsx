import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_RECIPE,
  GET_SINGLE_RECIPE,
  MUTATE_RECIPE,
} from "../graphql/recipes";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ModalContext } from "../context/ModalContext";
import Modal from "../components/ui/Modal";
import NewRecipeForm from "../components/logic/NewEditRecipeForm";

const SingleRecipe = () => {
  const [isImageValid, setIsImageValid] = useState(false);
  const params = useParams();

  const user = useContext(AuthContext);
  const modal = useContext(ModalContext);

  useEffect(() => {
    if (!modal?.modal) {
      setForm(false);
    }
  }, [modal]);

  const [form, setForm] = useState(false);

  const [mutateRecipe] = useMutation(MUTATE_RECIPE, {
    onError: (error) => console.log(error),
  });

  const { data, loading, refetch } = useQuery(GET_SINGLE_RECIPE, {
    variables: {
      recipeId: params.recipeId,
    },
    skip: !params.recipeId,
  });

  useEffect(() => {
    if (loading === false && data?.getSingleRecipe.imageURL) {
      const checkImage = async () => {
        try {
          const response = await fetch(data.getSingleRecipe.imageURL, {
            method: "HEAD",
          });

          const contentType = response.headers.get("Content-Type");
          const contentLength = response.headers.get("Content-Length");

          if (
            contentType?.startsWith("image") &&
            contentLength &&
            parseInt(contentLength) > 0
          ) {
            setIsImageValid(true);
          } else {
            setIsImageValid(false);
          }
        } catch (error) {
          setIsImageValid(false);
        }
      };

      checkImage();
    }
  }, [loading, data?.getSingleRecipe.imageURL]);

  const handleDeleteRecipe = async () => {
    if (imageURL) {
      try {
        // Send a DELETE request to your backend to remove the image from S3
        const response = await fetch(imageURL, {
          method: "DELETE",
        });

        if (!response.ok)
          throw new Error(`Image deletion failed: ${response.statusText}`);

        console.log("Image deleted successfully from S3");
      } catch (error) {
        console.error("Error deleting image:", error);
        return; // Stop execution if image deletion fails
      }
    }

    // Proceed to delete the recipe if image deletion is successful or there was no image
    deleteRecipe({ variables: { deleteRecipeId: _id } });
  };

  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    onError: (error) => console.log(error),
    onCompleted: async () => {
      console.log("Recipe deleted");
      window.location.href = `/${_id}`;
    },
  });

  if (loading) return <p className="mt-[10rem]">loading...</p>;

  if (!data || data === null)
    return <p className="mt-[10rem]">recipe does not exist</p>;

  const {
    _id,
    name,
    ingredients,
    time,
    directions,
    dietaryTags,
    summary,
    author,
    imageURL,
  } = data.getSingleRecipe;

  return (
    <>
      <div className="flex flex-col gap-2 p-6">
        <h1 className="text-4xl font-semibold">{name}</h1>
        <div className="mb-2">
          <p className="font-thin">{summary}</p>
          <p>by: {author.username}</p>
        </div>

        {dietaryTags && (
          <ul className="flex gap-3">
            {dietaryTags.map((tag: string) => (
              <li key={tag} className={`bg-${tag} rounded-md p-1 `}>
                {tag}
              </li>
            ))}
          </ul>
        )}

        {imageURL && isImageValid && (
          <div className="w-fit overflow-hidden rounded-lg bg-red-50">
            <img
              className="w-full object-scale-down md:max-h-[22rem] md:max-w-[44rem]"
              src={imageURL}
              crossOrigin="anonymous"
            />
          </div>
        )}

        <div>
          <h2>Ingredients:</h2>
          <ul>
            {ingredients.map(
              ({
                ingredient,
                amount,
              }: {
                ingredient: string;
                amount: string;
              }) => {
                return (
                  <li className="flex gap-2" key={ingredient + amount}>
                    <p className="after:ml-2 after:content-['-']">
                      {ingredient}
                    </p>
                    <p>{amount}</p>
                  </li>
                );
              },
            )}
          </ul>
        </div>
        <div className="whitespace-pre-wrap">
          <h2>Directions:</h2>
          <p>{directions}</p>
        </div>
        {user?.user?._id === author._id && (
          <div className="mt-4 flex w-full flex-col gap-2 bg-red-50 p-4 md:w-[34rem]">
            <p>{user?.user?.username} options:</p>
            <div className="flex w-fit flex-col items-start gap-2 text-blue-900">
              <button
                onClick={() => {
                  modal?.setModal(!modal.modal);
                  setForm(!form);
                }}
              >
                edit recipe
              </button>
              <button
                onClick={() => {
                  deleteRecipe({ variables: { deleteRecipeId: _id } });
                }}
              >
                delete recipe
              </button>
              <div>
                <p className="text-black">for testing, imageURL:</p>
                <a href={imageURL}>{imageURL}</a>
              </div>
            </div>
            {!isImageValid && imageURL && (
              <div className="border-t border-black py-2">
                <p>There is an image URL but the image has a size of 0</p>
                <p>url: </p>
                <a className="text-blue-900" href={imageURL}>
                  {imageURL}
                </a>
                <p>consider replacing</p>
              </div>
            )}
          </div>
        )}
      </div>

      {modal?.modal && form && (
        <Modal>
          <NewRecipeForm
            props={{
              id: _id,
              name,
              ingredients,
              time,
              directions,
              dietaryTags,
              summary,
              author,
            }}
          />
        </Modal>
      )}
    </>
  );
};
export default SingleRecipe;
