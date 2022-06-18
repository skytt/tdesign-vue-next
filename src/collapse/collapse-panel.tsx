import { defineComponent, ref, computed, inject, Ref, toRefs, Transition } from 'vue';
import props from './collapse-panel-props';
import FakeArrow from '../common-components/fake-arrow';
import { TdCollapsePanelProps } from './type';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';
import useCollapseAnimation from './useCollapseAnimation';
import { collapseProviderInjectionKey } from './constant';

export default defineComponent({
  name: 'TCollapsePanel',
  props,
  setup(props: TdCollapsePanelProps) {
    const renderTNodeJSX = useTNodeJSX();
    const componentName = usePrefixClass('collapse-panel');
    const disableClass = usePrefixClass('is-disabled');
    const clickableClass = usePrefixClass('is-clickable');
    const transitionClass = usePrefixClass('slide-down');
    const { value, disabled, destroyOnCollapse, expandIcon } = toRefs(props);
    const collapseProvider = inject(collapseProviderInjectionKey);
    const { getUniqId, updateCollapseValue } = collapseProvider.value;

    const innerValue = value.value || getUniqId();
    const showExpandIcon = computed(() =>
      expandIcon.value === undefined ? collapseProvider.value.expandIconAll : expandIcon.value,
    );
    if (collapseProvider.value.defaultExpandAll) {
      updateCollapseValue(innerValue);
    }
    const { beforeEnter, enter, afterEnter, beforeLeave, leave, afterLeave } = useCollapseAnimation();
    const headRef = ref<HTMLElement>();
    const isDisabled = computed(() => disabled.value || collapseProvider.value.disableAll);
    const isActive = computed(() =>
      collapseProvider.value.collapseValue instanceof Array
        ? collapseProvider.value.collapseValue.includes(innerValue)
        : collapseProvider.value.collapseValue === innerValue,
    );
    const classes = computed(() => {
      return [componentName.value, { [disableClass.value]: isDisabled.value }];
    });
    const handleClick = (e: MouseEvent) => {
      const canExpand =
        (collapseProvider.value.expandOnRowClick && e.target === headRef.value) ||
        (e.target as Element).getAttribute('name') === 'arrow';
      if (canExpand && !isDisabled.value) {
        updateCollapseValue(innerValue);
      }
    };
    const renderIcon = (direction: string) => {
      return (
        <FakeArrow
          name="arrow"
          isActive={isActive.value}
          overlayClassName={`${componentName.value}__icon ${componentName.value}__icon--${direction}`}
        />
      );
    };
    const renderBlank = () => {
      return <div class={`${componentName.value}__header--blank`}></div>;
    };
    const renderHeader = () => {
      const cls = [
        `${componentName.value}__header`,
        {
          [clickableClass.value]: collapseProvider.value.expandOnRowClick && !isDisabled.value,
        },
      ];
      return (
        <div ref={headRef} class={cls} onClick={handleClick}>
          {showExpandIcon.value && collapseProvider.value.expandIconPlacement === 'left'
            ? renderIcon(collapseProvider.value.expandIconPlacement)
            : null}
          {renderTNodeJSX('header')}
          {renderBlank()}
          {renderTNodeJSX('headerRightContent')}
          {showExpandIcon.value && collapseProvider.value.expandIconPlacement === 'right'
            ? renderIcon(collapseProvider.value.expandIconPlacement)
            : null}
        </div>
      );
    };
    const renderBodyByNormal = () => {
      return (
        <div v-show={isActive.value} class={`${componentName.value}__body`}>
          <div class={`${componentName.value}__content`}>{renderTNodeJSX('default')}</div>
        </div>
      );
    };
    const renderBodyDestroyOnCollapse = () => {
      return isActive.value ? (
        <div class={`${componentName.value}__body`}>
          <div class={`${componentName.value}__content`}>{renderTNodeJSX('default')}</div>
        </div>
      ) : null;
    };
    const renderBody = () => {
      return destroyOnCollapse.value ? renderBodyDestroyOnCollapse() : renderBodyByNormal();
    };
    return () => {
      return (
        <div class={classes.value}>
          <div class={`${componentName.value}__wrapper`}>
            {renderHeader()}
            <Transition
              name={transitionClass.value}
              onBeforeEnter={beforeEnter}
              onEnter={enter}
              onAfterEnter={afterEnter}
              onBeforeLeave={beforeLeave}
              onLeave={leave}
              onAfterLeave={afterLeave}
            >
              {renderBody()}
            </Transition>
          </div>
        </div>
      );
    };
  },
});
