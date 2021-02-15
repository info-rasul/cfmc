<template>
  <div>
    <button v-if="!params.isEdit" @click="setEdit">Edit</button>
    <div v-else>
      <button @click="confirmEdit">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import {
  ReportsItem,
} from '@/models';

@Component({
  name: 'Controls',
})
export default class extends Vue {
  @Prop({ required: true }) params!: ReportsItem;

  setEdit() {
    this.params.isEdit = true;
  }

  confirmEdit() {
    this.params.isEdit = false;
    this.$emit('confirm-edit');
  }
}
</script>

<style scoped>

</style>
