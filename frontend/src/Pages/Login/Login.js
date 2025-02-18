import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../../apis/axiosConfig"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:8080/login", {  // Ensure correct API endpoint
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            console.log(response);
            const data = await response.data;
            if (response.status === 401) {
                setError('Invalid credentials, please try again.');
                return;
            }
            // alert("Login successful!" + response.message);
            navigate('/experts');
        } catch (err) {
            alert("Login failed!" + err.message);
            // setError(err.message);
        }
    };

    return (
        <div style={{ width: "300px", margin: "50px auto", textAlign: "center" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="username"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Login</button>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Login;



// import React, { Component } from 'react';
// import * as $ from 'jquery';
// import './Login.css';


// class Login extends Component {

//     componentDidMount() {

//         this.login = this.login.bind(this);

//     }

//     login() {
//         let userAccount = $('#userAccount').val();
//         let password = $('#password').val();
//         var xhr = new XMLHttpRequest();
//         xhr.withCredentials = true;
//         var postUrl = "http://localhost:8080/login?username=" + userAccount + "&password=" + password;
//         console.log(postUrl);
//         xhr.open('post', postUrl, true);
//         xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//         xhr.send();
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 alert(xhr.responseText);
//             }
//         };

//     }



//     render() {
//         return (
//             <div className="App">
//                 <div className="app-body">
//                     <form name="login-form" className="login-form">
//                         <div className="line-div">
//                             <label className="text">账号:</label>
//                             <input placeholder="请输入你的账号" type="text" id="userAccount" name="userAccount" className="content" />
//                         </div>
//                         <div className="line-div">
//                             <label className="text">密码:</label>
//                             <input placeholder='请输入密码' type="password" id="password" name="password" className="content" />
//                         </div>
//                         <div className="line-div btn">
//                             <div className="left-div login">
//                                 <input className="def-btn login" type="button" name="login" value="登录" onClick={this.login} />
//                             </div>
//                             <div className="left-div register">
//                                 <input className="def-btn register" type="button" name="register" value="没有账号，点击注册" />
//                             </div>
//                         </div>
//                     </form>

//                 </div>
//             </div>
//         );
//     }
// }

// export default Login;
