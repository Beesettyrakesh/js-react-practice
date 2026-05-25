import { fetchRepos, fetchUser, searchUsers } from "./app.js";

const button = document.getElementById("search-Btn");
const searchInput = document.getElementById("search-box");
const resultDiv = document.getElementById("result-div");
let searchKey = "";

searchInput.addEventListener("input", extractSearchKey);

button.addEventListener("click", fetchUsers);

function extractSearchKey(event) {
  searchKey = event.target.value.toLowerCase();
}

async function fetchUsers() {
  resultDiv.replaceChildren();
  const users = await searchUsers(searchKey);
  if (users.items.length === 0) {
    const errorMsg = document.createElement("p");
    errorMsg.innerHTML = "No users found";
    resultDiv.appendChild(errorMsg);
  } else {
    renderUsers(users.items);
  }
}

function renderUsers(users) {
  users.map((user) => {
    const userButton = document.createElement("button");

    userButton.classList.add("user-btn");

    userButton.innerHTML = user.login;
    resultDiv.appendChild(userButton);

    userButton.addEventListener("click", () => {
      getUserInfo(user.login);
    });
  });
}

async function getUserInfo(username) {
  const [{ avatar_url: avatar, login, bio, followers }, reposData] =
    await Promise.all([fetchUser(username), fetchRepos(username)]);

  renderUserInfo(avatar, login, bio, followers, reposData);
}

function renderUserInfo(avatar, login, bio, followers, repos) {
  resultDiv.replaceChildren();

  const userAvatar = document.createElement("img");
  const userLogin = document.createElement("p");
  const userBio = document.createElement("p");
  const userFollowers = document.createElement("p");
  const userRepos = document.createElement("div");
  const backBtn = document.createElement("button");

  userAvatar.src = avatar;
  userAvatar.height = 200;
  userAvatar.width = 200;
  userLogin.innerHTML = `Username: ${login}`;
  userBio.innerHTML = `Bio: ${bio}`;
  userFollowers.innerHTML = `Followers: ${followers}`;
  backBtn.innerHTML = "Back";

  repos.map((repo) => {
    const repoInfo = document.createElement("p");
    repoInfo.innerHTML = `Repository: ${repo.name} | Stars: ${repo.stargazers_count}`;
    userRepos.appendChild(repoInfo);
  });

  resultDiv.appendChild(userAvatar);
  resultDiv.appendChild(userLogin);
  resultDiv.appendChild(userBio);
  resultDiv.appendChild(userFollowers);
  resultDiv.appendChild(userRepos);
  resultDiv.appendChild(backBtn);

  backBtn.addEventListener("click", fetchUsers);
}

// () => {
//   searchInput.value = "";
//   searchKey = "";
// };
