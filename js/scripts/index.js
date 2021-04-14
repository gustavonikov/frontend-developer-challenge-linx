import api from '../services/api.js';
import fetchProducts from '../services/fetchProducts.js';
import scrollTop from './scrollTop.js';

/**
 * It formats the price for the standardization of the 
 * official currency of Brazil
 * 
 * @param number The price to be formatted
 * @return numeric string
 */
function formatPrice(price) {
    return new Intl.NumberFormat( 
        { style: 'currency', currency: 'BRL' }, 
        { minimumFractionDigits: 2 }
    ).format(price);
}

/**
 * Receives the data of the product
 * 
 * @param number id The product id
 * @param string name The product name
 * @param string image The path to the image
 * @param number oldPrice The previous price of the product
 * @param number price The product current price
 * @param string description A brief description about the product
 * @param object installments Contains two properties: value and count, both numbers. Representing the 
 *      installment price and the quantity of the installment
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

/** 
 * Load the products based on the user's action to see more products
 * 
 * @param string currentPage The link of the current url to load the products
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
scrollTop();
