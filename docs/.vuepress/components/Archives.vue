<template>
  <div class="page">
    <ul>
      <li v-for="post in recentList" :key="post.path">
        <span class="time">{{ dateFormat(post.frontmatter.date, 'YYYY/MM/DD') }}</span>
        <router-link :to="post.path">{{ post.title || post.path }}</router-link>
      </li>

      <el-tabs style="margin-top: 10px;" :value="activeName">
        <el-tab-pane v-for="item of tabList" :key="item.tab" :label="item.name" :name="item.name">
          <div v-for="post of item.list" :key="post.path">
            <span class="time">{{ dateFormat(post.frontmatter.date, 'YYYY/MM/DD') }}</span>
            <router-link :to="post.path">{{ post.title || post.path }}</router-link>
          </div>
        </el-tab-pane>
      </el-tabs>
    </ul>
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
  computed: {
    recentList() {
      return this.$site.pages
        .filter(page => page.frontmatter.date && !page.relativePath.includes('/README.md') && page.path !== '/')
        .sort((x, y) => (x.frontmatter.date < y.frontmatter.date ? 1 : -1))
        .slice(0, 30)
    },
    tabList() {
      // tab 分类
      const tabList = nav.map(item => ({
        name: item.text,
        tab: item.regularPath,
        list: []
      }))

      // 将 page 筛入 tab 中
      this.$site.pages.forEach(page => {
        if (!page.relativePath.includes('/README.md') && page.path !== '/') {
          const tab = tabList.find(item => {
            return page.regularPath.indexOf(item.tab) === 0
          })
          if (!!tab) {
            tab.list.push(page)
          }
        }
      })

      // list 排序
      tabList.forEach(tab => {
        tab.list = [...tab.list]
          .filter(page => page.frontmatter.date)
          .sort((x, y) => (x.frontmatter.date < y.frontmatter.date ? 1 : -1))
      })
      return tabList
    },
    // 最新的文章的 tab name
    activeName() {
      let target = null
      if (this.recentList[0]) {
        target = this.tabList.find(item => this.recentList[0].regularPath.indexOf(item.tab) === 0)
      }
      return target ? target.name : ''
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
