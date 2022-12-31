class UI{
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = document.querySelector('add');
    }

    //Showing all of the posts
    showPosts(posts){

        let output = ''; 
        posts.forEach((post) => {

            output +=`
                <div class = "card mb-3">
                    <div class = "card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>

                        <a href="#" class="edit card-link" data-id="${post.id}">                   
                        <i class="fa fa-pencil"></i>
                        </a>

                        <a href="#" class="delete card-link" data-id="${post.id}">                   
                        <i class="fa fa-remove"></i>
                        </a>

                    </div>
                </div>
            `
        });

        this.post.innerHTML = output;

    }

    //Showing the alert message
    showAlert(message, className){

        this.clearAlert();

        //Creating a div to show the alers
        const div = document.createElement('div');

        //Adding a classname
        div.className = className;

        //Adding text to the div
        div.appendChild(document.createTextNode(message));

        //Getting a parent
        const container = document.querySelector('.postsContainer');

        //Getting posts
        const posts = document.querySelector('#posts');

        //Inserting the div to the DOM
        container.insertBefore(div, posts);

        //Setting a timer for the alert div that was just created
        setTimeout(() => {

            this.clearAlert();

        }, 3000);
    }

    //Clearing the alert
    clearAlert(){
        const currentAlert = document.querySelector('.alert');

        if(currentAlert){
            currentAlert.remove();
        }
    }

    //Clearing all the fields
    clearFields(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    //Filling the form with the selected post to edit
    fillForm(data){
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }

    //Clearing the ID's hidden value
    clearIdInput(){
        this.idInput.value = '';
    }

    //Changing the form state
    changeFormState(type){
        if(type === 'edit'){
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'post-submit btn btn-warning btn block';

            //Creating a cancel button
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light btn block mt-2';
            button.appendChild(document.createTextNode('Cancel Edit'))

            //Getting the parent element
            const cardForm = document.querySelector('.card-form');

            //Getting the element to insert 
            const formEnd = document.querySelector('.form-end');

            //Inserting the cancel button
            cardForm.insertBefore(button, formEnd);
        } else {
            this.postSubmit.textContent = 'Post It';
            this.postSubmit.className = 'post-submit btn btn-primary btn block';

            //Remove cancel btn if it is there
            if(document.querySelector('.post-cancel')){
               document.querySelector('.post-cancel').remove();
            }

            //Clearing ID from the hidden field
            this.clearIdInput();

            //Clearing the text fields
            this.clearFields();
        }
    }
}

export const ui = new UI();