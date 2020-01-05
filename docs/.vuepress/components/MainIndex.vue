<template>
  <div class="page">
    <ul>
      <li v-for="post in postList" :key="post.path">
        <span>{{ dateFormat(post.frontmatter.date, 'YYYY/MM/DD') }}</span>
        <router-link :to="post.path">{{ post.title || post.path }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    path: String
  },
  data() {
    return {}
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
  methods: {
    dateFormat(dateString, fmt = 'YYYY/MM/DD hh:mm:ss') {
      try {
        const date = new Date(dateString)
        let ret
        let opt = {
          'Y+': date.getFullYear().toString(), // 年
          'M+': (date.getMonth() + 1).toString(), // 月
          'D+': date.getDate().toString(), // 日
          'h+': date.getHours().toString(), // 时
          'm+': date.getMinutes().toString(), // 分
          's+': date.getSeconds().toString() // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        }
        for (let k in opt) {
          ret = new RegExp('(' + k + ')').exec(fmt)
          if (ret) {
            fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
          }
        }
        return fmt
      } catch (error) {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
