
function initialize () {
    let notes = window.localStorage.notes;
    const textArea = document.querySelector('textArea');
    if (!notes) notes = 'this is the first notes';
    textArea.value = notes;
}


/**
 * 设置localStorage
 */
function saveNotes () {
    const textArea = document.querySelector('textArea');
    window.localStorage.setItem('notes', textArea.value);
}
window.onload = initialize;