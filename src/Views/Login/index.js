import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined, RightOutlined } from '@ant-design/icons'
import {apiClient} from "../../api/general";
import {API_URL} from "../../api/config";
import './login.scss';

const Login = () =>{
    const [loginDetails, setLoginDetails] = useState({email: '', password: ''});
    const history = useHistory();
    const handleChange = (e) =>{
        setLoginDetails({
            ...loginDetails,
            [e.target.name]: e.target.value
        })
    };

    const onLogin = () =>{
        apiClient({
            method: 'POST',
            url: `${API_URL.auth.adminLogin}`,
            data: loginDetails,
            headers: {},
        }).then(res =>{
            // console.log("login", res);
            if (res.auth){
                localStorage.setItem('token', res?.token);
                localStorage.setItem('role', res?.role);
                history.push('/create_bill');
            }
        }).catch(e =>{
            console.log(e);
        })
    };

  return(
      <div className="main-login">
          <div className="container">
              <div className="screen">
                  <div className="screen__content">
                      <div className="login">
                          <div className="login__field">
                              <UserOutlined className="login__icon"/>
                              <input type="text"
                                     className="login__input"
                                     placeholder="User name / Email"
                                     name='email'
                                     value={loginDetails.email}
                                     onChange={handleChange}
                              />
                          </div>
                          <div className="login__field">
                              <LockOutlined className="login__icon"/>
                              <input type="password"
                                     className="login__input"
                                     placeholder="Password"
                                     name='password'
                                     value={loginDetails.password}
                                     onChange={handleChange}
                              />
                          </div>
                          <button className="button login__submit" onClick={() =>onLogin()}>
                              <span className="button__text">Log In Now</span>
                              <RightOutlined className="button__icon"/>
                          </button>
                      </div>
                      <div className="">
                          <h6 className="social-login">forgot password?</h6>
                      </div>
                  </div>
                  <div className="screen__background">
                      <span className="screen__background__shape screen__background__shape4"/>
                      <span className="screen__background__shape screen__background__shape3"/>
                      <span className="screen__background__shape screen__background__shape2"/>
                      <span className="screen__background__shape screen__background__shape1"/>
                  </div>
              </div>
          </div>
      </div>
  )
};
export default Login;