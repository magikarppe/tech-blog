const newPost = async (e) => {
  e.preventDefault();
  const title = document.getElementById('title-Input').value;
  const text = document.getElementById('post-Input').value;
  
  if (title && text) {
      const response = await fetch('/new-post', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ title, text}),
          
      });
      if (response.ok) {
          document.location.replace('/');
      } else {
          alert('Failed to create a post');
      }
  }

};
// when user clicks the postbtn we run the function above
document.querySelector('#postBtn').addEventListener('click', newPost);