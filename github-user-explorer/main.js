import { fetchRepos, fetchUser, searchUsers } from "./app.js";

const searchButton = document.getElementById("search-Btn");
const searchInput = document.getElementById("search-box");
const resultDiv = document.getElementById("result-div");
let searchKey = "";
let searchedUsers = [];

searchInput.addEventListener("input", extractSearchKey);
searchButton.addEventListener("click", fetchUsers);

function extractSearchKey(event) {
  searchKey = event.target.value.toLowerCase();
}

async function fetchUsers() {
  resultDiv.replaceChildren();
  searchButton.disabled = true;

  const loadingMsg = document.createElement("p");
  loadingMsg.textContent = "Loading...";
  resultDiv.appendChild(loadingMsg);

  try {
    const users = await searchUsers(searchKey);
    searchedUsers = users.items;

    resultDiv.replaceChildren();

    if (users.items.length === 0) {
      resultDiv.textContent = "No users found";
    } else {
      renderUsers(users.items);
    }
  } catch (err) {
    resultDiv.textContent = err.message;
  } finally {
    searchButton.disabled = false;
  }
}

function renderUsers(users) {
  resultDiv.replaceChildren();
  users.forEach((user) => {
    const userButton = document.createElement("button");

    userButton.classList.add("user-btn");

    userButton.textContent = user.login;
    resultDiv.appendChild(userButton);

    userButton.addEventListener("click", () => {
      getUserInfo(user.login);
    });
  });
}

async function getUserInfo(username) {
  resultDiv.replaceChildren();
  searchButton.disabled = true;

  const loadingMsg = document.createElement("p");
  loadingMsg.textContent = "Loading...";
  resultDiv.appendChild(loadingMsg);

  try {
    const [{ avatar_url: avatar, login, bio, followers }, reposData] =
      await Promise.all([fetchUser(username), fetchRepos(username)]);
    renderUserInfo(avatar, login, bio, followers, reposData);
  } catch (err) {
    resultDiv.textContent = err.message;
  } finally {
    searchButton.disabled = false;
  }
}

function renderUserInfo(avatar, login, bio, followers, repos) {
  resultDiv.replaceChildren();

  const userAvatar = document.createElement("img");
  const userLogin = document.createElement("p");
  const userBio = document.createElement("p");
  const userFollowers = document.createElement("p");
  const userRepos = document.createElement("div");
  const backBtn = document.createElement("button");
  const repoHeading = document.createElement("h3");

  userAvatar.src = avatar;
  userAvatar.height = 200;
  userAvatar.width = 200;
  userLogin.textContent = `Username: ${login}`;
  userBio.textContent = `Bio: ${bio || "No bio available"}`;
  userFollowers.textContent = `Followers: ${followers}`;
  repoHeading.textContent = "Top 5 Repos";
  backBtn.textContent = "Back to results";

  if (repos.length === 0) {
    const noReposMsg = document.createElement("p");
    noReposMsg.textContent = "No repos found";
    userRepos.appendChild(noReposMsg);
  } else {
    repos.forEach((repo) => {
      const repoInfo = document.createElement("p");
      repoInfo.textContent = `${repo.name} | ⭐ Stars: ${repo.stargazers_count}`;
      userRepos.appendChild(repoInfo);
    });
  }

  resultDiv.appendChild(userAvatar);
  resultDiv.appendChild(userLogin);
  resultDiv.appendChild(userBio);
  resultDiv.appendChild(userFollowers);
  resultDiv.appendChild(repoHeading);
  resultDiv.appendChild(userRepos);
  resultDiv.appendChild(backBtn);

  backBtn.addEventListener("click", () => {
    renderUsers(searchedUsers);
  });
}
