export type ReportsItem = {
  'id_ves': number;
  'id_rank': number;
  'id_region': number;
  'id_region_to': number;
  'id_information_source': number;
  'id_regime': number;
  'date': string;
  'date_arrival': string | null;
  'timestamp': string | null;
  'datetime': string | null;
  'permit': string | null;
  'note': string | null;
  'isEdit'?: boolean;
  'id'?: number;
}

type colsString<T> = {
  [P in keyof T]: string;
};

type colsNumber<T> = {
  [P in keyof T]: number;
};

type colsShow<T> = {
  [P in keyof T]: 1 | 0;
};

export type ReportsKey = keyof ReportsItem;
export type ColsTitles = colsString<ReportsItem>;
export type ColsOrder = colsNumber<ReportsItem>;
type ColsTypes = colsString<ReportsItem>;
type ColsShow = colsShow<ReportsItem>;
type ReportsData = Array<ReportsItem>;

export type MainResponse = {
  'PageTemplate': string;
  'PageTitle': string;
  'H1Content': string;
  'TableName': string;
  'ColsTitles': ColsTitles;
  'ColsOrder': ColsOrder;
  'ColsTypes': ColsTypes;
  'ColsShow': ColsShow;
  'Data': ReportsData;
}

export type Columns = {
  'key': ReportsKey;
  'title': string | undefined;
  'type': string | undefined;
  'isShow': boolean;
}

export enum ParamType {
  NUM = 'NUM',
  STR = 'STR',
  DATE = 'DATE',
  DTIME = 'DTIME',
  TAREA = 'TAREA',
}
