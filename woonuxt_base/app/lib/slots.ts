export const getSlotChildrenText = (children: Array<{ children: { default?: () => unknown } | string }>): string =>
  children
    .map((node: { children: { default?: () => unknown } | string }) => {
      if (!node.children || typeof node.children === 'string') {
        return node.children || '';
      }
      if (Array.isArray(node.children)) {
        return getSlotChildrenText(node.children);
      }
      if (typeof node.children === 'object' && 'default' in node.children && typeof node.children.default === 'function') {
        return getSlotChildrenText(
          node.children.default() as Array<{
            children: { default?: () => unknown } | string;
          }>,
        );
      }
    })
    .join('');
