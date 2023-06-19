//este es el index.js de cliente

//socket (cliente)
let socket = io ()// este ya genera la conexión del evento 'connection'

//añadir product
const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Evita que el formulario se envíe al recargar

      const newProduct = { //crea el objeto newProduct con los valores del form
        title: document.getElementById('productTitle').value,
        description: document.getElementById('productDescription').value,
        code: document.getElementById('productCode').value,
        price: document.getElementById('productPrice').value,
        status: true, // por una actividad de entrega anterior, status siempre en true
        stock: document.getElementById('productStock').value,
        category:document.getElementById('productStock').value,
        thumbnail:document.getElementById('productImage').value,
        //id se debe agregar auto con el método
      };

      socket.emit('newProduct', newProduct); // Enviar datos del producto al servidor
      productForm.reset(); // Limpiar el formulario
    });
  
  socket.on('initialProducts', (products) => {// Escuchar el evento 'initialProducts'
   
    render(products); // Actualizar la galería de productos en el cliente
  });

  //eliminar product
  const deleteForm = document.getElementById('deleteForm');
  const idInput = document.getElementById('idInput');
  const deleteButton = document.getElementById('deleteButton');
  
  deleteForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      socket.emit('deleteProduct', idInput.value);
  
      deleteForm.reset();
  });



    
//funciones

//mostrar/ocultar descripción 
function toggleDescripcion(button) {
    let descripcion = button.nextElementSibling;
  
    if (descripcion.style.display === 'none' || descripcion.style.display === '') {
      descripcion.style.display = 'block';
      button.innerText = 'Ocultar descripción';
      button.setAttribute('data-visible', 'true');
    } else {
      descripcion.style.display = 'none';
      button.innerText = 'Mostrar descripción';
      button.setAttribute('data-visible', 'false');
    }
  }

  //render realtime
  function render(products){

    const html = products.map (elem =>{
      return (`
      <div class="card">
      <img src="${elem.thumbnail}" alt="Imagen" class="card-image">
      <h2 class="card-title">${elem.title}</h2>
      <p class="card-id">ID de producto: ${elem.id}</p>
      <p class="card-price"> precio: $ ${elem.price}</p>
      <p class="card-description">${elem.description}</p>
  </div>
      `)
    }) .join(' ');
    document.getElementById ('realTimeGallery').innerHTML = html
  }

//
  