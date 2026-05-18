const user = {
  name: "Ravi",
  age: 28,
  address: {
    city: "Hyderabad",
    country: "India",
  },
  scores: [88, 94, 76, 100, 65],
};

const {
  name: username,
  age,
  address: { city },
} = user;

const [firstScore, ...remainingScores] = user.scores;

function getUser() {
  return user;
}

function userDetails({ name, address: { city } }) {
  console.log(`${name} lives in ${city}`);
}

const updatedUser = { ...user, age: 29, active: true };

userDetails(user);

const { name, scores } = getUser();
