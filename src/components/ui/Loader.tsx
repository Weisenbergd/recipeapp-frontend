import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed left-0 top-[60px] z-[9999] flex h-[calc(100vh-60px)] w-full items-center justify-center bg-white/80 backdrop-blur-md">
      <motion.div
        className="h-1 w-full bg-blue-500"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </div>
  );
};

export default Loader;
