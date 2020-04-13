<template>
  <div class="home-page">
    <div v-for="post of postList" :key="post.path">
      <span class="time">{{ dateFormat(post.frontmatter.date, 'YYYY/MM/DD') }}</span>
      <router-link :to="post.path">{{ post.title || post.path }}</router-link>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '../utils'
export default {
  name: 'Archives',
  computed: {
    postList() {
      const list = this.$site.pages.reduce((list, page) => {
        if (page.frontmatter.date && !page.relativePath.includes('/README.md') && page.path !== '/') {
          list.push(page)
        }
        return list
      }, [])

      return list.sort((x, y) => (x.frontmatter.date < y.frontmatter.date ? 1 : -1))
    }
  },
  methods: {
    dateFormat
  }
}
</script>

<style lang="css">
.home-page {
  height: 100%;
}
.time {
  display: inline-block;
  width: 90px;
}
</style>
