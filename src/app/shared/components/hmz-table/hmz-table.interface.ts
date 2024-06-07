export enum EColumnType {
  Text = 'text',
  Email = 'email',
  Number = 'number',
  Date = 'date',
  DateTime = 'datetime',
  Boolean = 'boolean',
  Select = 'select',
  MultiSelect = 'multiselect',
  Chip = 'chip',
  Image = 'image',
  File = 'file',
  Button = 'button',
  Link = 'link',
  Icon = 'icon',
  Color = 'color',
  Progress = 'progress',
  Rating = 'rating',
  Slider = 'slider',
  Toggle = 'toggle',
  Autocomplete = 'autocomplete',
  Custom = 'custom',
}

export interface ITableColumn {
  field: string;
  fieldName: string;
  type: EColumnType;
  sort?: boolean;
  sortType?: 'asc' | 'desc';
  filter?: boolean;
  event?: (row: any) => void;
  valueFormatter?: (row: any) => any;
  hidden?: boolean;
  width?: string;
  options?: any[];
  multiple?: boolean;
  value?: any;
  disabled?: boolean;
  disabledHeader?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  className?: (row: any) => any;
}

export type MatFormFieldAppearance = 'fill' | 'outline';
