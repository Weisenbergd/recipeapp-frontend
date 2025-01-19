import Button from "../FormButton";
import InputUI from "../InputUI";

type Props = {
  main: boolean;
  addError: string | undefined;
  formAction(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
};

const AddIngredientUI = ({ main, addError, formAction }: Props) => {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex flex-col gap-2">
        <InputUI
          label="Ingredient"
          name="ingredient"
          required={false}
          type="input"
          placeholder="test"
        />
        {!main && (
          <InputUI label="Amount" name="amount" required={false} type="input" />
        )}
        {addError && <p>{addError}</p>}
      </div>
      <Button className="w-full" formAction={formAction}>
        Add Ingredient
      </Button>
    </div>
  );
};
export default AddIngredientUI;
