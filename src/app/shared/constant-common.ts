export class ConstantCommon {
  static LocalStorageKey = {
    USER_LOGIN: 'user_login',
  };
  static DialogSize = {
    SMALL: '10vh',
    MEDIUM: '20vh',
    CONFIRM_DIALOG: '30rem',
    LARGE: '50vh',
    LARGE_XL: '60vh',
    EXTRA_LARGE: '90vh',
    VH100: '100vh',
    VH120: '120vh',
    VH150: '150vh',
  };

  static getAccessToken() {
    const user = localStorage.getItem(ConstantCommon.LocalStorageKey.USER_LOGIN);
    if (user) {
      const userPare: any = JSON.parse(user);
      if (userPare) {
        return userPare.token.accessToken;
      }
    }
    return '';
  }

  static StringIsNullOrSpace(str: any): boolean {
    if (str === true || str === false) {
      return false;
    }
    if (str === null || str === undefined || str === '') {
      return true;
    }
    return false;
  }
}
