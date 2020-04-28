import tippy from 'tippy.js';

const WORDPRESS_GFW_API =
  'https://dev-global-forest-watch-blog.pantheonsite.io/wp-json';
const TWITT_CREATION_URI = 'https://twitter.com/intent/tweet?text=';

function createSpan(text, parentContainer) {
  const span = document.createElement('span');
  span.setAttribute('id', 'selected-text');
  span.style.background = '#96BD3C';
  span.style.color = '#ffffff';

  span.innerHTML = text;
  span.setAttribute('aria-describedby', 'tooltip');
  parentContainer.insertNode(span);

  return span;
}

function createTooltip(text, rects) {
  const tooltip = document.createElement('span');
  const topPosition = (window.scrollY + rects.top);
  tooltip.setAttribute('role', 'tooltip');
  tooltip.setAttribute('class', 'tippy-box');
  tooltip.setAttribute('style', `position:absolute; top: ${topPosition}px;`);
  tooltip.innerHTML = `<img style="margin: 2px 0px 0px 2px;" src="https://img.icons8.com/ios/15/000000/twitter.png"/><a target="_blank" href="${
    TWITT_CREATION_URI + text
  }">Twitt this</a>`;

  tippy(document.getElementById('post-content'), {
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
  const selectedText = selection.toString();
  const range = selection.getRangeAt(0);
  createTooltip(selectedText, range.getBoundingClientRect());
}

export default function twittHighlightedText() {
  window.addEventListener('mouseup', () => twittText());

  // for devices with touchscreens
  window.addEventListener('touchend', () => twittText());
}
