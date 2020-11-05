import React, { useState, useEffect } from 'react';
const Test = () => {
  const [issue, setIssue] = useState([]);

  const fetchInitialData = async (url) => {
    //fetch API로 서버에 요청하는 코드를 구현해보자.
    //요청응답 수신 후, setTodos 메서드를 통해 초기데이터를 추가하도록 한다.
    console.log(url);
    const data = await fetch(url);
    const issueJson = await data.json();
    console.log(issueJson);
    setIssue(issueJson);
  };

  useEffect(() => {
    fetchInitialData('http://49.50.173.66/api/issue?isOpen=true');
  }, []); //빈배열을 두 번째 인자로 주면, 초기에만 콜백함수가 실행됨.

  return (
    <div>
      {/* <p>You clicked {count} times</p> */}
      {/* <button onClick={() => setCount(count + 1)}>Click me</button> */}
      {/* <div>{issue}</div> */}
      test
    </div>
  );
};

export default Test;
