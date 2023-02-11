const apiURL = "https://api.github.com/users/";
const form = document.querySelector("form");
const search = document.querySelector(".search");
const profile = document.querySelector(".profile");
const repos = document.querySelector(".repos");
const errorMsg = document.querySelector(".alert");


form.addEventListener("submit", (e) => {
    e.preventDefault();

    let user = search.value.split(" ").join("");
    if (user === "") {
        errorMessage("Input cannot be blank");
        console.log("blank");
    } else {
        getUser(user);
        search.value = "";
    }
});


async function getUser(username) {
    const response = await fetch(apiURL + username);
    const data = await response.json();
    //   console.log(data);
    if (!response.ok) {
        errorMessage("User not found, try another");
    } else {
        displayData(data);
        getRepos(username);
    }
}

  // Get Repos
async function getRepos(username) {
    const response = await fetch(apiURL + username + "/repos");
    const data = await response.json();
    console.log(data);
    displayRepos(data);
}

  // Error message function
function errorMessage(msg) {
    profile.innerHTML = "";
    document.querySelector(".hide").style.display = "none";
    return (repos.innerHTML = `<p class="alert alert-danger">${msg}</p>`);
}

function displayData(user) {
    const html = `
            <img
            src="${user.avatar_url}"
            alt="${user.name}"
            class="img-thumbnail rounded-circle"/>
        <h2>${user.name}</h2>
        <p>${user.login}</p>
        <div class="d-grid">
            <a href="https://github.com/${user.login}" target="_blank" rel="noopener" class="btn btn-outline-secondary">View Profile</a>
        </div>
        <p class="pt-2">
            <span>${user.followers} Followers</span><br>
            <span>${user.following} Following</span>
        </p>
        <p>repos: ${user.public_repos}</p>
        <p><i class="fas fa-marker-alt"></i>location: ${user.location}</p>
        `;
        profile.innerHTML = html;
}

  // Didplay Repos
function displayRepos(repoData) {
    let repo_data = repoData.map((repo) => {
        return `
            <span class="repo border border-rounded p-3">
                <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
                <p>
                <strong>Stars: ${repo.stargazers_count} |</strong>
                <strong>Watchers: ${repo.watchers_count} |</strong>
                <strong>Forks: ${repo.forks_count}</strong>
                </p>
            </span>
            `;
    });
    repos.innerHTML = repo_data.slice(0, 100).join("");
    document.querySelector(".hide").style.display = "block";
}
