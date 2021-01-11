<template>
  <div class="atree">
    <a-tree
      :show-line="showLine"
      :defaultExpandAll="defaultExpandAll"
      :tree-data="data"
      @click.native="onClick"
    >
    </a-tree>
  </div>
</template>

<script>
import ATree from 'ant-design-vue/lib/tree'
import 'ant-design-vue/lib/tree/style/css' // 或者 ant-design-vue/lib/button/style/css 加载 css 文件
import treeList from './treeList'

export default {
  props: {
    namespace: {
      type: String
    },
    showLine: {
      type: Boolean,
      default: false
    },
    defaultExpandAll: {
      type: Boolean,
      default: true
    }
  },
  components: {
    ATree
  },
  computed: {
    data() {
      let value = JSON.parse(JSON.stringify(treeList[this.namespace] || []))
      const loop = item => {
        if (typeof item === 'string') {
          return { title: item, key: item }
        } else {
          let result = { title: item.title, key: item.key || Math.random() }

          let { link } = item
          let transformLink = link
          if (transformLink && /html/.test(link) && !/http/.test(link)) {
            const url = link.includes('#') ? link.split('#').join('.html#') : `${link}.html`
            transformLink = `/blogs${url}`
            result.title = this.$createElement(
              'a',
              { attrs: { ['data-link']: transformLink } },
              item.title
            )
          } else if (/http/.test(link)) {
            result.title = this.$createElement('a', { attrs: { ['data-link']: link } }, item.title)
          }

          if (item.children) {
            result.children = item.children.map(loop)
          }

          return result
        }
      }

      return value.map(loop)
    }
  },

  methods: {
    onClick(e) {
      if (e.target.dataset && e.target.dataset.link) {
        const link = e.target.dataset.link
        if (/http/.test(link)) {
          const $a = document.createElement('a')
          $a.href = link
          $a.target = '_blank'
          $a.click()
        } else {
          this.$router.push(link)
        }
      }
    }
  }
}
</script>

<style scoped>
.atree ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
