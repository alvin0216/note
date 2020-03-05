<template>
  <div class="page">
    <div v-for="post of postList" :key="post.path">
      <span class="time">{{ dateFormat(post.frontmatter.date, 'YYYY/MM/DD') }}</span>
      <router-link :to="post.path">{{ post.title || post.path }}</router-link>
    </div>

    <!-- <el-tabs v-model="tabName" style="margin-top: 15px">
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
    </el-tabs>-->
  </div>
</template>

<script>
import ElTabs from 'element-ui/lib/tabs'
import ElTabPane from 'element-ui/lib/tab-pane'

import 'element-ui/lib/theme-chalk/index.css'
import nav from '../nav'
import { dateFormat } from '../utils'
export default {
  name: 'Archives',
  components: { ElTabs, ElTabPane },
  data() {
    return { tabName: '' }
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
    dateFormat
  }
}
</script>

<style lang="css">
.time {
  display: inline-block;
  width: 90px;
}
</style>
