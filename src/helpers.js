export function changeTitleElement(elem, first, second) {
    return elem.textContent === first
    ? elem.textContent = second
    : elem.textContent = first
}
