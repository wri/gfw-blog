import tippy from 'tippy.js';
import { TWITT_CREATION_URI } from '../../../../constants';

function createSpan(text, parentContainer) {
  const span = document.createElement('span');
  span.setAttribute('id', 'selected-text');
  span.style.background = '#96BD3C';
  span.style.color = '#ffffff';

  span.appendChild(text);
  span.setAttribute('aria-describedby', 'tooltip');
  parentContainer.insertNode(span);

  return span;
}

function createTooltip(span) {
  const tooltip = document.createElement('span');
  tooltip.setAttribute('role', 'tooltip');
  tooltip.setAttribute('class', 'tippy-box');
  tooltip.innerHTML = `<img style="margin: 2px 0px 0px 2px;" src="https://img.icons8.com/ios/15/000000/twitter.png"/><a href="${
    TWITT_CREATION_URI + span.textContent
  }">Twitt this</a>`;

  tippy(span, {
    interactive: true,
    trigger: 'click',
    arrow: true,
    allowHTML: true,
    theme: 'twitt-tooltip',
    content: tooltip,
  });
}

function twittText() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const selectedText = range.extractContents();

  if (selectedText.length === 0) {
    return;
  }

  const oldSpan = document.getElementById('selected-text');

  if (oldSpan !== null) {
    const oldContent = document.createTextNode(oldSpan.innerText);
    oldSpan.parentNode.insertBefore(oldContent, oldSpan);
    oldSpan.outerHTML = '';
  }

  const span = createSpan(selectedText, range);

  createTooltip(span);
}

export default function twittHighlightedText() {
  window.addEventListener('mouseup', () => twittText());

  // for devices with touchscreens
  window.addEventListener('touchend', () => twittText());
}
