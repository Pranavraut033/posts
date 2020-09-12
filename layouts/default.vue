<template>
  <div class="bg-gray-100 min-h-screen">
    <div
      v-if="showToolbar"
      class="h-16 border-b fixed top-0 left-0 w-full bg-white flex px-5 items-center"
    >
      <div>
        <p class="text-xl text-gray-800 font-bold">
          {{ user.name }}
        </p>
        <p class="text-sm text-gray-600">
          {{ user.email }}
        </p>
      </div>
      <div class="flex-1"></div>

      <nuxt-link to="/posts" class="button --link mx-3"> Home </nuxt-link>
      <nuxt-link to="/my-posts" class="button --link"> My posts </nuxt-link>
      <nuxt-link to="/create-post" class="button --primary --flat mx-3">
        create post
      </nuxt-link>
      <button
        class="button --error --flat"
        @click="
          $store.commit('localStorage/user', null)
          $router.push('/login')
        "
      >
        logout
      </button>
    </div>
    <div :class="{ 'pt-16': showToolbar }">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.localStorage.user
    },
    showToolbar() {
      return !["/", "/login"].includes(this.$route.path) && this.user
    },
  },
  watch: {
    $route() {
      this.guardRoute()
    },
  },
  mounted() {
    this.guardRoute()
  },
  methods: {
    guardRoute() {
      if (!["/"].includes(this.$route.path)) {
        if (!this.user) this.replaceRoute("/login")
        else if (this.$route.path === "/login") this.replaceRoute("/posts")
      }
    },
    replaceRoute(path) {
      if (this.$route.path !== path) this.$router.replace(path)
    },
  },
}
</script>
<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button {
  @apply inline-block;
  @apply rounded-sm;
  @apply px-4;
  @apply py-2;
  @apply uppercase;
  @apply text-white;
  @apply shadow-sm;
  outline: none !important;

  text-decoration: none;
  transition: 200ms cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    @apply shadow-md;
  }
  &:disabled {
    @apply shadow-none;
    @apply bg-gray-400;
  }
  &.--primary {
    background: #484e83;
    &:hover {
      @apply shadow-md;
      background-color: #353961;
    }
  }
  &.--grey {
    background-color: #35495e;
    &:hover {
      background-color: #35495e;
    }
  }

  &.--flat,
  &.--link {
    box-shadow: none !important;
  }

  &.--link {
    background: transparent !important;
    @apply text-gray-800;
    &:hover {
      background-color: rgba(0, 0, 0, 0.068) !important;
    }
  }

  &.--error {
    background-color: #e43737;
    &:hover {
      background-color: #ac2626;
    }
  }
}

.fall-enter,
.fall-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fall-enter-active,
.fall-leave-active {
  transition: 250ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
</style>
