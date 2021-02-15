<template>
  <div>
    <div v-if="!isEdit">{{ params }}</div>
    <div v-else>
      <label>
        <input :type="type" v-model="localParams" @change="editData" />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'Input',
})
export default class extends Vue {
  @Prop({ required: true }) params!: number;

  @Prop({ default: false }) isEdit!: boolean;

  @Prop({ required: true }) column!: string;

  @Prop({ required: true }) id!: number;

  @Prop({ default: 'text' }) type!: 'number' | 'text';

  localParams: number | string | null = null;

  mounted() {
    this.localParams = this.params;
  }

  editData() {
    this.$emit('init-edit', this.id, this.column, this.localParams);
  }
}
</script>

<style scoped>
input {
  max-width: 130px;
}
</style>
