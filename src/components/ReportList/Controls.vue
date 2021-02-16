<template>
  <div>
    <button v-if="!params.isEdit" @click="setEdit" class="button edit">Edit</button>
    <div v-else>
      <button @click="confirmEdit" class="button save">Save</button>
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

<style scoped lang="scss">
.light {
  .button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
    &.save {
      background-color: #af4c4c;
    }
  }
}
</style>
