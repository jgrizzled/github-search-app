'use strict';
const rootEndpoint = 'http://api.github.com';
const ul = $('ul').first();

async function handleSubmit(e) {
  e.preventDefault();
  ul.html('');
  const user = $('#user').val();
  const repos = await fetchRepos(user);
  if(!!repos)
    displayRepos(repos);
}

async function fetchRepos(user) {
  const headers = new Headers({
    'Accept': 'application/vnd.github.v3+json'
  });
  const options = {
    headers: headers
  };
  const endpoint = `${rootEndpoint}/users/${user}/repos`;
  try {
    const repos = await fetch(endpoint, options);
    if(!repos.ok)
      throw new Error(repos.statusText);
    var reposJSON = await repos.json();
    return reposJSON;
  } catch(e) {
    if(e == 'Error: Not Found')
      ul.html('User not found');
    else {
      ul.html('Error retrieving user data');
      console.log(e);
    }
  }
  return false;
}

function displayRepos(repos) {
  repos.forEach(repo => {
    ul.append(`<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`);
  });
}

$(() => {
  $('form').on('submit', handleSubmit);
})