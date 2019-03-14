//client
(async () => {
  fetch('http://127.0.0.1:3001/test123/', {
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify({"okok":"lol"})
  })
  .then(function(res) {
    return res.json();
  }).then(function(json) {
    console.log(json);
  });
})()
