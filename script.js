// Variables for page elements
const authContainer = document.getElementById('auth-container');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const errorMessage = document.getElementById('error-message');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const goToSignupBtn = document.getElementById('go-to-signup');
const goToLoginBtn = document.getElementById('go-to-login');
const postText = document.getElementById('post-text');
const postBtn = document.getElementById('post-btn');
const postsArea = document.getElementById('posts-area');

// Simulate user data storage (in a real app, this would be a backend)
let users = [
    { username: 'user1', password: 'password1', posts: [] }
];
let loggedInUser = null;  // Track the logged-in user

// Login functionality
loginBtn.addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Find the user in the stored data
    const user = users.find(user => user.username === username);

    if (user && user.password === password) {
        loggedInUser = user;
        showMainPage();
        errorMessage.style.display = 'none';
    } else {
        errorMessage.textContent = 'Invalid username or password.';
    }
});

// Sign up functionality
signupBtn.addEventListener('click', function() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword === confirmPassword) {
        // Check if the username already exists
        const userExists = users.find(user => user.username === newUsername);
        if (userExists) {
            errorMessage.textContent = 'Username already taken.';
            return;
        }

        // Create the new user
        const newUser = { username: newUsername, password: newPassword, posts: [] };
        users.push(newUser);
        loggedInUser = newUser;

        showMainPage();
        errorMessage.style.display = 'none';
    } else {
        errorMessage.textContent = 'Passwords do not match.';
    }
});

// Show main page after successful login/signup
function showMainPage() {
    authContainer.style.display = 'none';
    document.getElementById('main-page').style.display = 'block';
}

// Switch to the sign-up form
goToSignupBtn.addEventListener('click', function() {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    errorMessage.style.display = 'none';
});

// Switch back to the login form
goToLoginBtn.addEventListener('click', function() {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    errorMessage.style.display = 'none';
});

// Post functionality
postBtn.addEventListener('click', function() {
    const content = postText.value.trim();
    
    if (content && loggedInUser) {
        // Add post to the logged-in user's post list
        loggedInUser.posts.push(content);

        // Display the post on the main page
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `<p><strong>${loggedInUser.username}</strong>: ${content}</p>`;
        postsArea.appendChild(postDiv);

        postText.value = ''; // Clear the input
    }
});
