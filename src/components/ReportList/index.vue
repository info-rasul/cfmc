<template>
  <div :class="getPageTemplate">
    <table>
      <thead>
      <tr>
        <th></th>
        <th
          v-for="(column, index) in columns"
          :style="{ display:(!column.isShow ? 'none' : '') }"
          :key="index.key"
        >
          <column-header v-if="column.isShow" :column="column" />
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>
          <controls
            :params="item"
            :is-edit="item.isEdit"
            @confirm-edit="confirmEdit(index)"
          />
        </td>
        <td
          v-for="(column, indexColumn) in columns"
          :key="indexColumn"
          :style="{ display:(!column.isShow ? 'none' : '') }"
        >
          <component
            v-if="column.isShow"
            :is="getComponent(column.type)"
            :type="getType(column.type)"
            :id="index"
            :column="column.key"
            :params="item[column.key]"
            :is-edit="item.isEdit"
            @init-edit="initEdit"
          />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import store from '@/store';
import {
  ReportsItem, Columns, ParamType, ReportsKey,
} from '@/models';
import ColumnHeader from './ColumnHeader.vue';
import Controls from './Controls.vue';
import DateTime from './types/DateTime.vue';
import Input from './types/Input.vue';
import TextArea from './types/TextArea.vue';
import Default from './types/Default.vue';

@Component({
  name: 'ReportsList',
  components: {
    Input,
    ColumnHeader,
    Controls,
    DateTime,
    TextArea,
  },
})
export default class extends Vue {
  @Prop({ required: true }) items!: ReportsItem[];

  @Prop({ required: true }) columns!: Columns;

  editColumns: ReportsItem[] = [];

  tableStyle = { }

  private getComponent(type: ParamType) {
    switch (type) {
      case ParamType.STR:
      case ParamType.NUM:
        return Input;
      case ParamType.TAREA:
        return TextArea;
      case ParamType.DATE:
      case ParamType.DTIME:
        return DateTime;
      default:
        return Default;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private getType(type: ParamType) {
    switch (type) {
      case ParamType.STR:
        return 'text';
      case ParamType.NUM:
        return 'number';
      case ParamType.TAREA:
        return 'textarea';
      case ParamType.DATE:
        return 'date';
      case ParamType.DTIME:
        return 'datetime-local';
      default:
        return Default;
    }
  }

  initEdit(id: number, columns: ReportsKey, params: number | string) {
    this.editColumns[id] = { ...this.editColumns[id], [columns]: params };
  }

  confirmEdit(id: number) {
    const editColsKey: string[] = this.editColumns[id]
      && Object.keys(this.editColumns[id]);

    if (editColsKey) {
      editColsKey.forEach((row: any) => {
        this.items[id][row] = this.editColumns[id][row];
      });
      delete this.editColumns[id];
      this.$emit('show-download', true);
    }
  }

  // eslint-disable-next-line class-methods-use-this,getter-return
  get getPageTemplate() {
    return store.getters.pageTemplate && store.getters.pageTemplate.theme;
  }
}

</script>
<style scoped lang="scss">
.light {
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    color: #333;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
}
.dark {
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    color: #fff;
  }

  td, th {
    border: 1px solid #f2f2f2;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
}
</style>
