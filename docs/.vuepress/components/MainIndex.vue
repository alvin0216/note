<template>
  <div>
    <ul>
      <li v-for="post in postList" :key="post.path">
        <span class="time">{{ dateFormat(post.frontmatter.date, 'YYYY/MM/DD') }}</span>
        <router-link :to="post.path">{{ post.title || post.path }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { dateFormat } from '../utils'

export default {
  name: 'MainIndex',
  props: {
    path: {
      type: String
    }
  },
  computed: {
    postList() {
      return this.$site.pages
        .filter(
          page =>
            page.frontmatter.date && page.regularPath.includes(this.path) && !page.relativePath.includes('README.md')
        )
        .sort((x, y) => (x.frontmatter.date < y.frontmatter.date ? 1 : -1))
    }
  },
  methods: { dateFormat }
}
</script>

<style lang="css">
.time {
  display: inline-block;
  width: 90px;
}
</style>
