<template>
  <div class="page">
    <div v-for="post of postList" :key="post.path">
      <span class="time">{{ dateFormat(post.frontmatter.date, 'YYYY/MM/DD') }}</span>
      <router-link :to="post.path">{{ post.title || post.path }}</router-link>
    </div>

    <el-tabs v-model="tabName" style="margin-top: 15px">
      <el-tab-pane
        v-for="item of tabList"
        :key="item.tabName"
        :label="item.tabName"
        :name="item.tabName"
      >
        <div v-for="post of item.postList" :key="post.path">
          <span class="time">{{ dateFormat(post.frontmatter.date, 'YYYY/MM/DD') }}</span>
          <router-link :to="post.path">{{ post.title || post.path }}</router-link>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ElTabs from 'element-ui/lib/tabs'
import ElTabPane from 'element-ui/lib/tab-pane'

import 'element-ui/lib/theme-chalk/index.css'
import nav from '../nav'

export default {
  name: 'Archives',
  components: {
    ElTabs,
    ElTabPane
  },
  data() {
    return {
      tabName: ''
    }
  },
  mounted() {
    const latestPost = this.postList[0]
    if (!latestPost) return false
    const target = nav.find(item => latestPost.regularPath.indexOf(item.link) === 0)
    if (target) {
      this.tabName = target.text
    }
  },
  computed: {
    postList() {
      // sort filter
      const list = this.$site.pages.reduce((list, page) => {
        if (page.frontmatter.date && !page.relativePath.includes('/README.md') && page.path !== '/') {
          list.push(page)
        }
        return list
      }, [])

      return list.sort((x, y) => (x.frontmatter.date < y.frontmatter.date ? 1 : -1))
    },
    tabList() {
      const tabList = [
        // {
        //   tabName: 'recentList',
        //   postList: this.postList
        // }
      ]

      nav.forEach(item => {
        tabList.push({
          tabName: item.text,
          postList: this.postList.filter(post => post.regularPath.indexOf(item.link) === 0)
        })
      })

      return tabList
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

<style lang="css">
.time {
  display: inline-block;
  width: 90px;
}
</style>
