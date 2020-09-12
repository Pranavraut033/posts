<template>
  <div class="bg-gray-300">
    <div class="container mx-auto">
      <div class="flex justify-center items-center min-h-screen w-full">
        <div
          class="shadow-md bg-white rounded-md p-5 w-11/12 md:w-3/6 lg:w-2/6"
        >
          <form @submit.prevent="login">
            <h1 class="text-gray-800 font-bold mb-3 text-xl">Login</h1>
            <label class="w-full">
              <p class="text-gray-600 mb-1">Enter your email addres</p>

              <input
                v-model="email"
                class="border-gray-400 focus:border-4 outline-none border-2 w-full p-2 rounded-md mb-5 focus:border-primary"
                type="email"
                :disabled="loading"
                autocomplete="email"
                placeholder="janedoe@web.com"
                required
              />
            </label>
            <div class="flex">
              <div class="flex-1"></div>
              <button class="button --primary" :disabled="loading">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AxiosHelper, errorHandler } from "@pranavraut033/js-utils"

export default {
  data() {
    return {
      email: "",
      loading: false,
    }
  },
  methods: {
    login() {
      if (this.loading) return

      this.loading = true
      this.$nuxt.$loading.start()
      const axios = new AxiosHelper(process.env.base_url)
      axios
        .makeRequest("get", "users", { query: { email: this.email } })
        .then(({ data }) => {
          if (data && data.length) {
            this.$store.commit("localStorage/user", data[0])
            this.$router.push("/posts")
          } else throw new Error(`User with ${this.email} not found`)
        })
        .catch((err) => this.$toast.show(errorHandler(err), { type: "error" }))
        .finally(() => {
          this.loading = false
          this.$nuxt.$loading.finish()
        })
    },
  },
}
</script>

<style>
.outline-none {
  outline: none !important;
}
</style>
