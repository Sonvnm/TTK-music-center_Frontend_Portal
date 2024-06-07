export interface AppSettings {
  navPos: 'side' | 'top';
  theme: 'light' | 'dark';
  dir: 'ltr' | 'rtl';
  showHeader?: boolean;
  headerPos: 'static' | 'fixed' | 'absolute';
  showUserPanel?: boolean;
  sideNavOpened?: boolean;
  sideNavCollapsed?: boolean;
  language?: string;
}
export const SETTING_DEFAULT: AppSettings = {
  navPos: 'side',
  theme: 'light',
  dir: 'ltr',
  headerPos: 'static',
  showUserPanel: true,
  sideNavOpened: true,
  sideNavCollapsed: false,
  language: 'vi-VN',
};
