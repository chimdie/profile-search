const form = document.querySelector(".form");
const query = document.querySelector(".query");
const user_card = document.querySelector(".user_card");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (query.value === undefined || '') {
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
      Authorization: "Bearer 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",
    },
    body: JSON.stringify({
      query: `
              query ($queryString: String!) {
                search(type: USER, first: 20, query: $queryString) {
                  nodes {
                    ... on User {
                      avatarUrl
                      email
                      name
                      repositories(first: 5) {
                        edges {
                          node {
                            name
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
      const uu = data.data.search.nodes[0];
      console.log(uu.name)

      const result = data.data.search.nodes;
      console.log(result.map(r => r.name))

      result.map(user => {
        `<div class="user_profile">
          <img src=${user.avatarUrl} class="img" />
          <h4 class="username">${user.name}</h4>
        </div>
        <div class="user_repo">
          <div class="repo">
            
          </div>
        </div>
        `
      })


    })
    .catch(function (err) {
      console.error(err);
    });
}
