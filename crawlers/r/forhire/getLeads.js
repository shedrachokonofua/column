const axios = require('axios');
const axiosRetry = require('axios-retry');
const moment = require('moment');
const { uniqBy, flatten } = require('lodash');
const { URL } = require('url');
const keywords = require('./keywords');


axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const flairs = [
  'Hiring',
  'Hiring - Open'
];

module.exports = async function findLeads() {
  const allPosts = await Promise.all(getInitialQueries().map(query => getPosts(query.query)));
  const posts = flatten(uniqBy(allPosts, 'id'));
  const leads = posts.map(post => parsePost(post));
  return leads;
}

async function getPosts(query, start = false, allPosts = []) {
  const { after, posts } = await makeRequest(query, start);
  const validPosts = posts.filter(post => {
    const maxAge = moment().subtract(2, 'days');
    const created = moment.unix(post.created);
    return moment(created).isAfter(maxAge);
  });
  
  const postsHolder = allPosts.concat(validPosts);
  if(after && validPosts.length > 0 && validPosts.length === posts.length) { // Entire page is valid
    return getPosts(query, after, postsHolder);
  }
  
  return postsHolder;
}

async function makeRequest(query, start) {
  try {
    const url = new URL('https://reddit.com/r/forhire/search.json');
    url.searchParams.append('q', query);
    url.searchParams.append('limit', 100);
    url.searchParams.append('restrict_sr', 1);
    url.searchParams.append('sort', 'new');
    if(start) {
      url.searchParams.append('count', 100);
      url.searchParams.append('after', start);
    }
    console.log('requesting: '+url+'\n\n')
    const res = await axios.get(url.href);
    const after = res.data.data.after;
    const posts = res.data.data.children.map(post => post.data);

    return { after, posts }
  } catch(err) {
    console.log(err)
  }
}

function getInitialQueries() {
  const queries = [];
  flairs.forEach(flair => {
    keywords.forEach(keyword => {
      queries.push({
        flair,
        keyword,
        query: `flair_name:"${flair}" ${keyword}`
      })
    });
  });

  return queries;
}

function parsePost(raw) {
  const post = {
    title: raw.title,
    description: raw.selftext,
    source: 'R_FORHIRE',
    link: raw.url,
    posted: moment.unix(raw.created).toDate(),
    sourced: moment().toDate(),
    meta: {
      id: raw.id
    }
  }
  return post;
}