import Button from "../FormButton";
import InputUI from "../InputUI";

type Props = {
  main: boolean;
  addError: string | undefined;
  formAction(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
};

const AddIngredientUI = (props: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-8">
        <InputUI
          label="ingredient"
          name="ingredient"
          required={false}
          type="input"
          placeholder="test"
        />
        {!props.main && (
          <InputUI
            label="add amount"
            name="amount"
            required={false}
            type="input"
          />
        )}
        {props.addError && <p>{props.addError}</p>}
      </div>
      <Button formAction={props.formAction}>Add Ingredient</Button>
    </div>
  );
};
export default AddIngredientUI;
