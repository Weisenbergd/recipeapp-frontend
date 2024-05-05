interface Props {
  children: React.ReactNode;
  className: string;
}

const Card = (props: Props) => {
  return (
    <div
      className={`relative h-full overflow-hidden rounded-lg bg-white p-4 ${props.className}`}
    >
      {props.children}
    </div>
  );
};
export default Card;
