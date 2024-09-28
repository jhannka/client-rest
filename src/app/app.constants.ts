import {environment} from "../environments/environment";


const EndPoint = (resource: string): string => {
  return environment.url_api + resource;
};

export const CONSTANT = {
  AUTH: {
    URL: {
      LOGIN: environment.url + 'login',
      INFOUSER: EndPoint('user/auth')
    }
  },
  USER: {
    URL: {
      BASE: EndPoint('users'),
      RESET_PASSWORD: EndPoint('reset/password')
    }
  },
  DEPARTMENT: {
    URL: {
      BASE: EndPoint('department'),
    }
  }
}
