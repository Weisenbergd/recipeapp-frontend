import { useContext, useEffect, useState } from "react";
import AddIngredient from "./AddIngredient";
import {
  useForm,
  SubmitHandler,
  FieldErrors,
  SubmitErrorHandler,
} from "react-hook-form";
import { GET_S3URL, MUTATE_RECIPE, POST_RECIPE } from "../../graphql/recipes";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";
import InputUI from "../ui/InputUI";
import FormUI from "../ui/FormUI";

//  can probably use useFieldArray for adding ingredients instead
//  of subform and hidden input
type FormValues = {
  name: string;
  summary: string;
  ingredients: {
    ingredient: string;
    amount: string;
  }[];
  time: string;
  tags: string[];
  directions: string;
  image: any;
};

interface PropsEditing {
  id?: string;
  name?: string;
  ingredients?: {
    ingredient?: string;
    amount?: string;
  }[];
  time?: string;
  directions?: string[];
  dietaryTags?: string[];
  summary?: string;
  author?: string;
  image?: any;
}

// props are for editting recipes
const NewRecipeForm = ({ props }: { props: PropsEditing }) => {
  // determine whether editing or creating recipe
  let type: null | string;
  if (props && props.name) type = "editForm";

  // inits
  const { recipeId } = useParams();
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const modalContext = useContext(ModalContext);

  // ingredient state to pass to add ingredients comp
  type StateProperty = {
    ingredient: string;
    amount: string;
  }[];
  const [ingredients, setIngredients] = useState<StateProperty>([]);

  // refactoring to remove the __typename property from the ingredients
  type refactoredIngredients = {
    ingredient: string;
    amount: string;
  }[];

  let refactorIngredients: refactoredIngredients = [];
  useEffect(() => {
    for (let ingredient of ingredients) {
      refactorIngredients.push({
        ingredient: ingredient.ingredient,
        amount: ingredient.amount,
      });
    }
    setValue("ingredients", refactorIngredients);
  }, [ingredients]);

  const [postRecipe] = useMutation(POST_RECIPE);
  const [mutateRecipe] = useMutation(MUTATE_RECIPE);

  // s3url
  const { data, client, error, loading, fetchMore } = useQuery(GET_S3URL, {
    variables: {
      folder: "recipes",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    // refactor tags else passes boolean false

    let imageURL = null;

    console.log("image--------", formData.image);

    if (formData.image[0]) {
      const url = await data.getS3URL.S3URL;

      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "image",
        },
        body: formData.image[0],
      });

      imageURL = url.split("?")[0];
    }

    if (!formData.tags) {
      formData.tags = [];
    }

    // create recipe
    if (!type) {
      const recipe = await postRecipe({
        variables: {
          input: {
            userId: user?.user?._id,
            summary: formData.summary,
            name: formData.name,
            ingredients: formData.ingredients,
            directions: formData.directions,
            time: parseInt(formData.time),
            dietaryTags: formData.tags,
            imageURL,
          },
        },
      });
      navigate(`../${recipe.data.createRecipe._id}`);
    }

    // edit recipe
    if (type) {
      mutateRecipe({
        variables: {
          mutateRecipeInput: {
            _id: recipeId,
            summary: formData.summary,
            name: formData.name,
            ingredients: formData.ingredients,
            directions: formData.directions,
            time: parseInt(formData.time),
            dietaryTags: formData.tags,
            imageURL,
          },
        },
      });
      modalContext?.setModal(!modalContext.modal);
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <FormUI
      onSubmit={handleSubmit(onSubmit)}
      errors={errors}
      buttonText="Submit"
    >
      <InputUI
        name="name"
        label="Name"
        type="input"
        register={register}
        validationSchema={{
          required: "name is required",
          maxLength: {
            value: 50,
            message: "Name is too long (must be less than 50 characters",
          },
        }}
        required={true}
        defaultValue={props.name}
      />

      <InputUI
        name="summary"
        label="Summary"
        type="input"
        register={register}
        validationSchema={{
          required: "summary is required",
          maxLength: {
            value: 100,
            message: "summary is too long (must be less than 100 characters",
          },
        }}
        required={true}
        defaultValue={props.summary}
      />

      <AddIngredient
        editIngredients={props.ingredients || null}
        setIngredients={setIngredients}
      />
      <input
        {...register("ingredients", {
          required: "enter an ingredient",
        })}
        type="hidden"
      />

      <InputUI
        name="directions"
        label="Directions"
        type="textarea"
        register={register}
        validationSchema={{
          required: "directions are required",
          maxLength: {
            value: 1000,
            message:
              "directions are too long (must be less than 1000 characters",
          },
        }}
        required={true}
        defaultValue={props.name}
      />

      <InputUI
        name="time"
        label="Time (minutes)"
        type="number"
        register={register}
        validationSchema={{
          required: "time is required",
        }}
        required={true}
        defaultValue={props.time}
      />

      <div className="relative z-0 h-fit">
        <div className="bg-p relative z-20 grid grid-cols-2 bg-gray-200  py-4 pb-10 pt-16 before:absolute before:inset-1/2 before:-z-10 before:h-full before:w-[120%] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-gray-200 before:content-['']">
          <p className="absolute  left-0 top-6">Tags</p>

          <InputUI
            name="veggie"
            label="veggie"
            type="checkbox"
            reg="tags"
            register={register}
            required={false}
            defaultChecked={
              props.dietaryTags?.find((el) => el === "veggie") ? true : false
            }
          />

          <InputUI
            name="peanuts"
            label="peanuts"
            type="checkbox"
            reg="tags"
            register={register}
            required={false}
            defaultChecked={
              props.dietaryTags?.find((el) => el === "nuts") ? true : false
            }
          />

          <InputUI
            name="vegan"
            label="vegan"
            type="checkbox"
            reg="tags"
            register={register}
            required={false}
            defaultChecked={
              props.dietaryTags?.find((el) => el === "vegan") ? true : false
            }
          />

          <InputUI
            name="keto"
            label="keto"
            type="checkbox"
            reg="tags"
            register={register}
            required={false}
            defaultChecked={
              props.dietaryTags?.find((el) => el === "keto") ? true : false
            }
          />

          <InputUI
            name="protein"
            label="protein"
            type="checkbox"
            reg="tags"
            register={register}
            required={false}
            defaultChecked={
              props.dietaryTags?.find((el) => el === "protein") ? true : false
            }
          />

          <InputUI
            name="fast"
            label="fast"
            type="checkbox"
            reg="tags"
            register={register}
            required={false}
            defaultChecked={
              props.dietaryTags?.find((el) => el === "time") ? true : false
            }
          />

          <InputUI
            name="spicy"
            label="spicy"
            type="checkbox"
            reg="tags"
            register={register}
            required={false}
            defaultChecked={
              props.dietaryTags?.find((el) => el === "spicy") ? true : false
            }
          />
        </div>
      </div>

      <InputUI
        type="file"
        name="image"
        label="Image"
        reg="image"
        register={register}
        required={false}
      />
    </FormUI>
  );
};

export default NewRecipeForm;
