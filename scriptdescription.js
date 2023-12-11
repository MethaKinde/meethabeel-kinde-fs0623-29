document.addEventListener('DOMContentLoaded', () => {
    // Estrai i dettagli del prodotto dalla query string
    const queryString = window.location.search;
    console.log('Query string:', queryString);
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams)
    const detailsString = urlParams.get('details');
    
    if (detailsString) {
        // Decodifica la stringa JSON e inserisci i dettagli nella pagina
        const productDetails = JSON.parse(decodeURIComponent(detailsString))
        console.log(productDetails)

        // Creazione degli elementi HTML per mostrare i dettagli
        const productDetail = document.getElementById('productDetail');
        const detailsHTML = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${product.imageUrl}" class="img-fluid rounded-start" alt="${product.name}">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Descrizione:${product.description}</p>
                        <p class="card-text">Brand: ${product.brand}</p>
                        <p class="card-text">Prezzo: ${product.price}£</p>
                        <a href="modifypage.html"><button class="btn btn-primary">Modifica Prodotto</button></a>
                    </div>
                    </div>
                </div>
            </div>`

        productDetail.innerHTML = detailsHTML;
    }
})