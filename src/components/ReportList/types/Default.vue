<template>
  <div>
    {{ params }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'Default',
})
export default class extends Vue {
  @Prop({ required: true }) params!: string;
}
</script>

<style scoped>

</style>
