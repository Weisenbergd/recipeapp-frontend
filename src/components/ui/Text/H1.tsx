interface Props {
  children: React.ReactNode;
}

const H1 = (props: Props) => {
  return <h1 className="text-4xl">{props.children}</h1>;
};
export default H1;
