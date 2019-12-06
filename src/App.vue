<template>
  <div id="app">
    <demo></demo>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { resizeWindow, setHTMLfontSize } from "@/utils/dom";
import demo from "@/components/d3/index.vue";

@Component({
  components: {
    demo
  }
})
export default class App extends Vue {
  created() {
    setHTMLfontSize();
    resizeWindow(setHTMLfontSize);
  }
}
</script>

<style lang="scss">
#app {
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  // margin-top: 60px;
  font-size: 14px;
}
</style>
