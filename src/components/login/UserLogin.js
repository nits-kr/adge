import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Correct import for navigation
import Swal from "sweetalert2";
import { useUserLoginMutation } from "../../services/Post";

function UserLogin() {
  const [loginData, res] = useUserLoginMutation();
  console.log("login data", loginData);
  console.log("response", res);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (res.isSuccess) {
      Swal.fire({
        title: "Login Successful!",
        icon: "success",
        text: "You have successfully logged in.",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/adge/home");
        }
      });
    }
  }, [res, navigate]);

  // const handleSaveChanges = (e) => {
  //   e.preventDefault();
  //   setUserNameError("");
  //   setPasswordError("");
  //   if (userName.trim() === "") {
  //     setUserNameError("Username is required.");
  //     return;
  //   }

  //   if (password.trim() === "") {
  //     setPasswordError("Password is required.");
  //     return;
  //   }
  //   const newAddress = {
  //     userName: userName,
  //     password: password,
  //   };
  //   loginData(newAddress);
  // };
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setUserNameError("");
    setPasswordError("");

    if (userName.trim() === "") {
      setUserNameError("Username is required.");
      return;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required.");
      return;
    }

    try {
      const response = await loginData({
        userName: userName,
        password: password,
      });
      console.log("response login", response);
      if (response?.data?.error) {
        Swal.fire({
          title: "Incorrect Password!",
          icon: "error",
          text: response?.data?.message || "Unknown error occurred.",
        });
      } else {
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          text: "You have successfully logged in.",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/adge/home");
          }
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      // Show a generic error message if something goes wrong
      Swal.fire({
        title: "Login Failed!",
        icon: "error",
        text: "An error occurred during login.",
      });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-6 ">
          <div className="LoginSec">
            <div className="LoginImg">
              <img src="img/logo.svg" alt="" style={{ width: "40vh" }} />{" "}
            </div>
            <div className="LoginTitle">Login</div>
            <form>
              <div className="group mt-5">
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                {/* Display username error */}
                {userNameError && (
                  <span className="error-message text-danger">
                    {userNameError}
                  </span>
                )}
                <span className="highlight" />
                <span className="bar" />
                <label>User Name</label>
              </div>
              <div className="group">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Display password error */}
                {passwordError && (
                  <span className="error-message text-danger">
                    {passwordError}
                  </span>
                )}
                <span className="highlight" />
                <span className="bar" />
                <label htmlFor="password">Password</label>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveChanges}
              >
                Login
              </button>
              <button type="button" className="btn btn-secondary ms-2">
                Cancel
              </button>
            </form>
          </div>
        </div>
        <div className="col-lg-6  loginBg ">
          <img src="../img/login-img.png" alt="" />{" "}
        </div>
      </div>
    </>
  );
}

export default UserLogin;
