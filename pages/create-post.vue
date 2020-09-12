<template>
  <div class="container mx-auto py-5">
    <div class="w-full rounded-sm bg-white shadow-xs p-5 z-10 items-center">
      <input
        v-model="name"
        class="border-gray-400 focus:border-4 outline-none border-2 w-full p-2 rounded mb-3 focus:border-primary"
        type="email"
        :disabled="sending"
        placeholder="Post Title"
        required
      />
      <textarea
        v-model="body"
        :disabled="sending"
        placeholder="Content"
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
          post
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { AxiosHelper, errorHandler } from "@pranavraut033/js-utils"

export default {
  data() {
    return {
      name: "",
      body: "",
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
        .makeRequest("post", "posts", {
          name: this.name,
          body: this.body,
          userId: this.user.id,
        })
        .then(({ data }) => this.$router.push(`/posts/${data.id}`))
        .catch((err) => this.$toast.show(errorHandler(err), { type: "error" }))
        .finally(() => {
          this.sending = false
          this.$nuxt.$loading.finish()
        })
    },
  },
}
</script>

<style></style>
