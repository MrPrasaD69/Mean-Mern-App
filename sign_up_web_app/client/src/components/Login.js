import React, { useState } from "react";
import { BASE_URL } from "../baseUrl";
import { Link, useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [emailId, setEmailId] = useState("");
    const [passWord, setPassWord] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        if (emailId == "" || passWord == "") {
          alert("Please enter Details");
        } else {
          const senData = {
            email_id: emailId,
            password: passWord,
          };
          fetch(`${BASE_URL}login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(senData),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status == 200) {
                alert("Login Success " + data.message);
                window.localStorage.setItem("userData", data.accessToken);
                navigate("/dashboard");
              } else {
                alert("Login Failed " + data.message);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
    }

    return (
        <>
            <section class="vh-100 gradient-custom">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div class="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                <div class="card-body p-5 text-center">
                                    <div class="mb-md-5 mt-md-4 pb-2">
                                        <form onSubmit={onSubmit}>
                                            <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                                            <p class="text-white-50 mb-5">
                                                Please enter your email and password!
                                            </p>

                                            <div class="form-outline form-white mb-4">
                                                <label class="form-label" for="typeEmailX">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="typeEmailX"
                                                    class="form-control form-control-lg"
                                                    name="email_id"
                                                    value={emailId}
                                                    onChange={(e) => setEmailId(e.target.value)}
                                                />

                                            </div>

                                            <div class="form-outline form-white mb-4">
                                                <label class="form-label" for="typePasswordX">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="typePasswordX"
                                                    class="form-control form-control-lg"
                                                    name="password"
                                                    value={passWord}
                                                    onChange={(e) => setPassWord(e.target.value)}
                                                />

                                            </div>

                                            <button
                                                class="btn btn-outline-light"
                                                type="submit"
                                            >
                                                LOGIN
                                            </button>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
