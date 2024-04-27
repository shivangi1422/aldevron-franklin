async function renderDetails(insertAfterElement) {
  const summaryWrapper = document.querySelector('event-summary-wrapper');
  if (summaryWrapper) {
    const summary = document.querySelector('event-summary');
    insertAfterElement.parentNode.insertBefore(summary, insertAfterElement.nextSibling);
  }
}

export default async function buildAutoBlocks() {
  const title = document.getElementById('event-details');
  if (title) title.classList.add('event-title');
  renderDetails(title);
}
