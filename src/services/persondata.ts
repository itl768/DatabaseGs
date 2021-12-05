function getUsers() {
    fetch(`/api/users`)
    .then((response) => response.json())
    .then(users => console.log(users));
  }