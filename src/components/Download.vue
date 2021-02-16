<template>
  <div>
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
    padding: 5px 10px;
    color: #fff;
    background: #404040;
    border-radius: 3px;
    display: inline-block;
    margin: 20px 0;
    text-decoration: none;
    font-family: Arial, sans-serif;
  }
}
</style>
