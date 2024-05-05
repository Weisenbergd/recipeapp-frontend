interface Props {
  children: React.ReactNode;
}

const HeaderUI = (props: Props) => {
  return (
    <div className="relative mb-6 flex h-2 min-h-14 items-center justify-between text-white before:absolute before:-right-[--padding] before:h-full before:w-svw before:bg-black before:content-['']">
      {props.children}
    </div>
  );
};
export default HeaderUI;
