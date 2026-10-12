'use strict';

// The benchmark data comes directly from Table 1 of the supplied camera-ready manuscript.
const observations = {
  full: { label: 'Full-view', gain: '7.97', rows: [
    { name: '3D-ADLLM', miou: 30.28, accuracy: 70.66, map: 27.80 },
    { name: '3D-ADLLM†', miou: 32.60, accuracy: 73.21, map: 35.13 },
    { name: 'VoxAfford', miou: 40.57, accuracy: 77.68, map: 40.67 }
  ] },
  partial: { label: 'Partial-view', gain: '4.95', rows: [
    { name: '3D-ADLLM', miou: 28.72, accuracy: 68.28, map: 25.63 },
    { name: '3D-ADLLM†', miou: 33.05, accuracy: 66.64, map: 34.98 },
    { name: 'VoxAfford', miou: 38.00, accuracy: 72.19, map: 37.57 }
  ] }
};

const tabButtons = Array.from(document.querySelectorAll('[data-view]'));
function setObservation(view, moveFocus) {
  const data = observations[view];
  if (!data) return;
  tabButtons.forEach(function (button) {
    const selected = button.dataset.view === view;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
    if (selected && moveFocus) button.focus();
  });
  const selectedButton = tabButtons.find(function (button) { return button.dataset.view === view; });
  document.getElementById('benchmark-panel').setAttribute('aria-labelledby', selectedButton.id);
  document.getElementById('benchmark-caption').textContent = data.label + ' instance-level metrics, percentages';
  const body = document.getElementById('results-body');
  body.replaceChildren();
  data.rows.forEach(function (row, index) {
    const tr = document.createElement('tr');
    if (index === 2) tr.className = 'ours';
    const th = document.createElement('th');
    th.scope = 'row';
    th.textContent = row.name;
    tr.append(th);
    [row.miou, row.accuracy, row.map].forEach(function (value) {
      const td = document.createElement('td');
      td.textContent = value.toFixed(2);
      tr.append(td);
    });
    body.append(tr);
  });
  document.getElementById('results-status').textContent = data.label + ' results. VoxAfford instance mIoU ' + data.rows[2].miou.toFixed(2) + ' percent, ' + data.gain + ' percentage points above the matched-pretraining baseline.';
}
tabButtons.forEach(function (button, index) {
  button.addEventListener('click', function () { setObservation(button.dataset.view, false); });
  button.addEventListener('keydown', function (event) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = 1 - index;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabButtons.length - 1;
    else return;
    event.preventDefault();
    setObservation(tabButtons[next].dataset.view, true);
  });
});

const figureDialog = document.getElementById('figure-dialog');
const dialogImage = document.getElementById('dialog-image');
document.querySelectorAll('[data-lightbox]').forEach(function (link) {
  link.addEventListener('click', function (event) {
    if (typeof figureDialog.showModal !== 'function') return;
    event.preventDefault();
    dialogImage.src = link.getAttribute('href');
    dialogImage.alt = link.querySelector('img').alt;
    document.getElementById('dialog-title').textContent = link.dataset.title;
    figureDialog.showModal();
  });
});
document.getElementById('close-dialog').addEventListener('click', function () { figureDialog.close(); });
figureDialog.addEventListener('click', function (event) { if (event.target === figureDialog) figureDialog.close(); });

const copyButton = document.getElementById('copy-citation');
copyButton.addEventListener('click', async function () {
  const code = document.getElementById('bibtex');
  const text = code.textContent;
  const status = document.getElementById('copy-status');
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
      if (!document.execCommand('copy')) throw new Error('Clipboard unavailable');
      selection.removeAllRanges();
    }
    copyButton.textContent = 'Copied';
    status.textContent = 'Citation copied to clipboard.';
    window.setTimeout(function () { copyButton.textContent = 'Copy BibTeX'; }, 2300);
  } catch (error) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);
    copyButton.textContent = 'Select & copy';
    status.textContent = 'Citation selected. Press Control+C or Command+C to copy.';
  }
});

// Project Pages can discover their repository from the deployed hostname and path.
// An explicit repository URL in the HTML metadata takes precedence.
let repositoryUrl = document.querySelector('meta[name="repository"]').content.trim();
if (!repositoryUrl && window.location.hostname.endsWith('.github.io')) {
  const owner = window.location.hostname.split('.')[0];
  const repository = window.location.pathname.split('/').filter(Boolean)[0];
  if (repository) repositoryUrl = 'https://github.com/' + encodeURIComponent(owner) + '/' + encodeURIComponent(repository);
}
if (repositoryUrl && /^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(repositoryUrl)) {
  document.querySelectorAll('.repository-link').forEach(function (link) { link.href = repositoryUrl; link.hidden = false; });
}

