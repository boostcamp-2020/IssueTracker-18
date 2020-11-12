const clickEventHandler = (fetchIssue, e) => {
  const { id } = e.target;
  const tableName = e.target.parentNode.parentNode.firstChild.textContent;

  let param = '?isOpen=true';
  if (tableName === 'author') {
    param += `&createrId=${id}`;
  }
  param += `&${tableName}Id=${id}`;

  fetchIssue(param);
};

export default clickEventHandler;
