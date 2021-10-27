import { authContext } from "../../Utils/Authcontext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Signup/Spinner";
import { useHistory } from "react-router";

function TestHome() {
  console.log("rendering testHome");
  const backendUrl = process.env.REACT_APP_BACKEND_URL as string;
  const { token, signOut } = useContext(authContext);
  const [loading, setLoading] = useState(true);
  const [serverResponse, setResponse] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .request<{ msg: string }>({
        url: backendUrl + "/users/welcome",
        headers: {
          token: token as string,
        },
        method: "GET",
      })
      .then((response) => {
        console.log(response);
        setResponse(response.data.msg);

        setLoading(false);
      })
      .catch((e) => {
        setResponse(e.response.data.msg);
        setLoading(false);
        if (e.response.status === 401) {
          history.push("/login");
        }
      });
  }, []);

  const handleSignOut = () => {
    signOut();
    history.push("/login");
  };

  return loading ? (
    <h4>Loading... </h4>
  ) : (
    <div>
      <h4>{serverResponse}</h4>
      <button onClick={handleSignOut}>SignOut </button>
    </div>
  );
}

export default TestHome;
