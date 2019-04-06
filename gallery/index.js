const themes = document.getElementById('themes');
const preview = document.getElementById('preview');

let selectedElement = null;

const selectTheme = themeElement => {
  if (selectedElement) {
    selectedElement.classList.remove('selected');
  }
  selectedElement = themeElement;
  selectedElement.classList.add('selected');
  const html = themeElement.getAttribute('data-html');
  preview.contentDocument.open();
  preview.contentDocument.write(html);
  preview.contentDocument.close();
};

const cycleThemes = delta => {
  const numThemes = themes.childNodes.length;
  const selectedIndex = [...themes.childNodes].findIndex(
    e => e === selectedElement
  );
  const newIndex = Math.max(0, Math.min(numThemes - 1, selectedIndex + delta));
  selectTheme(themes.childNodes[newIndex]);
};

themes.childNodes.forEach(x => {
  const themeElement = x;
  themeElement.onclick = () => {
    selectTheme(themeElement);
  };
});

document.addEventListener('keydown', event => {
  if (event.keyCode === 37 || event.keyCode === 38) {
    cycleThemes(-1);
  } else if (event.keyCode === 39 || event.keyCode === 40) {
    cycleThemes(1);
  }
});

selectTheme([...themes.childNodes].find(e => e.textContent === 'default'));
window.focus(themes);
