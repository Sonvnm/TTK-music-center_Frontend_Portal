import { ApiConstant } from "src/app/shared/ApiConstant";

export class AuthConstant extends ApiConstant {

  static Auth = {
    login: ApiConstant.BASE_URL + '/auth/login',
    register: ApiConstant.BASE_URL + '/auth/register',
    logout: ApiConstant.BASE_URL + '/auth/logout',
    refreshToken: ApiConstant.BASE_URL + '/auth/refresh-token',
  };
}
