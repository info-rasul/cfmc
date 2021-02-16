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

export enum ReportsItemEnum {
  idVes = 'id_ves',
  idRank = 'id_rank',
  idRegion = 'id_region',
  idRegionTo = 'id_region_to',
  idInformationSource = 'id_information_source',
  idRegime = 'id_regime',
  date = 'date',
  dateArrival = 'date_arrival',
  timestamp = 'timestamp',
  datetime = 'datetime',
  permit = 'permit',
  note = 'note',
  isEdit = 'isEdit',
  id = 'id',
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
export type ColsTypes = colsString<ReportsItem>;
export type ColsShow = colsShow<ReportsItem>;
export type ReportsData = Array<ReportsItem>;

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
