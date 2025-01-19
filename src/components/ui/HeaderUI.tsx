interface Props {
  children: React.ReactNode;
}

// before:absolute before:-right-[--padding] before:h-full before:w-svw before:bg-black before:content-[''] relative

const HeaderUI = ({ children }: Props) => {
  return (
    <header className="px-paddingMobile md:px-paddingDesktop flex h-2 min-h-14 items-center justify-between bg-black py-8 text-white">
      {children}
    </header>
  );
};
export default HeaderUI;
