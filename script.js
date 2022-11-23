let apiLink ='https://api.github.com/users/Oksentiy';
let repoUl = document.getElementById("repo");
let searching = document.querySelector(".searching");

let repositories = new Array(0);

function takeRequestToApi(){
    searching.innerHTML= `<div class="lds-heart"><div></div></div>`;
    setTimeout(() => {
        getUserDetail(`${apiLink}`);
    }, 2*1000);
    setTimeout(() => {
        getRepoDetail(`${apiLink}/repos`);
    }, 1000);
}
takeRequestToApi()

// Function to show user Data on screen
function showUserDetails(data){
    let box = document.querySelector(".box-body");

    let repositoryLink=``;
    repositories.forEach((repo)=>{
        repo.forEach((elem)=>{
            let date = elem.updated_at;
            let normalDate = date.slice(0, 10)
            repositoryLink+=`
                <li class="repo-name" onclick="showDetails(${elem.id})">${elem.name}
                    <div class="repo-info show-info" id='${elem.id}'>
                        <p> last changes: ${normalDate}</p>
                        <a href="${elem.html_url}">Open ropository</a>
                    </div>
                </li>`;
        })
    })

    searching.innerHTML="";

    box.innerHTML=(`
    <div class="profile-box">
        <div class="row">
            <div class="image">
                <img src="${data.avatar_url}" alt="">
            </div>
           <div class="about">
            <div class="details">
                <h1 class="name">${data.name}</h1>
                <h3 class="username">@${data.login}</h3>
                <p class="country"><span><ion-icon name="location-sharp"></ion-icon></span>${data.location===null ? 'Unknown' : data.location}</p>
            </div>
            <div class="btn-profile">
                <a href="${data.html_url}" target="_blank">Visit Profile</a>
            </div>
           </div>
        </div>
        <div class="bio">
            <h3>About</h3>
            <p>${data.bio===null ? 'Bio description is unavailable' : data.bio}</p>
        </div>
        <div class="row-followers">
            <div class="col">
                <h3 class="heading">
                    Followers
                </h3>
                <p>${data.followers}</p>
            </div>
            <div class="col">
                <h3 class="heading">
                    Following
                </h3>
                <p>${data.following}</p>
            </div>
            <div class="col">
                <h3 class="heading">
                    Repos
                </h3>
                <p>${data.public_repos}</p>
            </div>
        </div>
        <h3 class="repo-heading">Repositories</h3>
        <div class="repos-row">
            <ul id="repo">
            ${repositoryLink}
            </ul>
        </div>
    </div>
    `);
    repoUl.innerHTML=repositoryLink;
}

//showing additional repo information
async function showDetails(id){
    let info = await document.getElementById(`${id}`)
    info.classList.toggle('show-info')
}

// Fetching user details
async function getUserDetail(api){
    await fetch(api)
        .then(async (query)=>{
            return await query.json();
        }).then((result)=>{
            showUserDetails(result);
        }).catch((error)=>{
            console.log(error)
        })
}

// function to get repositories link
async function getRepoDetail(myApi){
    await fetch(myApi)
        .then(async (repoQuery)=>{
            return await repoQuery.json()
        }).then((repoResult)=>{
            repositories.push(repoResult);
        }).catch((repoError)=>{
            console.log(repoError)
        });
}