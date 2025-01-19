import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import Modal from "../ui/Modal";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import HeaderUI from "../ui/HeaderUI";

const Header = () => {
  const user = useContext(AuthContext);
  const modal = useContext(ModalContext);

  function logout() {
    user?.setUser({ _id: "", username: "" });
    localStorage.removeItem("token");
  }

  const [x, setX] = useState(false);

  const handleClick = () => {
    setX(true);
    modal?.setModal(true);
  };

  //update user when token changes
  useEffect(() => {
    user?.setUser({ username: user.user?.username, _id: user.user?._id });
  }, [localStorage.getItem("token")]);

  // so that modal doesn't open when other modal opens
  useEffect(() => {
    if (!modal?.modal) {
      setX(false);
    }
  }, [modal]);

  return (
    <HeaderUI>
      <>
        <div>
          <p className="text-3xl font-bold text-green-600">
            <span className="text-orange-500">
              <Link to="/">Recipe </Link>
            </span>
            Viewer
          </p>
        </div>

        <div className="z-20 flex gap-4 ">
          {!user?.user?.username ? (
            <button onClick={handleClick}>log in</button>
          ) : (
            <p>{user?.user.username}</p>
          )}
          {x && modal?.modal && (
            <Modal>
              <LoginForm />
            </Modal>
          )}
          {user?.user?.username && <button onClick={logout}>logout</button>}
          {user?.user?.username && (
            <Link className="z-20" to="/new">
              new
            </Link>
          )}
        </div>
      </>
    </HeaderUI>
  );
};
export default Header;
