<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Node.js App Frontend</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    input, button { margin: 5px 0; padding: 8px; }
    .hidden { display: none; }
    .post { border: 1px solid #ccc; padding: 10px; margin: 10px 0; }
  </style>
</head>
<body>

  <h1>Simple Node.js Frontend</h1>

  <div id="auth-section">
    <h2>Register</h2>
    <input id="register-username" placeholder="Username" />
    <input id="register-password" type="password" placeholder="Password" />
    <button onclick="register()">Register</button>

    <h2>Login</h2>
    <input id="login-username" placeholder="Username" />
    <input id="login-password" type="password" placeholder="Password" />
    <button onclick="login()">Login</button>
  </div>

  <div id="app-section" class="hidden">
    <h2>Welcome, <span id="username-display"></span></h2>
    <button onclick="logout()">Logout</button>

    <h3>Create Post</h3>
    <input id="post-title" placeholder="Title" />
    <textarea id="post-content" placeholder="Content"></textarea>
    <br>
    <button onclick="createPost()">Submit Post</button>

    <h3>All Posts</h3>
    <div id="posts-container"></div>
  </div>

  <script>
    const API_BASE = 'http://localhost:5000/api';
    let token = localStorage.getItem('token') || null;
    let currentUser = null;

    const authSection = document.getElementById('auth-section');
    const appSection = document.getElementById('app-section');
    const usernameDisplay = document.getElementById('username-display');
    const postsContainer = document.getElementById('posts-container');

    function updateUI() {
      if (token) {
        authSection.classList.add('hidden');
        appSection.classList.remove('hidden');
        usernameDisplay.textContent = currentUser || '';
        fetchPosts();
      } else {
        authSection.classList.remove('hidden');
        appSection.classList.add('hidden');
      }
    }

    async function register() {
      const username = document.getElementById('register-username').value;
      const password = document.getElementById('register-password').value;

      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        token = data.token;
        currentUser = username;
        localStorage.setItem('token', token);
        updateUI();
      } else {
        alert(data.error || 'Registration failed');
      }
    }

    async function login() {
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;

      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        token = data.token;
        currentUser = username;
        localStorage.setItem('token', token);
        updateUI();
      } else {
        alert(data.error || 'Login failed');
      }
    }

    function logout() {
      token = null;
      currentUser = null;
      localStorage.removeItem('token');
      updateUI();
    }

    async function createPost() {
      const title = document.getElementById('post-title').value;
      const content = document.getElementById('post-content').value;

      const res = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });

      if (res.ok) {
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
        fetchPosts();
      } else {
        const data = await res.json();
        alert(data.error || 'Post creation failed');
      }
    }

    async function fetchPosts() {
      const res = await fetch(`${API_BASE}/posts`);
      const posts = await res.json();

      postsContainer.innerHTML = '';
      posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `
          <h4>${post.title}</h4>
          <p>${post.content}</p>
          <small>by ${post.author.username}</small>
        `;
        postsContainer.appendChild(div);
      });
    }

    // Auto-login if token exists
    if (token) {
      fetch(`${API_BASE}/posts`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.status === 200) {
          currentUser = 'You';
          updateUI();
        } else {
          logout();
        }
      });
    } else {
      updateUI();
    }
  </script>

</body>
</html>
