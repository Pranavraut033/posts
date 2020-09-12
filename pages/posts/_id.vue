<template>
  <div v-if="post">
    <div class="bg-white border-b py-2 px-5 shadow-sm">
      <h1 class="text-2xl text-gray-700 font-bold">{{ post.title }}</h1>
      <p class="text-base text-gray-600">{{ post.body }}</p>
    </div>
    <div class="container mx-auto py-5">
      <transition-group name="fall">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="mb-2 shadow-xs rounded-sm bg-white px-5 py-3"
        >
          <div class="text-xl text-gray-700 font-bold">{{ comment.name }}</div>
          <p class="text-gray-600">{{ comment.body }}</p>
          <div class="flex">
            <div class="flex-1"></div>
            <span class="text-xs font-bold text-primary">
              - {{ comment.email }}
            </span>
          </div>
        </div>
      </transition-group>
      <div class="w-full rounded-sm bg-white shadow-xs p-5 z-10 items-center">
        <input
          v-model="name"
          class="border-gray-400 focus:border-4 outline-none border-2 w-full p-2 rounded mb-3 focus:border-primary"
          type="email"
          :disabled="sending"
          placeholder="Comment Name"
          required
        />
        <textarea
          v-model="body"
          :disabled="sending"
          placeholder="Comment body"
          class="border-gray-400 focus:border-4 outline-none border-2 w-full p-2 rounded mb-5 focus:border-primary"
        >
        </textarea>
        <div class="flex">
          <div class="flex-1"></div>
          <button
            class="button --primary"
            :disabled="sending || !body || !name"
            @click="sendComment"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>no post found</div>
</template>

<script>
import { AxiosHelper } from "@pranavraut033/js-utils"
import { errorHandler } from "@pranavraut033/js-utils/utils/AxiosHelper"

export default {
  async asyncData({ store, params }) {
    const axios = new AxiosHelper(process.env.base_url)
    const post = (
      await axios.makeRequest("get", "posts", {
        query: {
          id: params.id,
        },
      })
    ).data[0]

    return {
      post,
      comments: (
        await axios.makeRequest("get", "comments", {
          query: {
            postId: post && post.id,
          },
        })
      ).data,
    }
  },
  data() {
    return {
      body: "",
      name: "",
      sending: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.localStorage.user
    },
  },
  methods: {
    sendComment() {
      if (this.sending) return

      this.sending = true
      this.$nuxt.$loading.start()
      const axios = new AxiosHelper(process.env.base_url)

      axios
        .makeRequest("post", "comments", {
          name: this.name,
          body: this.body,
          postId: this.post.id,
          email: this.user.email,
        })
        .then(({ data }) => {
          this.$nuxt.$loading.finish()
          this.comments.push(data)
          this.name = ""
          this.body = ""
        })
        .catch((err) => {
          this.$toast.show(errorHandler(err), { type: "error" })
          this.sending = false
          this.$nuxt.$loading.finish()
        })
    },
  },
}
</script>
