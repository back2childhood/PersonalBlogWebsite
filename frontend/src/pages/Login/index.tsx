
import React, { useEffect } from 'react';
import s from "./index.scss"
import { useSafeState } from 'ahooks';
import { loginAPI } from '@/utils/apis/getUser';
import { getToken, setToken } from '@/utils/token';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Title } from '../titleconfig';
import { message } from 'antd';


interface Props {
    className?: string;
    setToken?: Function;
}

const Login: React.FC<Props> = ({ className }) => {

    const [username, setUsername] = useSafeState('')
    const [password, setPassword] = useSafeState('')
    const [token, setToken_] = useSafeState('')
    const navigate = useNavigate()

    const loginHandle = () => {
        // console.log(username + " " + password)
        loginAPI({ username: username, password: password })
            .then(
                res => (setToken_(res.data))
            )
    }

    useEffect(() => {
        if (token) {
            // console.log(111)
            setToken(token)
            message.success(username + ', login successfully')
            navigate('/setting')
        }
    }, [token]);

    return (
        <Layout title={Title.Login}>
            <div className={s.loginContainer}>
                <div className={s.loginBox}>
                    <h2 className={s.loginTitle}>Sorry, only admin can visit this page ~</h2>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className={s.inputField}
                    />

                    <br /><br />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={s.inputField}
                    />

                    <br /><br />

                    <button onClick={loginHandle} className={s.loginBtn}>
                        Login
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
