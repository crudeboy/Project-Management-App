import React, { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Logo from "../../Assets/logo.svg";
import ErrorMessage from "../Signup/errorMessage";
import { authContext } from "../../Utils/Authcontext";
import CustomRedirect from "../../Utils/CustomRedirect";
import { Link } from "react-router-dom";

function Login() {
  console.log("rendering login page");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, token } = useContext(authContext);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Email and Password are required");
      return;
    }
    setLoading(true);

    interface AxiosInterface {
      email: string;
      password: string;
      token?: string;
    }
    await axios
      .request<AxiosInterface>({
        url: "https://kojjac.herokuapp.com/users/login",
        data: {
          email,
          password,
        },
        method: "post",
        withCredentials: true,
      })
      .then(async (response) => {
        console.log("Success:", response);
        const tokenFromServer = response.data.token;
        signIn(tokenFromServer);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };

  return token ? (
    <CustomRedirect />
  ) : (
    <Wrapper>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <div className="login">
        <img className="logo" src={Logo} alt="Login" />
        <BorderBottom />
        <form onSubmit={submitHandler}>
          <label>
            <h3>Email Address</h3>
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
          </label>

          <label>
            <h3> Password</h3>
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              // required
            />
          </label>
          <Button disabled={loading}>
            {" "}
            {loading ? "logging in...." : "Login"}{" "}
          </Button>
        </form>
        <Link to="/forgetpassword" style={{ color: "blue" }}>
          Forget password?
        </Link>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      </div>

      <SSOWrapper>
        <a href="https://kojjac.herokuapp.com/users/google">
          <GoogleButton>Use Google Account</GoogleButton>
        </a>
        <a href="https://kojjac.herokuapp.com/users/auth/facebook/callback">
          <FacebookButton>Use Facebook Account</FacebookButton>
        </a>
      </SSOWrapper>
    </Wrapper>
  );
}

export const SSOWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GoogleButton = styled.button`
  width: 255px;
  height: 50px;
  border: none;
  border-radius: 25px;
  margin: 20px 25px;
  font-family: Heebo;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  background-color: var(--color-green);
  cursor: pointer;
`;
export const FacebookButton = styled.button`
  width: 255px;
  height: 50px;
  border: none;
  border-radius: 25px;
  margin: 20px 25px;
  font-family: Heebo;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  background-color: var(--color-green);
  cursor: pointer;
`;

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--deepGrey-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login {
    background-color: var(--white-background);
    width: 505px;
    height: 692px;
    padding: 20px;
  }
`;
export const BorderBottom = styled.div`
  margin: 40px 0px;
  border-bottom: 1px solid #ececec; ;
`;
export const Input = styled.input`
  background: var(--lightGrey-background);
  border-radius: 8px;
  display: block;
  width: 445px;
  height: 50px;
  border: none;
  margin: 10px 0;
  font-size: 20px;
  font-style: bold;
  padding: 25px;
`;

export const Button = styled.button`
  width: 444px;
  height: 50px;
  background-color: var(--color-green);
  border: none;
  border-radius: 25px;
  margin: 20px 0;
  font-family: Heebo;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  cursor: pointer;
`;

export default Login;
