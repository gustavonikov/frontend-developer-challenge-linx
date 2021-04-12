export default async function fetchProducts(api) {
    try {
        const res = await fetch(api);
        const data = await res.json();

        return data;
    } catch(error) {
        alert(`${error.name}: ${error.message}`)
    }
}
