<template>
  <div class="order-go">
    {{ column.title }}
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
}
</script>

<style scoped>

</style>
