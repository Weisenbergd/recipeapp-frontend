interface Props {
  children: React.ReactNode;
  formAction?(e: React.MouseEvent<HTMLButtonElement>): void;
}

const Button = (props: Props) => {
  return (
    <button
      className="h-fit w-fit bg-black p-1.5 text-white"
      onClick={props.formAction}
    >
      {props.children}
    </button>
  );
};
export default Button;
