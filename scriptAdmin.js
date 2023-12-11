const mainContent = document.querySelector('main')
const productList = document.getElementById('product-list')
const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc2NGQ5MzNkYWRhMDAwMThhNmEyNTYiLCJpYXQiOjE3MDIyNTE5MjMsImV4cCI6MTcwMzQ2MTUyM30.ma1VT58WW88IgiChPBiSrsVz0nQsDPc8jHS0229EDJ4'



// Funzione per mostrare la pagina Admin
function showAdminPage() {
    mainContent.innerHTML = `
        <h2>Admin Page</h2>
        <form id="product-form">
                <div class="form-group">
                    <label for="name">Nome:</label>
                    <input type="text" class="form-control" id="name" required>
                </div>
                <div class="form-group">
                    <label for="description">Descrizione:</label>
                    <input type="text" class="form-control" id="description" required>
                </div>
                <div class="form-group">
                    <label for="brand">Brand:</label>
                    <input type="text" class="form-control" id="brand" required>
                </div>
                <div class="form-group">
                    <label for="imageUrl">URL Immagine:</label>
                    <input type="text" class="form-control" id="imageUrl" required>
                </div>
                <div class="form-group">
                    <label for="price">Prezzo:</label>
                    <input type="number" class="form-control" id="price" required>
                </div>
                <button type="button" class="btn btn-primary" onclick="addProduct()">Submit</button>
                <button type="reset" class="btn btn-secondary ml-2 " onclick="resetForm()">Reset Form</button>

            </form>`
    fetchProducts()
}


// Funzione per recuperare i prodotti dall'API
function fetchProducts() {
    fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(products => {
            console.log(products)
        })

        .catch(error => console.error('Error fetching products:', error))
}

// Funzione per inviare il form e aggiungere/modificare un prodotto
function submitForm() {
    const productForm = document.getElementById('product-form');
    const formData = new FormData(productForm);

    const productId = formData.get('productId')

    const method = productId ? 'PUT' : 'POST'
    const url = productId ? `${apiUrl}/${productId}` : apiUrl

    fetch(url, {
        method: method,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    })
        .then(response => response.json())
        .then(() => {
            resetForm();
            fetchProducts();
        })
        .catch(error => console.error('Error submitting form:', error))
}

// Funzione per azzerare il form
function resetForm() {
    document.getElementById('product-form').reset()
}


function addProduct() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const brand = document.getElementById('brand').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const price = document.getElementById('price').value;
    
    const product = {
        name: name,
        description: description,
        brand: brand,
        imageUrl: imageUrl,
        price: price
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Prodotto aggiunto con successo:', data);
        messaggioNewItem()
        
    })
    .catch(error => {
        console.error('Errore durante l\'aggiunta del prodotto:', error);
    });
}

function messaggioNewItem () {
    // Creare un nuovo elemento div
    const newDiv = document.createElement('div');

    const newHeading = document.createElement('h4');
    newHeading.textContent = 'Prodotto aggiunto con successo';

    // Aggiungere l'elemento h4 al div
    newDiv.appendChild(newHeading);

    // Inserire il div in fondo al main
    mainContent.appendChild(newDiv);
    newDiv.style.display = 'block'
    setTimeout(() => {
        newDiv.style.display = 'none';
      }, 5000);
}

showAdminPage()