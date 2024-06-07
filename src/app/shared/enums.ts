export enum ETableDefault {
  DefaultPageSize = 10,
  DefaultPageIndex = 1,
  DefaultSortBy = 'code',
  DefaultSortDirection = 'asc',
}

export enum ERoles {
  Administrator = 'Admin',
  Moderator = 'Mod',
  Member = 'Member',
}

export enum DropAndDragColor {
  DEFAULT = 'transparent',
  OVER = '#ACADAD',
}

export enum ETypeHistory {
  Create,
  Update,
  Delete,
  Login,
  Logout,
  Error,
  Report,
  Help,
  Transaction,
  Other,
}

export enum EOrderStatus {
  New,
  Pending,
  Canceled,
  Done,
}

export enum EFeedBackStatus {
  New,
  InProgress,
  Canceled,
  Done,
}
export enum ETypeFeedBackType {
  Error,
  Report,
  Help,
  Other,
}

export enum EScheduleStatus {
  Pending,
  Accepted,
  Rejected,
  Closed,
}
