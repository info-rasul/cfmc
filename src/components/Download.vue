<template>
  <div :class="getPageTemplate">
    <a @click="onGeneratedCSV" :href="href" :download="filename">Download CSV</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ReportsItem, Columns } from '@/models';
import store from '@/store';

@Component({
  name: 'Download',
  components: {
  },
})
export default class extends Vue {
  @Prop({ required: true }) items!: ReportsItem[];

  @Prop({ required: true }) columns!: Columns[];

  href = '';

  filename = 'reports.csv';

  // eslint-disable-next-line class-methods-use-this
  get getPageTemplate() {
    return store.getters.pageTemplate && store.getters.pageTemplate.theme;
  }

  onGeneratedCSV() {
    let csv = '';
    const editColsKey = this.columns && Object.keys(this.columns);

    if (editColsKey) {
      editColsKey.forEach((row: any) => {
        csv += this.columns[row].isShow ? `${this.columns[row].title};` : '';
      });
      csv = `${csv.slice(0, -1)}\r\n`;
    }

    this.items.forEach((row: any) => {
      editColsKey.forEach((key: any) => {
        csv += this.columns[key].isShow ? `${row[this.columns[key].key]};` : '';
      });
      csv = `${csv.slice(0, -1)}\r\n`;
    });

    this.href = `data:text/plain;charset=utf-8,${encodeURIComponent(csv)}`;
  }
}

</script>
<style scoped lang="scss">
.light {
  a {
    padding: 10px 20px;
    color: #fff;
    background: #006400;
    border-radius: 5px;
    display: inline-block;
    margin: 20px 0;
  }
}
.dark {
  a {
    padding: 10px 20px;
    color: #333;
    background: #e7e7e7;
    border-radius: 5px;
    display: inline-block;
    margin: 20px 0;
  }
}
</style>
