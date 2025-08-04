// Simulated post data
const posts = Array.from({ length: 25 }, (_, i) => ({
  title: `Post Title ${i + 1}`,
  content: `This is the content for post number ${i + 1}.`
}));

const postsPerPage = 6;
let currentPage = 1;
let filteredPosts = [...posts];

function displayPosts(postsList, page = 1) {
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const postsToDisplay = postsList.slice(start, end);

  const container = document.getElementById('postsContainer');
  container.innerHTML = postsToDisplay.map(post => `
    <div class="post">
      <h3>${post.title}</h3>
      <p>${post.content}</p>
    </div>
  `).join('');
}

function setupPagination(postsList) {
  const totalPages = Math.ceil(postsList.length / postsPerPage);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('page-btn');
    if (i === currentPage) btn.classList.add('active');
    btn.onclick = () => {
      currentPage = i;
      displayPosts(filteredPosts, currentPage);
      setupPagination(filteredPosts);
    };
    pagination.appendChild(btn);
  }
}

function filterPosts(query) {
  query = query.toLowerCase();
  filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query)
  );
  currentPage = 1;
  displayPosts(filteredPosts, currentPage);
  setupPagination(filteredPosts);
}

document.getElementById('searchInput').addEventListener('input', (e) => {
  filterPosts(e.target.value);
});

// Initial load
displayPosts(filteredPosts, currentPage);
setupPagination(filteredPosts);
