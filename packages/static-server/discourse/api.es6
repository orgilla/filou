const axios = require('axios');
const cache = require('../cache');

const Discourse = (apiEndpoint, api_key, api_username) => {
  const options = {
    responseType: 'json',
    params: {
      api_key,
      api_username
    }
  };
  const { get, post } = axios;
  const api = {
    // User
    usersByGroup: name =>
      get(`${apiEndpoint}/groups/${name}/members.json`, options).then(
        ({ data }) =>
          Promise.all(
            data.members.map(({ username }) => api.usersByName(username))
          )
      ),
    usersByName: name =>
      get(`${apiEndpoint}/users/${name}.json`, options).then(
        ({ data }) => data.user
      ),
    // Tag
    tagByName: name =>
      get(`${apiEndpoint}/tags/${name}.json`, options).then(({ data }) => data),
    // Topic
    topicById: id =>
      get(`${apiEndpoint}/t/${id}.json`, options).then(({ data }) => data),
    topicByTag: name =>
      api
        .tagByName(name)
        .then(({ topic_list }) => api.topicById(topic_list.topics[0].id)),
    topicsByCategory: id =>
      get(`${apiEndpoint}/c/${id}.json`, options)
        .then(({ data }) => data)
        .then(({ topic_list }) =>
          Promise.all(
            topic_list.topics
              .filter(x => x.tags.indexOf('public') !== -1)
              .map(({ id }) => api.topicById(id))
          )
        ),
    topicsByTag: name =>
      api
        .tagByName(name)
        .then(({ topic_list }) =>
          Promise.all(topic_list.topics.map(({ id }) => api.topicById(id)))
        ),
    // Post
    postById: id =>
      get(`${apiEndpoint}/posts/${id}.json`, options).then(({ data }) => data),
    postByTopicId: id =>
      api
        .topicById(id)
        .then(({ post_stream }) => api.postById(post_stream.posts[0].id)),
    postsByTopicId: id =>
      api
        .topicById(id)
        .then(({ post_stream }) =>
          Promise.all(post_stream.map(({ id }) => api.postById(id)))
        ),
    createTopic: (category, title, raw) =>
      post(
        `${apiEndpoint}/posts.json`,
        {
          title,
          raw,
          category
        },
        options
      )
  };

  if (process.env.NODE_ENV === 'development') {
    Object.keys(api).forEach(key => {
      api[key] = cache(api[key], key);
    });
  }

  return api;
};
module.exports = Discourse;

/*
const disco = Discourse();
disco
  .postByTopicId(79)
  .then(x => console.log(x))
  .catch(err => console.error(err));
disco
  .usersByGroup('spezialist')
  .then(x => console.log(x))
  .catch(err => console.error(err));
*/
