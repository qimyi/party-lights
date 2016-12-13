(function () {

  const postColor = (color) => {
    const http = new XMLHttpRequest();
    http.open('POST', '/api/v1/setColor', true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        console.log(http.responseText);
      }
    };
    http.send(JSON.stringify({color}));
  };

  document
    .querySelector('#color-picker')
    .addEventListener('change', (e) => {
      postColor(`#${e.target.value}`);
    });

}());
