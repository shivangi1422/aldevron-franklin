import {
  div, a, p, h3,
} from '../../scripts/dom-builder.js';

async function fetchPostData() {
  try {
    const response = await fetch('/query-index.json');
    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    return [];
  }
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
}

function createAnniversaryBlogCard(post) {
  const card = div({ class: 'blog-card' });

  const picture = document.createElement('picture');
  const sourceWebp = document.createElement('source');
  sourceWebp.setAttribute('type', 'image/webp');
  sourceWebp.setAttribute('srcset', `${post.image}?width=2000&format=webply&optimize=medium`);
  sourceWebp.setAttribute('media', '(min-width: 600px)');

  const sourcePng = document.createElement('source');
  sourcePng.setAttribute('type', 'image/png');
  sourcePng.setAttribute('srcset', `${post.image}?width=2000&format=png&optimize=medium`);
  sourcePng.setAttribute('media', '(min-width: 600px)');

  const img = document.createElement('img');
  img.setAttribute('loading', 'lazy');
  img.setAttribute('alt', post.title);
  img.setAttribute('src', `${post.image}?width=750&format=png&optimize=medium`);
  img.setAttribute('width', '1000');
  img.setAttribute('height', '562');

  const link = a({ href: post.path });
  link.appendChild(picture);
  picture.appendChild(sourceWebp);
  picture.appendChild(sourcePng);
  picture.appendChild(img);

  card.appendChild(link);

  const image = div({ class: 'blog-card-content' });
  const title = h3({ class: 'blog-title' }, post.title);
  const description = p({ class: 'blog-description' }, truncateText(post.description, 180));
  const readMore = a({ href: post.path, class: 'read-more' }, 'Read more >>');

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(readMore);

  card.appendChild(image);

  return card;
}

function createAnniversaryBlogs(results, page = 1, pageSize = 10) {
  if (!results || !Array.isArray(results)) {
    return div({ class: 'blog-cards-container' });
  }
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedResults = results.slice(startIndex, endIndex);

  const container = div({ class: 'blog-cards-container' });
  paginatedResults.forEach((post) => {
    const card = createAnniversaryBlogCard(post);
    container.appendChild(card);
  });
  return container;
}

export default async function decorate(block) {
  const postData = await fetchPostData();
  const hasChildClass = block.classList.contains('child');
  const wrapper = div({ class: 'content' });
  const blogsContainer = div({ class: 'col recent-blogs' });
  let sortedResults = [];
  const filteredResults = postData.filter((item) => item.path.includes('/25th-anniversary/'));
  if (filteredResults.length) {
    sortedResults = filteredResults.sort((ar1, ar2) => ar2.date - ar1.date);
  }
  if (hasChildClass) {
    const blogCardsContainer = createAnniversaryBlogs(sortedResults.slice(0, 3));
    blogsContainer.appendChild(blogCardsContainer);
    wrapper.appendChild(blogsContainer);
  } else {
    const shouldShowPagination = sortedResults.length > 10;
    const paginatedResults = createAnniversaryBlogs(sortedResults, 1);
    blogsContainer.appendChild(paginatedResults);
    wrapper.appendChild(blogsContainer);

    if (shouldShowPagination) {
      const totalResults = sortedResults.length;
      const totalPages = Math.ceil(totalResults / 6);
      const pagination = div({ class: 'pagination' });
      for (let i = 1; i <= totalPages; i++) {
        const pageLink = a({ href: '#', class: 'page-link', 'data-page': i }, i);
        pageLink.addEventListener('click', (event) => {
          event.preventDefault();
          const selectedPage = parseInt(event.target.dataset.page);
          const newResults = createAnniversaryBlogs(sortedResults, selectedPage);
          blogsContainer.innerHTML = '';
          blogsContainer.appendChild(newResults);
        });
        pagination.appendChild(pageLink);
      }
      wrapper.appendChild(pagination);
    }
  }
  block.innerText = '';
  block.appendChild(wrapper);
}
