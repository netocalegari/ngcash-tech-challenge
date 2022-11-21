import { useNavigate } from "react-router-dom";
import { Head } from "./styles";

function Header() {
  const navigate = useNavigate();

  function logOut() {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <Head>
      <div className="title-holder">
        <h1>NG.Cash</h1>
      </div>

      <div className="button-holder">
        <button onClick={logOut}>Logout</button>
      </div>
    </Head>
  )
};

export default Header;