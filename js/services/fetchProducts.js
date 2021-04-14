/**
 * Gets the products from the server's route
 * 
 * @param string api Is the route of the api
 */

export default async function fetchProducts(api) {
    try {
        const res = await fetch(api);
        const data = await res.json();

        return data;
    } catch(error) {
        alert(`${error.name}: ${error.message}`)
    }
}
