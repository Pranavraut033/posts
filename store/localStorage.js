export const state = () => ({
  user: null,
  posts: [],
})

export const mutations = {
  user(state, user) {
    state.user = user
  },
  posts(state, posts) {
    state.posts = posts
  },
}
