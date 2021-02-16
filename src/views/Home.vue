<template>
  <div>
    <a v-if="loading" href="#" @click="initData()">Обработать данные</a>
    <div v-else :class="getPageTemplate">
      <h1>{{ h1Content }}</h1>
      <h2>{{ tableName }}</h2>

      <download v-if="isShowDownload" :items="items" :columns="columns" />

      <report-list
        :items="items"
        :columns="columns"
        @shift-column="shiftColumn"
        @show-download="showDownload"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ReportList from '@/components/ReportList/index.vue';
import Download from '@/components/Download.vue';
import { MainService, TemplateService } from '@/services';
import store from '@/store';
import {
  MainResponse,
  ReportsItem,
  ReportsKey,
  Columns,
  ColsOrder,
  ColsTitles,
  ColsTypes,
  ColsShow,
} from '@/models';

@Component({
  components: {
    ReportList,
    Download,
  },
})
export default class Reports extends Vue {
  loading = true;

  isShowDownload = false;

  h1Content = '';

  tableName = '';

  items: ReportsItem[] = [];

  data: ReportsItem[] = [];

  columns: Columns[] = [];

  colsOrder: ColsOrder = {};

  colsTitles: ColsTitles = {};

  colsTypes: ColsTypes = {};

  colsShow: ColsShow = {};

  initData() {
    this.loading = true;

    MainService.init()
      .then((data: MainResponse) => {
        this.h1Content = data.H1Content;
        this.tableName = data.TableName;
        this.colsOrder = data.ColsOrder;
        this.colsTitles = data.ColsTitles;
        this.colsTypes = data.ColsTypes;
        this.colsShow = data.ColsShow;
        this.data = data.Data;
        document.title = data.PageTitle;
        this.setPageTemplate(data.PageTemplate);
        this.initTable();
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  initTable() {
    this.items = [];
    this.setItems();
    this.setColumns().then(() => {
      this.loading = false;
    });
  }

  async setItems() {
    await this.data.forEach((item: ReportsItem) => {
      this.items.push({ ...item, isEdit: false });
    });
  }

  async setColumns() {
    const colsOrderSort = this.sortObject(this.colsOrder);

    await colsOrderSort.forEach((key: ReportsKey, value: number) => {
      this.columns[value] = {
        key,
        title: this.colsTitles[key],
        type: this.colsTypes[key],
        isShow: this.colsShow[key] === 1,
      };
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async setPageTemplate(template: string) {
    await TemplateService.getPageTemplate(template).then((data) => {
      store.dispatch('updatePageTemplate', data);
    });
  }

  showDownload(show: boolean) {
    this.isShowDownload = show;
  }

  // eslint-disable-next-line  class-methods-use-this
  get getPageTemplate() {
    return store.getters.pageTemplate && store.getters.pageTemplate.theme;
  }

  shiftColumn(key: ReportsKey, shift: number) {
    const keyByValue = this.getKeyByValue(this.colsOrder, this.colsOrder[key] + shift);
    if (keyByValue) {
      if (this.colsShow[keyByValue]) {
        const tmp = this.colsOrder[keyByValue];
        this.colsOrder[keyByValue] = this.colsOrder[key];
        this.colsOrder[key] = tmp;
      } else {
        this.shiftColumn(key, shift * 2);
      }
      this.initTable();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getKeyByValue(object: {}, value: string) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  // eslint-disable-next-line class-methods-use-this
  sortObject(object) {
    return Object.keys(object)
      .sort((a: string, b: string) => object[a] - object[b]);
  }
}
</script>
<style scoped lang="scss">
.light {
  font-family: Arial, sans-serif;
}
</style>
