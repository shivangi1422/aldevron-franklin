import { getMetadata, createOptimizedPicture } from '../../scripts/aem.js';
import {
  div, h1, a, li, p, ul,
  strong,
} from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  const startDatestr = getMetadata('startdate');
  const endDatestr = getMetadata('enddate');
  const startDateParts = startDatestr.split('/');
  const endDateParts = endDatestr.split('/');
  const startDate = new Date(startDateParts[2], startDateParts[0], startDateParts[1]);
  const endDate = new Date(endDateParts[2], endDateParts[0], endDateParts[1]);
  const formattedStartDate = startDate.toLocaleDateString('en-Us', { month: 'short', day: '2-digit', year: 'numeric' });
  const formattedEndDate = endDate.toLocaleDateString('en-Us', { month: 'short', day: '2-digit', year: 'numeric' });
  const date = `${formattedStartDate.split(',')[0]} - ${formattedEndDate}`;
  const image = getMetadata('og:image');
  const description = getMetadata('og:description');
  const registerButton = getMetadata('register-button');
  const title = getMetadata('og:title');
  const type = getMetadata('type');
  const region = getMetadata('region');
  const address = getMetadata('address');

  // Create elements
  const imageContainer = div(
    { class: 'image-container' },
    createOptimizedPicture(image, title),
  );

  const eventDate = p({ class: 'event-date' }, date);
  const eventSubtitle = h1({ class: 'event-subtitle' }, title);
  const keywordList = ul(
    { class: 'keyword-list' },
    li({ class: 'item type' }, type),
    li({ class: 'item region' }, region),
    li({ class: 'item address' }, address),
  );

  const eventDescription = p(description);
  const registerButtonLink = a({ href: registerButton, title }, 'Register Today');
  const registerButtonContainer = p({ class: 'button-container find-out-more' }, strong(registerButtonLink));

  // Append elements to block
  block.appendChild(imageContainer);
  block.appendChild(div({ class: 'event-details' }, eventDate, eventSubtitle, div({ class: 'event-keywords' }, keywordList), div({ class: 'event-description' }, eventDescription, registerButtonContainer)));

  // Add event listener to the 'Register Today' button
  registerButtonLink.addEventListener('click', (event) => {
    event.preventDefault();

    const popupMessageBox = div({ class: 'popup-message' });
    const message = document.createElement('p');
    message.textContent = 'You are now moving to an external website.';

    const proceedBtn = document.createElement('button');
    proceedBtn.classList.add('proceed');
    proceedBtn.textContent = 'Proceed';

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancel');
    cancelBtn.textContent = 'Cancel';

    popupMessageBox.appendChild(message);
    popupMessageBox.appendChild(proceedBtn);
    popupMessageBox.appendChild(cancelBtn);
    block.appendChild(popupMessageBox);

    proceedBtn.addEventListener('click', () => {
      const ahref = registerButtonLink.getAttribute('href');
      registerButtonLink.setAttribute('target', '_blank');
      window.location.href = ahref;
    });

    cancelBtn.addEventListener('click', () => {
      popupMessageBox.style.display = 'none';
    });
  });
}
