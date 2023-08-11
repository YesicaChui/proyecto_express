socket = io()
socket.on('dataProduct', midata => {
  const data = midata.payload;
  let tbody = document.getElementById('tbody')
  let productosText = ''
  console.log(data)
  data.forEach(item => {
    productosText+= `
    <tr>
      <td><button class="delete-button" data-product-id="${item._id}">Eliminar</button></td>
      <td>${item.title}</td>
      <td>${item.description}</td>
      <td>${item.price}</td>
      <td>${item.thumbnails}</td>
      <td>${item.code}</td>
      <td>${item.stock}</td>
      <td>${item.category}</td>
    </tr>
    `
      })
      tbody.innerHTML = productosText
  })

  document.getElementById('createBtn').addEventListener('click', () => {
    console.log("presione el boton")
    const body = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        code: document.getElementById('code').value,
        stock: document.getElementById('stock').value,
        thumbnails: document.getElementById('thumbnails').value,
        category: document.getElementById('category').value,
    }
    fetch('/products', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(result => {
            console.log(result)
            if (result.status ===403) {
                throw new Error('No tienes autorizacion');
              }
            return result.json()
        })
        .then(result => {
            console.log(result)
            if (result.status === 'error') throw new Error(result.error)        
            alert(`Ok. Todo salió bien! :)\nEl producto se ha agregado con éxito!\n\nVista actualizadaaa!`)
            document.getElementById('title').value = ''
            document.getElementById('description').value = ''
            document.getElementById('price').value = ''
            document.getElementById('code').value = ''
            document.getElementById('stock').value = ''
            document.getElementById('category').value = ''
            document.getElementById('thumbnails').value = ''
        })
        .catch(err => alert(`Ocurrió un error :(\n${err}`))
})



deleteProduct = (id) => {
    console.log("borrando")
    console.log(id)
    fetch(`/products/${id}`, {
        method: 'delete',
    })
        .then(result => result.json())
        .then(result => {
            if (result.status === 'error') throw new Error(result.error)
            alert(`Ok. Todo salió bien! :)\nEl producto eliminado con éxito!`)
        })
        .catch(err => alert(`Ocurrió un error :(\n${err}`))
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const productId = event.target.getAttribute('data-product-id');
        deleteProduct(productId);
    }
});