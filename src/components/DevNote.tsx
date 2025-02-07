import clsx from "clsx";
import { useState } from "react";

export default function DevNote() {
  const [show, setShow] = useState(true);

  clsx;

  return (
    <div
      className={clsx(
        `right-0 top-0 w-fit bg-gray-300`,
        show ? "relative" : "absolute",
      )}
    >
      {show && (
        <div>
          <p>login with:</p>
          <p>un: drew123</p>
          <p>pw: drew123</p>
          <p>or make own un and pw -- no verifications</p>
          <p>initial fetch and refetch count kept low for testing</p>
          <p>no pages, auto fetch when theres space</p>
          <p>might need to lower viewport width to see effect</p>
        </div>
      )}
      <button className="bg-green-300" onClick={() => setShow(!show)}>
        {show ? "hide" : "devnote"}
      </button>
    </div>
  );
}
