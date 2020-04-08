<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'

export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems'],
  watch: {
    '$page.path': {
      handler(path) {
        if (path === '/schedule/') {
          setTimeout(() => this.setTodoStyle(), 0)
        }
      },
      deep: true
    }
  },
  methods: {
    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {},

    // 图片放大方法，用代码给img标签添加a标签
    setPictureZoom() {
      let img = document.querySelectorAll('p > img')
      for (let i = 0; i < img.length; i++) {
        if (img[i]) {
          let a = document.createElement('a')
          let parent = img[i].parentNode
          parent.appendChild(a)
          let src = img[i].getAttribute('src')
          a.setAttribute('data-fancybox', 'images')
          a.setAttribute('href', src)
          a.appendChild(img[i])
        }
      }
    },

    setTodoStyle() {
      const domList = Array.from(document.querySelectorAll('.page li'))
      domList.forEach(dom => {
        if (!dom) return false
        if (dom.innerHTML.indexOf('[x]') === 0) {
          dom.innerHTML = dom.innerHTML.replace(
            '[x]',
            '<input type="checkbox" class="task-list-item-checkbox" checked>'
          )
          dom.setAttribute('class', 'task-list-item')
        }
        if (dom.innerHTML.indexOf('[ ]') === 0) {
          dom.innerHTML = dom.innerHTML.replace('[ ]', '<input type="checkbox" class="task-list-item-checkbox">')
          dom.setAttribute('class', 'task-list-item')
        }
      })
    }
  },
  mounted() {
    this.setTodoStyle()
    this.setPictureZoom()
  },
  updated() {
    this.setPictureZoom()
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: block;
}

.task-list-item {
  list-style-type: none;
}

.task-list-item-checkbox {
  vertical-align: text-top;
}
</style>
