<template>
  <div>
    <a v-if="loading" href="#" @click="initData()">Обработать данные</a>
    <div v-else>
      <h1>{{ h1Content }}</h1>
      <h2>{{ tableName }}</h2>

      <download v-if="isShowDownload" :items="items" :columns="columns" />

      <report-list
        :items="items"
        :columns="columns"
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

  columns: Columns[] = [];

  initData() {
    this.loading = true;

    MainService.init()
      .then((data: MainResponse) => {
        this.h1Content = data.H1Content;
        this.tableName = data.TableName;
        document.title = data.PageTitle;
        this.setPageTemplate(data.PageTemplate);
        this.setItems(data.Data);
        this.setColumns(data).then(() => {
          this.loading = false;
        });
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  async setItems(items: ReportsItem[]) {
    await items.forEach((item: ReportsItem) => {
      this.items.push({ ...item, isEdit: false });
    });
  }

  async setColumns(data: MainResponse) {
    const colsOrder: any = Object.keys(data.ColsOrder)
      .sort((a: any, b: any) => data.ColsOrder[a] - data.ColsOrder[b]);

    await colsOrder.forEach((key: ReportsKey, value: number) => {
      this.columns[value] = {
        key,
        title: data.ColsTitles[key],
        type: data.ColsTypes[key],
        isShow: data.ColsShow[key] === 1,
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
}
</script>
<style scoped lang="scss">

</style>
