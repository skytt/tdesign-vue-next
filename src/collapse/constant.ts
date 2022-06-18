import { InjectionKey, ComputedRef } from 'vue';
import { TdCollapseProps, CollapsePanelValue, CollapseValue } from './type';

export const collapseProviderInjectionKey: InjectionKey<
  ComputedRef<{
    collapseValue: CollapseValue;
    updateCollapseValue: (value: CollapsePanelValue) => void;
    getUniqId: () => number;
    defaultExpandAll: TdCollapseProps['defaultExpandAll'];
    disableAll: TdCollapseProps['disabled'];
    expandIconPlacement: TdCollapseProps['expandIconPlacement'];
    expandOnRowClick: TdCollapseProps['expandOnRowClick'];
    expandIconAll: TdCollapseProps['expandIcon'];
  }>
> = Symbol('collapseProvider');
