// Initial setup
let isRegistering = false;

// Toggle between login and registration
function toggleAuth() {
  isRegistering = !isRegistering;
  const title = document.getElementById('auth-title');
  const nameField = document.getElementById('name-field');
  const button = document.getElementById('auth-button');
  const toggleText = document.getElementById('toggle-text');

  if (isRegistering) {
    title.textContent = 'Register';
    nameField.style.display = 'block';
    button.textContent = 'Register';
    toggleText.innerHTML = `Already have an account? <a href="#" id="toggle-link">Login here</a>`;
  } else {
    title.textContent = 'Login';
    nameField.style.display = 'none';
    button.textContent = 'Login';
    toggleText.innerHTML = `Don't have an account? <a href="#" id="toggle-link">Register here</a>`;
  }
}

// Event listener for the registration/login toggle link


document.getElementById('register-toggle-link')?.addEventListener('click', function(event) {
    event.preventDefault();
    toggleAuth();
  });
document.getElementById('toggle-link')?.addEventListener('click', function(event) {
  event.preventDefault();
  toggleAuth();
});



// Registration form submission
document.getElementById('auth-form')?.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (isRegistering) {
    // Registering user
    const fullName = document.getElementById('name').value;
    if (email && password && fullName) {
      localStorage.setItem('user', JSON.stringify({ email, password }));
      alert('Registered successfully!');
      showHomepage();
    } else {
      alert('Please fill in all fields.');
    }
  } else {
    // Logging in user
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert('Logged in successfully!');
      showHomepage();
    } else {
      alert('Invalid email or password.');
    }
  }
});

// Function to show the homepage
function showHomepage() {
  document.getElementById('auth').style.display = 'none';
  document.getElementById('homepage-content').style.display = 'block';
}

// Start test button
document.getElementById('start-test')?.addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('homepage-content').style.display = 'none';
  document.getElementById('test-container').style.display = 'block';
});

// Handle form submission for the test
document.getElementById('test-form')?.addEventListener('submit', function(event) {
  event.preventDefault();

  // Calculate score based on the answers
  const correctAnswers = ["is", "are", "when", "for", "hard", "quickly", "duty", "analyze", "sign", "better", "leave", "finished", "act", "chosen", "lost"];
  let score = 0;

  correctAnswers.forEach((answer, index) => {
    const userAnswer = document.getElementById(`q${index + 1}`).value.trim().toLowerCase();
    if (userAnswer === answer) {
      score++;
    }
  });

  // Display the result
  document.getElementById('test-form').style.display = 'none';
  document.getElementById('result').style.display = 'block';
  document.getElementById('grade').textContent = `You scored ${score}/15. Your level is: ${getLevel(score)}`;
});

// Function to determine the level based on score
function getLevel(score) {
  if (score <= 5) {
    return 'Beginner';
  } else if (score <= 10) {
    return 'Intermediate';
  } else {
    return 'Advanced';
  }
}

// Retake test button
document.getElementById('retake-test')?.addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('test-form').reset();
  document.getElementById('test-form').style.display = 'block';
  document.getElementById('result').style.display = 'none';
});
