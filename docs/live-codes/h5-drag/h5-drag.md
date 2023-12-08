# H5 拖拽

<script setup>
import App from './code/App.tsx'
</script>

<App />

::: code-group

<<< @/live-codes/h5-drag/code/Demo1.tsx

<<< @/live-codes/h5-drag/code/Demo2.tsx

<<< @/live-codes/h5-drag/code/App.tsx

:::

- 区域外：dragleave，离开范围
- 区域内：dragenter，用来确定放置目标是否接受放置。
- 区域内移动：dragover，用来确定给用户显示怎样的反馈信息
- 完成拖拽（落下）drop：，允许放置对象。
