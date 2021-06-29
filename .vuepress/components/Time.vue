<template>
  <div>
    <button @click="copy">Current Time</button>
    <span>{{ current }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: '',
    };
  },
  methods: {
    copy() {
      this.current = dateFormatter();
      const oInput = document.createElement('input');
      oInput.value = this.current;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      document.body.removeChild(oInput);
    },
  },
};

function dateFormatter(fmt = 'YYYY-MM-DD hh:mm:ss') {
  try {
    const date = new Date();
    let ret;
    let opt = {
      'Y+': date.getFullYear().toString(), // 年
      'M+': (date.getMonth() + 1).toString(), // 月
      'D+': date.getDate().toString(), // 日
      'h+': date.getHours().toString(), // 时
      'm+': date.getMinutes().toString(), // 分
      's+': date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
        );
      }
    }
    return fmt;
  } catch (error) {
    return '';
  }
}
</script>
