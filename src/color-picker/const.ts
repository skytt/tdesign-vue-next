import { Ref } from 'vue';
import { TdColorPickerProps } from '.';
import { prefix } from '../config';

/** 常量 */
// 组件名
export const COMPONENT_NAME = `${prefix}-color-picker`;
// 组件面板
export const COMPONENT_PANEL_NAME = `${COMPONENT_NAME}-panel`;

// 状态样式
export const CLASS_NAME_DISABLE = `${prefix}-is-disabled`;
export const CLASS_NAME_ACTIVE = `${prefix}-is-active`;
export const CLASS_NAME_CURRENT = `${prefix}-is-current`;
export const CLASS_NAME_INLINE = `${prefix}-is-inline`;

// t-popup provide interface
export interface TdColorPickerPopupProvide {
  visible: Ref<boolean>;
  setVisible: (value: boolean) => void;
}

// t-popup provide key
export const TD_COLOR_PICKER_POPUP_PROVIDE = 'TD_COLOR_PICKER_POPUP_PROVIDE';

// usedColors provide interface
export interface TdColorPickerUsedColorsProvide {
  colors: Ref<string[]>;
  activeColor: Ref<string>;
  setActiveColor: (color: string) => void;
  addColor: (color: string) => void;
  removeColor: (color: string) => void;
}

// usedColors provide key
export const TD_COLOR_USED_COLORS_PROVIDE = 'TD_COLOR_USED_COLORS_PROVIDE';

// 最近使用颜色最大个数
export const TD_COLOR_USED_COLORS_MAX_SIZE = 100; // 每行10个

// 颜色模式
export type TdColorMode = 'monochrome' | 'linear-gradient';

// 颜色模式options配置
export const COLOR_MODES = {
  monochrome: '单色',
  'linear-gradient': '渐变',
};

// emit 事件类型
export type TdColorEvent = 'change' | 'palette-bar-change';

// 非透明色格式化类型
export const FORMATS: TdColorPickerProps['format'][] = ['HEX', 'RGB', 'HSL', 'HSV', 'CMYK', 'CSS'];

// 透明色格式化类型

// 默认颜色
export const DEFAULT_COLOR = '#001F97';

// 默认渐变色
export const DEFAULT_LINEAR_GRADIENT = 'linear-gradient(90deg, rgba(241,29,0,1) 0%, rgba(73,106,220,1) 100%);';

// 最近使用/系统预设颜色标题文案
export const TITLE_RECENT_COLORS = '最近使用颜色';
export const TITLE_SWATCH_COLORS = '系统预设颜色';

// 系统色彩
export const DEFAULT_SYSTEM_SWATCH_COLORS = [
  '#ECF2FE',
  '#D4E3FC',
  '#BBD3FB',
  '#96BBF8',
  '#699EF5',
  '#4787F0',
  '#266FE8',
  '#0052D9',
  '#0034B5',
  '#001F97',
  '#FDECEE',
  '#F9D7D9',
  '#F8B9BE',
  '#F78D94',
  '#F36D78',
  '#E34D59',
  '#C9353F',
  '#B11F26',
  '#951114',
  '#680506',
  '#FEF3E6',
  '#F9E0C7',
  '#F7C797',
  '#F2995F',
  '#ED7B2F',
  '#D35A21',
  '#BA431B',
  '#9E3610',
  '#842B0B',
  '#5A1907',
  '#E8F8F2',
  '#BCEBDC',
  '#85DBBE',
  '#48C79C',
  '#00A870',
  '#078D5C',
  '#067945',
  '#056334',
  '#044F2A',
  '#033017',
];

// saturation-panel default rect
export const SATURATION_PANEL_DEFAULT_WIDTH = 320;
export const SATURATION_PANEL_DEFAULT_HEIGHT = 240;
export const SLIDER_DEFAULT_WIDTH = 320;
export const GRADIENT_SLIDER_DEFAULT_WIDTH = 240;
