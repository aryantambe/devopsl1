// API Base URL
const API_BASE = '';

// Utility function to show messages
function showMessage(message, type = 'success') {
    const container = document.querySelector('.container');
    const messageDiv = document.createElement('div');
    messageDiv.className = type;
    messageDiv.textContent = message;
    
    // Remove existing messages
    const existingMessages = container.querySelectorAll('.success, .error');
    existingMessages.forEach(msg => msg.remove());
    
    // Add new message
    container.insertBefore(messageDiv, container.firstChild);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Create User
async function createUser() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!username || !email) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email })
        });
        
        if (response.ok) {
            showMessage(`User ${username} created successfully!`);
            document.getElementById('username').value = '';
            document.getElementById('email').value = '';
            loadUsers(); // Refresh users list
        } else {
            const error = await response.json();
            showMessage(error.detail || 'Failed to create user', 'error');
        }
    } catch (error) {
        showMessage('Network error: ' + error.message, 'error');
    }
}

// Create Post
async function createPost() {
    const username = document.getElementById('postUsername').value.trim();
    const content = document.getElementById('postContent').value.trim();
    
    if (!username || !content) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/api/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, content })
        });
        
        if (response.ok) {
            showMessage('Post created successfully!');
            document.getElementById('postUsername').value = '';
            document.getElementById('postContent').value = '';
            loadPosts(); // Refresh posts list
        } else {
            const error = await response.json();
            showMessage(error.detail || 'Failed to create post', 'error');
        }
    } catch (error) {
        showMessage('Network error: ' + error.message, 'error');
    }
}

// Load Posts
async function loadPosts() {
    const container = document.getElementById('postsContainer');
    container.innerHTML = '<div class="loading">Loading posts...</div>';
    
    try {
        const response = await fetch(`${API_BASE}/api/posts`);
        
        if (response.ok) {
            const posts = await response.json();
            
            if (posts.length === 0) {
                container.innerHTML = '<p>No posts yet. Be the first to share something!</p>';
                return;
            }
            
            container.innerHTML = posts.map(post => `
                <div class="post">
                    <div class="post-header">
                        <span class="post-username">@${post.username}</span>
                        <span class="post-timestamp">${formatTimestamp(post.timestamp)}</span>
                    </div>
                    <div class="post-content">${escapeHtml(post.content)}</div>
                    <div class="post-actions">
                        <button class="like-btn" onclick="likePost(${post.id})">
                            ❤️ Like
                        </button>
                        <span class="likes-count">${post.likes} likes</span>
                        <button class="delete-btn" onclick="deletePost(${post.id})">
                            🗑️ Delete
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<div class="error">Failed to load posts</div>';
        }
    } catch (error) {
        container.innerHTML = '<div class="error">Network error: ' + error.message + '</div>';
    }
}

// Load Users
async function loadUsers() {
    const container = document.getElementById('usersContainer');
    container.innerHTML = '<div class="loading">Loading users...</div>';
    
    try {
        const response = await fetch(`${API_BASE}/api/users`);
        
        if (response.ok) {
            const users = await response.json();
            
            if (users.length === 0) {
                container.innerHTML = '<p>No users registered yet.</p>';
                return;
            }
            
            container.innerHTML = users.map(user => `
                <div class="user">
                    <div class="user-info">
                        <span class="user-username">@${user.username}</span>
                        <span class="user-email">${user.email}</span>
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<div class="error">Failed to load users</div>';
        }
    } catch (error) {
        container.innerHTML = '<div class="error">Network error: ' + error.message + '</div>';
    }
}

// Like Post
async function likePost(postId) {
    try {
        const response = await fetch(`${API_BASE}/api/posts/${postId}/like`, {
            method: 'PUT'
        });
        
        if (response.ok) {
            const result = await response.json();
            showMessage(`Post liked! Total likes: ${result.likes}`);
            loadPosts(); // Refresh to show updated likes
        } else {
            showMessage('Failed to like post', 'error');
        }
    } catch (error) {
        showMessage('Network error: ' + error.message, 'error');
    }
}

// Delete Post
async function deletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/api/posts/${postId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showMessage('Post deleted successfully!');
            loadPosts(); // Refresh posts list
        } else {
            showMessage('Failed to delete post', 'error');
        }
    } catch (error) {
        showMessage('Network error: ' + error.message, 'error');
    }
}

// Utility Functions
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
    loadUsers();
    
    // Add enter key support for forms
    document.getElementById('email').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') createUser();
    });
    
    document.getElementById('postContent').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) createPost();
    });
});
