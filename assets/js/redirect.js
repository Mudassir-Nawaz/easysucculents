fetch('https://api.ipdata.co/?api-key=def769bbb7acca2af7d080f339a44c77b29df7fa620202c9f9c8aef8')
  .then(response => response.json())
  .then(data => {
    if (data.country_code === 'ES' && !window.location.pathname.includes('not-allowed')) {
      window.location.href = '/not-allowed';
    }
  });