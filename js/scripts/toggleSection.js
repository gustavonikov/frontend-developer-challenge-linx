/* 
    * It allows a toggle on the arrow in help algorithm section,
    * showing or not the content in it
*/
export default function toggleSection() {
    const dropArrow = document.querySelector('[data-drop-arrow]');
    const helpAlgorithmParagraphs = document.querySelectorAll('section[data-help-algorithm] p');
    const helpAlgorithmForm = document.querySelector('[data-help-form]');
    
    const toggle = () => {
        dropArrow.classList.toggle('drop-down-arrow_down');
        helpAlgorithmParagraphs.forEach((paragraph) => paragraph.classList.toggle('hide'));
        helpAlgorithmForm.classList.toggle('hide');
    };

    dropArrow.addEventListener('click', toggle)
}