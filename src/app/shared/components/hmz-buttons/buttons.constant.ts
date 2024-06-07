export enum EButtonType {
  Add = 1,
  Edit = 2,
  Delete = 3,
  Save = 4,
  Cancel = 5,
  Search = 6,
  Refresh = 7,
  Print = 8,
  Export = 9,
  Import = 10,
  View = 11,
  Approve = 12,
  Reject = 13,
  Close = 14,
  Back = 15,
  Next = 16,
  Loading = 17,
  Yes = 18,
  No = 19,
  Upload = 20,
  Download = 21,
  SendMail = 22,
  ChangePassword = 23,
  Chat = 24,
}

export enum EButtonStyle {
  Primary = 'btn btn-primary',
  Secondary = 'btn btn-secondary',
  Success = 'btn btn-success',
  Danger = 'btn btn-danger',
  Warning = 'btn btn-warning',
  Info = 'btn btn-info',
  Light = 'btn btn-light',
  Dark = 'btn btn-dark',
  Link = 'btn btn-link',
  OutlinePrimary = 'btn-outline-primary',
  OutlineSecondary = 'btn-outline-secondary',
  OutlineSuccess = 'btn-outline-success',
  OutlineDanger = 'btn-outline-danger',
  OutlineWarning = 'btn-outline-warning',
  OutlineInfo = 'btn-outline-info',
  OutlineLight = 'btn-outline-light',
  OutlineDark = 'btn-outline-dark',
  OutlineLink = 'btn-outline-link',
}
export enum EButtonMatStyle {
  Primary = 'primary',
  Accent = 'accent',
  Warn = 'warn',
}

export enum EButtonSize {
  Small = 'btn-sm',
  Large = 'btn-lg',
  Block = 'btn-block',
}
// Mat-icon
export enum EButtonIcon {
  Add = 'add',
  Edit = 'create',
  Delete = 'delete',
  Save = 'save',
  Cancel = 'cancel',
  Search = 'search',
  Refresh = 'refresh',
  Print = 'print',
  Export = 'cloud_download',
  Import = 'upload_file',
  View = 'visibility',
  Approve = 'check',
  Reject = 'cancel',
  Close = 'close',
  Back = 'arrow_back',
  Next = 'arrow_forward',
  Loading = 'autorenew',
  Yes = 'check',
  No = 'cancel',
  Upload = 'cloud_upload',
  Download = 'cloud_download',
  SendMail = 'send_mail',
  Password = 'password',
  Payment = 'payment',
  Chat = 'chat',
}
export type ClickFunction = () => any;
export class IButton {
  id: EButtonType;
  title: string;
  icon: EButtonIcon;
  style?: EButtonStyle | EButtonMatStyle;
  size?: EButtonSize;
  isShow?: boolean = true;
  disabled?: boolean;
  isShowIcon?: boolean;
  isShowTitle?: boolean;
  isShowLoading?: boolean;
  isShowLoadingIcon?: boolean;
  isShowLoadingTitle?: boolean;
  permission?: string[];
  click?: ClickFunction;
  hover?: ClickFunction;
}

export class HMZButtons {
  static buttonDefaults: IButton[] = [
    {
      id: EButtonType.Add,
      title: 'common.button.add',
      icon: EButtonIcon.Add,
      style: EButtonStyle.Primary,
      isShow: true,
      isShowIcon: true,
      isShowTitle: true,
      isShowLoading: false,
      isShowLoadingIcon: false,
      isShowLoadingTitle: false,
      disabled: true,
      click: () => {},
    },
    {
      id: EButtonType.Edit,
      title: 'common.button.edit',
      icon: EButtonIcon.Edit,
      style: EButtonStyle.Primary,
      isShow: true,
      isShowIcon: true,
      isShowTitle: true,
      isShowLoading: false,
      isShowLoadingIcon: false,
      isShowLoadingTitle: false,
      click: () => {},
    },
    {
      id: EButtonType.Delete,
      title: 'common.button.delete',
      icon: EButtonIcon.Delete,
      style: EButtonStyle.Danger,
      isShow: true,
      isShowIcon: true,
      isShowTitle: true,
      isShowLoading: false,
      isShowLoadingIcon: false,
      isShowLoadingTitle: false,
      click: () => {},
    },
    {
      id: EButtonType.Save,
      title: 'Lưu',
      icon: EButtonIcon.Save,
      style: EButtonStyle.Success,
      isShow: true,
      isShowIcon: true,
      isShowTitle: true,
      isShowLoading: false,
      isShowLoadingIcon: false,
      isShowLoadingTitle: false,
      click: () => {},
    },
    {
      id: EButtonType.Cancel,
      title: 'common.button.cancel',
      icon: EButtonIcon.Cancel,
      style: EButtonStyle.Danger,
      isShow: true,
      isShowIcon: true,
      isShowTitle: true,
      isShowLoading: false,
      isShowLoadingIcon: false,
      isShowLoadingTitle: false,
      click: () => {},
    },
    {
      id: EButtonType.Export,
      title: 'common.button.export',
      icon: EButtonIcon.Export,
      style: EButtonStyle.Success,
      isShow: true,
      isShowIcon: true,
      isShowTitle: true,
      isShowLoading: false,
      isShowLoadingIcon: false,
      isShowLoadingTitle: false,
      click: () => {},
    },
  ];
}
