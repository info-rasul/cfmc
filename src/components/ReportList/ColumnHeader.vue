<template>
  <div class="controls">
    <div class="shift" @click="shiftLeft()">&#9668;</div>
    {{ column.title }}
    <div class="shift" @click="shiftRight()">&#9658;</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Columns } from '@/models';

@Component({
  name: 'ColumnHeader',
})
export default class extends Vue {
  @Prop({ required: true }) column!: Columns;

  shiftLeft() {
    this.$emit('shift-column', this.column.key, -1);
  }

  shiftRight() {
    this.$emit('shift-column', this.column.key, 1);
  }
}
</script>

<style scoped lang="scss">
  .controls {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .shift {
      margin: 0 5px;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
  }
</style>
