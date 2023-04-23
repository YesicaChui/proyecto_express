socket = io()
socket.on('dataProduct', data => {
  let tbody = document.getElementById('tbody')
  let productosText = ''
  data.forEach(item => {
    productosText+= `
    <tr>
      <td>${item.id}</td>
      <td>${item.title}</td>
      <td>${item.description}</td>
      <td>${item.price}</td>
      <td>${item.thumbnail}</td>
      <td>${item.code}</td>
      <td>${item.stock}</td>
    </tr>
    `
      })
      tbody.innerHTML = productosText
  })