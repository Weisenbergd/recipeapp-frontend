import { useMutation, useQuery } from "@apollo/client";
import { GET_SINGLE_RECIPE, MUTATE_RECIPE } from "../graphql/recipes";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ModalContext } from "../context/ModalContext";
import Modal from "../components/ui/Modal";
import NewRecipeForm from "../components/logic/NewEditRecipeForm";
import Button from "../components/ui/FormButton";
import H1 from "../components/ui/Text/H1";
import Subtitle from "../components/ui/Text/Subtitle";

const SingleRecipe = () => {
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

  const { data, loading } = useQuery(GET_SINGLE_RECIPE, {
    variables: {
      recipeId: params.recipeId,
    },
  });

  if (loading) return <p>loading...</p>;

  const {
    id,
    name,
    ingredients,
    time,
    directions,
    dietaryTags,
    summary,
    author,
  } = data.getSingleRecipe;

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="self-center text-4xl font-semibold">{name}</h1>
        <div className="mb-2">
          <p className="font-thin">{summary}</p>
          <p>by: {author.username}</p>
        </div>
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
                  <p className="after:ml-2 after:content-['-']">{ingredient}</p>
                  <p>{amount}</p>
                </li>
              );
            },
          )}
        </ul>
      </div>
      <div>
        <ul className="mt-2">
          {directions.map((direction: string) => {
            return <li key={direction}>{direction}</li>;
          })}
        </ul>
      </div>
      {user?.user?._id === author._id && (
        <div>
          <button
            onClick={() => {
              modal?.setModal(!modal.modal);
              setForm(!form);
            }}
          >
            edit recipe
          </button>
        </div>
      )}

      {modal?.modal && form && (
        <Modal>
          <NewRecipeForm
            props={{
              id,
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
