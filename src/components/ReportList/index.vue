<template>
  <div>
    <table>
      <thead>
      <tr>
        <th></th>
        <th v-for="(column, index) in columns" :class="{'hide': !column.isShow}" :key="index.key">
          <column-header
            v-if="column.isShow"
            :column="column"
            @shift-column="shiftColumn"
          />
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
          :class="{'hide': !column.isShow}"
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
import {
  ReportsItem, Columns, ParamType, ReportsKey, ReportsItemEnum,
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
      editColsKey.forEach((row: string) => {
        if (this.items[id][row]) {
          this.items[id][row] = this.editColumns[id][row];
        }
      });
      delete this.editColumns[id];
      this.$emit('show-download', true);
    }
  }

  shiftColumn(key: ReportsKey, shift: -1 | 1) {
    this.$emit('shift-column', key, shift);
  }
}

</script>
<style scoped lang="scss">
.light {
  table {
    border-collapse: collapse;
    width: 100%;
    color: #333;
    font-size: 14px;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

  .hide {
    display: none;
  }
}
</style>
