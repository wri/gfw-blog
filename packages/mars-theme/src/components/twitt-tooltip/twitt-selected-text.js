function captureText(toggleTwitterTooltip) {
  const selection = window.getSelection();
  const text = selection.toString().trim();
  if (text.length) {
    const range = selection.getRangeAt(0);
    const rects = range.getBoundingClientRect();

    const coordsToShow = rects
      ? {
          top: window.pageYOffset + rects.bottom,
          left: window.pageXOffset + (rects.left + rects.right) / 2,
        }
      : {};
    toggleTwitterTooltip(true, text, coordsToShow);
  }
}

export default function twittHighlightedText(toggleTwitterTooltip) {
  window.addEventListener('mouseup', () => captureText(toggleTwitterTooltip));
  // for devices with touchscreens
  window.addEventListener('touchend', () => captureText(toggleTwitterTooltip));

  window.addEventListener('popstate', () => toggleTwitterTooltip(false));
}
