type Cart = import('#gql').CartFragment;
type Customer = import('#gql').CustomerFragment;
type Viewer = import('#gql').ViewerFragment;
type PaymentGateway = import('#gql').PaymentGatewayFragment;
type Order = import('#gql').OrderFragmentFragment;
type ProductBase = import('#gql').GetProductQuery['product'];
type SimpleProduct = import('#gql').SimpleProductFragment;
type VariableProduct = import('#gql').VariableProductFragment;
type ExternalProduct = import('#gql').ExternalProductFragment;
type DownloadableItem = import('#gql').DownloadableItemFragment;
type ProductCategory = import('#gql').ProductCategoryFragment;
type Product = ProductBase & SimpleProduct & VariableProduct & ExternalProduct;
type Address = import('#gql').AddressFragment;
type Terms = import('#gql').TermsFragment;
type VariationAttribute = import('#gql').VariationAttributeFragment;
type Comment = import('#gql').CommentFragment;
type ProductAttribute = import('#gql').ProductAttributeFragment;

interface ProductAttributeInput {
  attributeName: string;
  attributeValue: string;
}

interface PaymentGateways {
  nodes: PaymentGateway[];
}

interface Variation {
  name?: string | null;
  databaseId?: number;
  price?: string | null;
  regularPrice?: string | null;
  salePrice?: string | null;
  slug?: string | null;
  stockQuantity?: number | null;
  stockStatus?: StockStatusEnum | null;
  hasAttributes?: boolean | null;
  image?: ProductImage | null;
  attributes?: { nodes: VariationAttribute[] } | null;
  node?: SimpleProduct | VariableProduct;
}

interface ProductImage {
  sourceUrl?: string | null | undefined;
  cartSourceUrl?: string | null | undefined;
  altText?: string | null | undefined;
  title?: string | null | undefined;
}

interface AppliedCoupon {
  description?: string | null;
  discountTax: string;
  discountAmount: string;
  code: string;
}

interface ShippingMethodRate {
  cost?: string | null;
  id: string;
  label?: string | null;
}

interface GeoLocation {
  code: string;
  name: string;
}

interface LineItem {
  quantity?: number | null;
  total?: string | null;
  product?: Product | null;
  variation?: Variation | null;
}

interface WooNuxtSEOItem {
  provider: string;
  url?: string;
  handle?: string;
}

interface WooNuxtFilter {
  slug: string;
  label?: string;
  hideEmpty: boolean;
  showCount: boolean;
  openByDefault: boolean;
  terms: Terms;
}

import type { Link as ULink, Avatar, Badge, Chip, Command, Tooltip } from '#ui/types';

type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: Avatar;
  status: UserStatus;
  location: string;
}

interface Mail {
  id: number;
  unread?: boolean;
  from: User;
  subject: string;
  body: string;
  date: string;
}

interface Member {
  name: string;
  username: string;
  role: 'member' | 'owner';
  avatar: Avatar;
}

interface Notification {
  id: number;
  unread?: boolean;
  sender: User;
  body: string;
  date: string;
}

type Period = 'daily' | 'weekly' | 'monthly';

interface Range {
  start: Date;
  end: Date;
}

interface Link extends ULink {
  label: string;
  class?: string;
  click?: (...args: unknown[]) => void;
}

interface AsideLink extends Link {
  icon?: string;
  iconClass?: string;
}

interface HeaderPopoverLink extends Link {
  description?: string;
  icon?: string;
  iconClass?: string;
}

interface HeaderLink extends Link {
  children?: HeaderPopoverLink[];
}

interface FooterLink extends Link {}

interface PageLink extends Link {
  icon?: string;
  iconClass?: string;
  avatar?: Avatar;
  avatarClass?: string;
}

interface NavigationLink extends Link {
  icon?: string;
  iconClass?: string;
  badge?: string | Badge;
}

interface NavigationTree extends NavigationLink {
  children?: NavigationTree[];
}

interface NavigationGroup {
  type?: 'link' | 'accordion';
  defaultOpen?: boolean;
  children: NavigationTree[];
}

interface ContentSearchLink extends Link, Omit<Command, 'id'> {}

interface DashboardSidebarLink extends Link {
  labelClass?: string;
  icon?: string;
  iconClass?: string;
  avatar?: Avatar;
  avatarClass?: string;
  chip?: string | Chip;
  chipClass?: string;
  badge?: string | number | Badge;
  tooltip?: Tooltip;
  defaultOpen?: boolean;
  // Only applicable to links with children
  draggable?: boolean;
  collapsible?: boolean;
  children?: DashboardSidebarLink[];
}

interface Link extends ULink {
  label: string;
  class?: string;
  click?: (...args: unknown[]) => void;
}

interface AsideLink extends Link {
  icon?: string;
  iconClass?: string;
}

interface HeaderPopoverLink extends Link {
  description?: string;
  icon?: string;
  iconClass?: string;
}

interface HeaderLink extends Link {
  children?: HeaderPopoverLink[];
}

interface FooterLink extends Link {}

interface PageLink extends Link {
  icon?: string;
  iconClass?: string;
  avatar?: Avatar;
  avatarClass?: string;
}

interface NavigationLink extends Link {
  icon?: string;
  iconClass?: string;
  badge?: string | Badge;
}

interface NavigationTree extends NavigationLink {
  children?: NavigationTree[];
}

interface NavigationGroup {
  type?: 'link' | 'accordion';
  defaultOpen?: boolean;
  children: NavigationTree[];
}

interface ContentSearchLink extends Link, Omit<Command, 'id'> {}

interface DashboardSidebarLink extends Link {
  labelClass?: string;
  icon?: string;
  iconClass?: string;
  avatar?: Avatar;
  avatarClass?: string;
  chip?: string | Chip;
  chipClass?: string;
  badge?: string | number | Badge;
  tooltip?: Tooltip;
  defaultOpen?: boolean;
  // Only applicable to links with children
  draggable?: boolean;
  collapsible?: boolean;
  children?: DashboardSidebarLink[];
}

type Review = {
  id: string;
  icon: string;
  quote: string;
  author: {
    name: string;
    description: string;
    avatar: {
      src: string;
      loading: string;
    };
  };
  card: boolean;
  width: string;
};

interface FlashDesign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  categoryId: string;
  collectionId?: string;
}

interface FlashDesignData {
  title: string;
  description: string;
  category: string;
  keywords: string[];
  src: string;
}
type ImageType = 'Portfolio' | 'outlines' | 'digital-creations' | 'ballpoint' | 'natasha';

interface ImageObject {
  id: string;
  url: string;
}
