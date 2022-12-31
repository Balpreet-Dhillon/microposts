import { http } from './http';
import { ui } from './ui';

// Getting posts on the DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listening for when to add a post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listening for when to delete a post
document.querySelector('#posts').addEventListener('click', deletePost);

// Listening for when to change to edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listening for when the cancel button is used
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Getting the Posts
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Submitting the Posts
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }

  // Validating the input
  if(title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  } else {

    // Checking for ID
    if(id === '') {
        
      // Creating the Post
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
    } else {

      // Updating the Post
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('Post updated', 'alert alert-success');
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err));
    }
  }
}

// Deleting the Post
function deletePost(e) {
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
  }
  
  e.preventDefault();
}

// Enabling the Edit State
function enableEdit(e) {
  if(e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    
    const data = {
      id,
      title,
      body
    }

    // Filling in the form with the current post
    ui.fillForm(data);
  }
  
  e.preventDefault();
}

// Canceling the Edit State
function cancelEdit(e) {
  if(e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }

  e.preventDefault();
}

