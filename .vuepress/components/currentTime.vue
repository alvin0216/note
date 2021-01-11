<template>
  <div>
    <button @click="copy">拷贝当前时间</button>
    <span>{{ current }}</span>
  </div>
</template>

<script>
import dateFormatter from '../utils/dateFormatter'
export default {
  data() {
    return {
      current: ''
    }
  },
  methods: {
    copy() {
      this.current = dateFormatter()
      const oInput = document.createElement('input')
      oInput.value = this.current
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      document.body.removeChild(oInput)
    }
  }
}
</script>
