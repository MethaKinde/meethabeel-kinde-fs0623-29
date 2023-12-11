const mainContent = document.querySelector('main')
const productList = document.getElementById('product-list')
const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc2NGQ5MzNkYWRhMDAwMThhNmEyNTYiLCJpYXQiOjE3MDIyNTE5MjMsImV4cCI6MTcwMzQ2MTUyM30.ma1VT58WW88IgiChPBiSrsVz0nQsDPc8jHS0229EDJ4'


function showHomePage() {
    fetchProducts();
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
            displayProducts(products)
        })

        .catch(error => console.error('Error fetching products:', error))
}

// Funzione per visualizzare i prodotti nella pagina
function displayProducts(products) {

    let htmlListContent = ''
    products.forEach((product) => {
        htmlListContent += `
            <div class="col-md-4 col-lg-3 mb-3">
                <div class="card h-100">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Brand: ${product.brand}</p>
                        <p class="card-text">Prezzo: ${product.price}£</p>
                        <a href="descriptionpage.html"><button class="btn btn-danger mr-2" onclick="showProductDetails(this, ${JSON.stringify(product)})">Scopri Di Più</button>
                        </a>
                        <a href="modifypage.html"><button class="btn btn-primary" onclick="editProduct(this, ${JSON.stringify(product.id)})">Modifica Prodotto</button></a>
                    </div>
                </div>
            </div>`
    })
    productList.innerHTML = htmlListContent
}

function showProductDetails(button, product) {
    // Recupera i dettagli del prodotto dal parametro invece di cercarli nel DOM
    const productName = product.name;
    const productDescription = product.description;
    const productBrand = product.brand;
    const productPrice = product.price;

    console.log('Dettagli del prodotto:', {
        name: productName,
        description: productDescription,
        brand: productBrand,
        price: productPrice
    });

    const productDetails = {
        name: productName,
        description: productDescription,
        brand: productBrand,
        price: productPrice
    };

    const productDetailsString = encodeURIComponent(JSON.stringify(productDetails));
    const detailsPageUrl = `/descriptionpage.html?details=${productDetailsString}`;
    window.location.href = detailsPageUrl;
}

// Inizializza la pagina Home
showHomePage();