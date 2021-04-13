/* 
    * Makes the arrow scroll the page to the top when the user need to
*/
export default function scrollTop() {
    const scrollArrow = document.querySelector('[data-scroll-arrow]');
    
    const toTop = () => {
        window.scrollTo(0, 0);
    };

    scrollArrow.addEventListener('click', toTop)
}
