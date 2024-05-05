interface Props {
  children: React.ReactNode;
}

const Subtitle = (props: Props) => {
  return <p>{props.children}</p>;
};
export default Subtitle;
