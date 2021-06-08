const signupFormHandler = async (event) => {
  
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
 
  const password = document.querySelector('#password-signup').value.trim();
  const confirmPassword = document.querySelector('#confirm-pass').value.trim();

  if (username && password && confirmPassword) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password, confirmPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};
document
.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler);  