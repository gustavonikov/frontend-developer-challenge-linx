import api from '../services/api.js';
import fetchProducts from '../services/fetchProducts.js';
import toggleSection from './toggleSection.js';

/* 
    * It formats the price for the standardization of the 
    * official currency of Brazil

    * @return numeric string
*/
function formatPrice(price) {
    return new Intl.NumberFormat( 
        { style: 'currency', currency: 'BRL' }, 
        { minimumFractionDigits: 2 }
    ).format(price);
}

/* 
    * Receives the data of the product

    * @return li element with the data
*/
function createProductCard({ id, name, image, oldPrice, price, description, installments }) {
    const productCard = document.createElement('li');
    productCard.classList.add('section__list__item');
    productCard.setAttribute('id', id);

    const formattedOldPrice = formatPrice(oldPrice);
    const formattedPrice = formatPrice(price);
    const formattedInstallmentsValue = formatPrice(installments.value);

    productCard.innerHTML = `
        <img class="section__list__item__img" src="${image}" alt="${name}">

        <div>
            <h3 class="section__list__item__title">${name}</h3>

            <p class="section__list__item__paragraph">
                ${description}
            </p>

            <p class="section__list__item__price">
                De: R$${formattedOldPrice}
            </p>

            <p class="section__list__item__price__emphasis">
                Por: R$${formattedPrice}
            </p>

            <p class="section__list__item__price">
                ou ${installments.count}x de R$${formattedInstallmentsValue}
            </p>

            <a href="#" role="button" class="button section__list__item__link-button">
                Comprar
            </a>
        </div>
    `

    return productCard;
}

/* 
    * Receives the current page url to fetch the products

    * @return the list of products for the client
*/
async function loadProducts(currentPage) {
    const productsList = document.querySelector('ul[data-products-list]');

    const { products, nextPage } = await fetchProducts(currentPage);

    products.forEach((product) => {
        const productCard = createProductCard(product);
        productsList.appendChild(productCard);
    });

    const loadMoreProductsButton = document.querySelector('button[data-load-more-products]');

    const loadMoreProducts = async () => await loadProducts(`https://${nextPage}`);
    
    loadMoreProductsButton.onclick = loadMoreProducts;
}

loadProducts(api);
toggleSection();
