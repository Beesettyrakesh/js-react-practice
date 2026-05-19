// Treat this as a black box — don't modify it
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "Ravi", age: 28 });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 1000);
  });
}

fetchUser(1)
  .then((user) => console.log(`then and catch: ${user.name}`))
  .catch((err) => console.log(`then and catch: ${err}`));

async function fetchUserData(id) {
  try {
    const { name } = await fetchUser(id);
    console.log(`Async and Await: ${name}`);
  } catch (err) {
    console.log(`Async and Await: ${err}`);
  }
}

fetchUserData(1);

async function getUserName(id) {
  try {
    const { name } = await fetchUser(id);
    return name;
  } catch (err) {
    return "Unknown";
  }
}

const username = await getUserName(-1);
console.log(`Username is: ${username}`);

async function fetchAllUsers(id1, id2) {
  try {
    const [{ name: name1 }, { name: name2 }] = await Promise.all([
      fetchUser(id1),
      fetchUser(id2),
    ]);
    console.log(`User1: ${name1} and User2: ${name2}`);
  } catch (err) {
    console.log(err);
  }
}

fetchAllUsers(1, 2);
