const $ = document.querySelector.bind(document);
const userAPI = "https://jsonplaceholder.typicode.com/users";
const userList = $(".list-user");
let idFake = 11;

const getData = async (linkAPI) => {
  const res = await fetch(linkAPI);
  return res.json();
};

const renderUI = (users) => {
  const htmls = users
    .map(
      (user) => `
    <li class="user" data-user-id=${user.id}>
        <h4 class="user-infor name" data-title="Name: ">${user.name}</h4>
        <div class="user-infor user-name" data-title="User name: ">${user.username}</div>
        <div class="user-infor email" data-title="Emai: ">${user.email}</div>
        <button id="updateBtn" onclick="handleUpdate(${user.id})">Update</button>
        <button id="deleteBtn" onclick="deleteUser(${user.id})">Delete User</button>
    </li>`
    )
    .join("");
  userList.innerHTML = htmls;
};

let defaultUser = [];
getData(userAPI).then((data) => {
  renderUI(data);
  defaultUser = data;
});

const dataInput = () => {
  const nameInput = $("#name").value;
  const usernameInput = $("#username").value;
  const emailInput = $("#email").value;
  return {
    name: nameInput,
    username: usernameInput,
    email: emailInput,
  };
};

const handleCreateUser = () => {
  const user = dataInput();
  user.id = idFake;

  defaultUser.push(user);

  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  fetch(userAPI, options);

  const userHtml = `
    <li class="user" data-user-id=${idFake}>
        <h4 class="user-infor name" data-title="Name: ">${user.name}</h4>
        <div class="user-infor user-name" data-title="User name: ">${user.username}</div>
        <div class="user-infor email" data-title="Emai: ">${user.email}</div>
        <button id="updateBtn" onclick="handleUpdate(${idFake})">Update</button>
        <button id="deleteBtn" onclick="deleteUser(${idFake})">Delete User</button>
    </li>`;
  userList.insertAdjacentHTML("beforeend", userHtml);
  idFake++;
};

const deleteUser = (id) => {
  fetch(`${userAPI}/${id}`, {
    method: "DELETE",
  });

  const user = $(`li.user[data-user-id="${id}"]`);
  user.remove();

  defaultUser = defaultUser.filter((user) => user.id !== id);
};

const handleSearchInput = (e) => {
  let info = e.target.value;
  let filterUser = defaultUser.filter((user) =>
    user.name.toLowerCase().startsWith(info)
  );

  filterUser.length === 0
    ? (userList.innerHTML = "<h3>Not found</h3>")
    : renderUI(filterUser);
};

document.querySelector("#search").addEventListener("input", handleSearchInput);

const updateUI = (id) => {
  const userHtml = $(`li.user[data-user-id="${id}"]`);
  const html = `
    <div class="input-group">
      <label for="name">Name</label>
      <input type="text" class="name" value="${defaultUser[id - 1].name}">
    </div>
    <div class="input-group">
      <label for="username">Username</label>
      <input type="text" class="username" value="${
        defaultUser[id - 1].username
      }">
    </div>
    <div class="input-group">
      <label for="email">Email</label>
      <input type="text" class="email" value="${defaultUser[id - 1].email}">
    </div>
    <button id="confirmBtn" onclick="handleConfirmUpdate(${id})">Confirm</button>
    <button id="CancleBtn" onclick="handleCancelUpdate(${id})">Cancle</button>
    `;

  userHtml.innerHTML = html;
};

const handleUpdate = (id) => {
  updateUI(id);
};

const handleCancelUpdate = (id) => {
  const userHtml = $(`li.user[data-user-id="${id}"]`);
  userHtml.innerHTML = "";

  const html = `
    <h4 class="user-infor name" data-title="Name: ">${
      defaultUser[id - 1].name
    }</h4>
    <div class="user-infor user-name" data-title="User name: ">${
      defaultUser[id - 1].username
    }</div>
    <div class="user-infor email" data-title="Emai: ">${
      defaultUser[id - 1].email
    }</div>
    <button id="updateBtn" onclick="handleUpdate(${
      defaultUser[id - 1].id
    })">Update</button>
    <button id="deleteBtn" onclick="deleteUser(${
      defaultUser[id - 1].id
    })">Delete User</button>
  `;

  userHtml.innerHTML = html;
};

const handleConfirmUpdate = (id) => {
  const name = $("input.name");
  const username = $("input.username");
  const email = $("input.email");
  console.log([name, username, email]);

  const user = {
    name: name.value,
    username: username.value,
    email: email.value,
  };

  defaultUser[id - 1] = {
    id,
    ...user,
  };

  fetch(`${userAPI}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  handleCancelUpdate(id);
};