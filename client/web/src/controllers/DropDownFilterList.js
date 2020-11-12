const clickEventHandler = (fetchIssue, e) => {
  const filter = e.target.textContent;
  let param = '?isOpen=true';
  const myUserId = 1;
  if (filter === 'Open issues') {
    param = '?isOpen=true';
  }

  if (filter === 'Your issues') {
    param = `?createrId=${myUserId}`;
  }

  if (filter === 'Everything assigned to you') {
    param = `?assigneeId=${myUserId}`;
  }

  if (filter === 'Everything mentioning you') {
    param = `?commenterId=${myUserId}`;
  }

  if (filter === 'Closed issues') {
    param = '?isOpen=false';
  }

  fetchIssue(param);
};

export default clickEventHandler;
