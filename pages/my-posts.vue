<template>
  <div class="container mx-auto">
    <h1 class="text-gray-700 font-bold text-2xl mb-5 mt-3">My Posts</h1>
    <nuxt-link
      v-for="post in posts"
      :key="post.id"
      :to="`posts/${post.id}`"
      class="shadow-md p-5 rounded-md mb-3 block bg-white"
    >
      <h2 class="text-xl font-bold text-gray-700">{{ post.title }}</h2>
      <p class="text-gray-600">{{ post.body }}</p>
    </nuxt-link>
  </div>
</template>

<script>
import { AxiosHelper } from "@pranavraut033/js-utils"

export default {
  async asyncData({ store }) {
    const axios = new AxiosHelper(process.env.base_url)

    return {
      posts: (
        await axios.makeRequest("get", "posts", {
          query: {
            userId:
              store.state.localStorage.user && store.state.localStorage.user.id,
          },
        })
      ).data,
    }
  },
}
</script>
