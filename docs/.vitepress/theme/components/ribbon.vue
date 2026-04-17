<script setup lang="ts">
import { onMounted } from "vue";
import { useRibbon } from "../hooks/useRibbon"; // 导入彩带背景

const { start: startRibbon, stop: stopRibbon } = useRibbon({
  immediate: false,
  clickReRender: true,
}); // 点击页面重新渲染彩带

onMounted(() => {
  startRibbon();
});
</script>
