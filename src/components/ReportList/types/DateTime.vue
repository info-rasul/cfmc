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
import moment from 'moment';

@Component({
  name: 'DateTime',
})
export default class extends Vue {
  @Prop({ required: false }) params!: string;

  @Prop({ default: false }) isEdit!: boolean;

  @Prop({ default: false }) column!: string;

  @Prop({ default: false }) id!: number;

  @Prop({ default: 'date' }) type!: 'date' | 'datetime-local';

  localParams: string | null = null;

  mounted() {
    if (this.type === 'datetime-local') {
      this.localParams = moment(this.params).toISOString();
      this.localParams = this.localParams.substr(0, this.localParams.lastIndexOf(':'));
    } else {
      this.localParams = this.params;
    }
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
