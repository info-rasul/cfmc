<template>
  <div>
    <div v-if="!isEdit">{{ params }}</div>
    <div v-else>
      <textarea v-model="localParams" rows="1" @change="editData" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'TextArea',
})
export default class extends Vue {
  @Prop({ required: true }) params!: number;

  @Prop({ default: false }) isEdit!: boolean;

  @Prop({ default: false }) column!: string;

  @Prop({ default: false }) id!: number;

  localParams: number | null = null;

  mounted() {
    this.localParams = this.params;
  }

  editData() {
    this.$emit('init-edit', this.id, this.column, this.localParams);
  }
}
</script>

<style scoped>
textarea {
  max-width: 130px;
}
</style>
