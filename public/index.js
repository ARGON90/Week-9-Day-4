// Your code here

const catLoader = async () => {

    // Phase 1
    // creation of main div for content
    const mainContainer = document.createElement('div');
    // mainContainer styling
    mainContainer.style.display = 'flex';
    mainContainer.style.justifyContent = 'center';
    mainContainer.style.alignItems = 'center';
    mainContainer.style.flexDirection = 'column';
    // appending mainContainer to the body element
    document.querySelector('body').appendChild(mainContainer);

    // Creation of header for the site
    const newHeader = document.createElement('h1');
    // setting content of the header
    newHeader.innerText = 'Kitten Pic';
    // adding header to the mainContainer div
    mainContainer.appendChild(newHeader);

    // fetch to grab cat image data from the api
    const catRes = await fetch('https://api.thecatapi.com/v1/images/search');
    // formatting response object to standard object to be used
    const cats = await catRes.json();

    // creation of img tag to hold cat image fetches
    const newCatImg = document.createElement('img');
    // setting the src attribute of the img tag to the fetched
    // cat image url
    newCatImg.setAttribute('src', `${cats[0].url}`);
    // styling for cat img element
    newCatImg.style.maxHeight = '500px';
    newCatImg.style.maxWidth = '500px';
    newCatImg.style.borderRadius = '5px';
    // appending cat img element to the mainContainer div
    mainContainer.appendChild(newCatImg);


    // Phase 2
    // creation of new cat img button
    const catButton = document.createElement('button');
    catButton.innerText = 'New Cat';
    catButton.style.margin = '10px';
    mainContainer.appendChild(catButton);

    // creation of vote counter
    let count = 0;
    const voteDiv = document.createElement('div');
    voteDiv.innerText = `Popularity Score: ${count}`;
    voteDiv.style.margin = '10px';
    mainContainer.appendChild(voteDiv);

    // creation of comments display
    const commentDisplay = document.createElement('div');

    // event listener for new cat button
    catButton.addEventListener('click', async (e) => {
        const newCatRes = await fetch('https://api.thecatapi.com/v1/images/search');
        const newCats = await newCatRes.json();
        newCatImg.setAttribute('src', `${newCats[0].url}`);

        // reset of count section
        count = 0;
        voteDiv.innerText = `Popularity Score: ${count}`;
        // reset of comment section
        commentDisplay.innerHTML = '';
    });


    // creation of the vote button section
    const voteButtonContainer = document.createElement('div');
    voteButtonContainer.style.margin = '10px';
    // upVote button creation
    const upVoteButton = document.createElement('button');
    upVoteButton.innerText = 'Upvote';
    upVoteButton.style.marginRight = '5px';
    // addition of class to differentiate button events
    upVoteButton.classList.add('up');
    // downVote button creation
    const downVoteButton = document.createElement('button');
    downVoteButton.innerText = 'Downvote';
    downVoteButton.style.marginLeft = '5px';
    // addition of class to differentiate button events
    downVoteButton.classList.add('down');

    voteButtonContainer.append(upVoteButton, downVoteButton);
    mainContainer.appendChild(voteButtonContainer);

    // event listener for button section, upvote and downvote buttons
    voteButtonContainer.addEventListener('click', (e) => {
        if (e.target.classList[0] == 'up') {
            count++;
            voteDiv.innerText = `Popularity Score: ${count}`;
        } else if (e.target.classList[0] == 'down') {
            count--;
            voteDiv.innerText = `Popularity Score: ${count}`;
        }
    });

    // creation of comment container div for holding input, submit buttons
    const commentContainerDiv = document.createElement('div');
    commentContainerDiv.style.margin = '10px';
    commentContainerDiv.innerText = 'Comment: ';
    // creation of comment input
    const commentInput = document.createElement('input');
    commentInput.placeholder = 'Add a comment...';
    commentInput.style.marginRight = '5px';
    commentContainerDiv.appendChild(commentInput);
    // creation of submit button
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    submitButton.style.marginLeft = '5px';
    commentContainerDiv.appendChild(submitButton);

    mainContainer.appendChild(commentContainerDiv);

    // comment display styling
    commentDisplay.style.border = '1px solid black';
    commentDisplay.style.height = '500px';
    commentDisplay.style.width = '500px';
    commentDisplay.style.display = 'flex';
    commentDisplay.style.flexDirection = 'column';
    commentDisplay.style.overflowY = 'scroll';
    commentDisplay.style.margin = '10px';
    mainContainer.appendChild(commentDisplay);

    // event listener to catch submit of comments
    submitButton.addEventListener('click', (e) => {
        // creation of new comment
        const newComment = document.createElement('span');
        // updating new comment section with value of the input
        newComment.innerText = commentInput.value;
        commentDisplay.appendChild(newComment);
        // reset of the comment input
        commentInput.value = '';
    })

}

window.onload = catLoader;
