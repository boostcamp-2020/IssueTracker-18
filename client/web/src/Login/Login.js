import React, { useState } from 'react';
// import './App.css';

const Login = props => {
  const [user, setUserState] = useState({});

  const doGithubLogin = async () => {
    const data = await fetch('http://localhost:8080/auth/github');
    const json = await data.json();
    setUserState(json);
    console.log(user);
  };

  return (
    <button className="Login">
      {/* <button onClick={doGithubLogin} type="button"> */}
      {/* <a href={`http://localhost:8080/auth/github`} type="button"> */}
      깃허브로 로그인
      {/* </a> */}
    </button>
  );
};

export default Login;
