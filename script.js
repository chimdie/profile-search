const form = document.querySelector(".form");
const query = document.querySelector(".query");
const user_card = document.querySelector(".user_card");
const btn = document.getElementById('menuBtn')

btn.addEventListener('click', () => {
  console.log('works')
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (query.value === undefined || "") {
    e.preventDefault();
  } else {
    getData();
  }
  query.value = "";
});

function getData() {
  fetch(`https://api.github.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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",
    },
    body: JSON.stringify({
      query: `
              query ($queryString: String!) {
                search(type: USER, first: 1, query: $queryString) {
                  edges {
                    node {
                      ... on User {
                        avatarUrl
                        name
                        email
                        repositories(first: 5) {
                          nodes {
                            name
                            description
                            forkCount
                            primaryLanguage {
                              name
                              color
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              `,
      variables: {
        queryString: query.value,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const user = data.data.search.edges[0].node;
      const repo = data.data.search.edges[0].node.repositories.nodes;

      // Parent container
      const repo_container = document.createElement("div");
      repo_container.classList.add("repo_container");

      // Profile
      const profile = document.createElement("div");
      profile.classList.add("profile");

      const user_img = document.createElement("img");
      user_img.classList.add("img");
      user_img.setAttribute("src", user.avatarUrl);
      profile.append(user_img);

      const username = document.createElement("p");
      username.classList.add("username");
      username.innerText = user.name;
      profile.append(username);

      const email = document.createElement("p");
      email.classList.add("email");
      email.innerText = user.email;
      profile.append(email);

      user_card.appendChild(profile);

      // Repositories
      repo.map((r) => {
        const repos = document.createElement("div");
        repos.classList.add('repos')


        const repo_name = document.createElement("p");
        repo_name.classList.add('repo_name')
        repo_name.innerText = r.name
        repos.append(repo_name)

        const desc = document.createElement("p");
        desc.classList.add('desc')
        desc.innerText = r.description
        repos.append(desc)

        user_card.appendChild(repos)
      });
    })
    .catch(function (err) {
      console.error(err);
    });
}

function repoData() {
  const repo_container = document.createElement("div");
  repo_container.classList.add("repo_container");

  const profile = document.createElement("div");
  profile.classList.add("profile");

  const username = document.createElement("p");
  username.classList.add("username");

  const user_img = document.createElement("img");
  user_img.classList.add("img");

  const repos = document.createElement("div");
  const repo_name = document.createElement("p");
  const desc = document.createElement("p");

  document.body.appendChild(repo_container);
}
