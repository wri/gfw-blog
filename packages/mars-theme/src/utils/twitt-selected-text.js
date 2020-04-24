import { TWITT_CREATION_URI } from '../../../../constants';

function getSelectionText() {
  let text = '';
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type !== 'Control') {
    text = document.selection.createRange().text;
  }
  return text;
}

function eventRedirectToPost() {
  const selectedText = getSelectionText();
  if (selectedText.length > 0) {
    window.location.href = TWITT_CREATION_URI + selectedText;
  }
}

export default function twittHighlightedText() {
  window.addEventListener('mouseup', () => eventRedirectToPost());

  // for devices with touchscreens
  window.addEventListener('touchend', () => eventRedirectToPost());
}
