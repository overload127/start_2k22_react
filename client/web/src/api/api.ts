import { AxiosResponse } from 'axios';
import { instancePrivate, instancePublic } from './instances';
import { IAuthResponse } from '../models/response/AuthResponse';
import { INewResponse, IProductResponse } from '../models/response/CMSResponse';
import { ICityResponse } from '../models/response/CityResponse';

export const authAPI = {
  async login(username: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return instancePublic.post<IAuthResponse>('/auth/login', {
      email: username,
      password,
    });
  },
  async checkAuth(): Promise<AxiosResponse<IAuthResponse>> {
    return instancePrivate.get<IAuthResponse>('/auth/check', {});
  },
  async logout(): Promise<void> {
    return instancePrivate.post('/auth/logout', {});
  },
};

export const cmsAPI = {
  async news(): Promise<AxiosResponse<Array<INewResponse>>> {
    return instancePublic.get<Array<INewResponse>>('/cms/news', {});
  },
  async product(): Promise<AxiosResponse<IProductResponse>> {
    return instancePublic.get<IProductResponse>('/cms/product', {});
  },
};

export const cityAPI = {
  async detail(): Promise<AxiosResponse<ICityResponse>> {
    return instancePrivate.get<ICityResponse>('/city/detail', {});
  },
  async rts(): Promise<AxiosResponse<Array<string>>> {
    return instancePrivate.get<Array<string>>('/city/rts', {});
  },
  // async list(): Promise<AxiosResponse<AuthResponse>> {
  //   return instancePrivate.get('/city/rt_objects', {});
  // },
};

// export const feedBackAPI = {
//   sendMail(requestType, userName, userPhone, userEmail, messageBody, fileUpload) {
//     return instance.post(
//       '/feedback/send_email',
//       {
//         email: [userEmail],
//         name: userName,
//         phone_number: userPhone,
//         type_msg: requestType,
//         body: messageBody,
//         file_body: fileUpload,
//       },
//       headers(),
//     );
//   },
// };

// export const crossroadAPI = {
//   listItems() {
//     return instance.get(`/crossroad/list_item_for_map`, headers());
//   },
//   item(rtsId) {
//     return instance.get(`/crossroad/rts/${rtsId}/item`, headers());
//   },
//   img(rtsId) {
//     return instance.get(`/crossroad/rts/${rtsId}/img`, headers());
//   },
//   detail(rtsId) {
//     return instance.get(`/crossroad/rts/${rtsId}/detail`, headers());
//   },
//   phases(rtsId) {
//     return instance.get(`/crossroad/rts/${rtsId}/phases`, headers());
//   },
//   events(rtsId, startTimeStampMilliSeconds, endTimeStampMilliSeconds) {
//     return instance.post(
//       `/crossroad/rts/${rtsId}/events`,
//       {
//         dtime_start: startTimeStampMilliSeconds,
//         dtime_end: endTimeStampMilliSeconds,
//       },
//       headers(),
//     );
//   },
//   so(rtsId, startTimeStampMilliSeconds, endTimeStampMilliSeconds) {
//     return instance.post(
//       `/crossroad/rts/${rtsId}/so`,
//       {
//         dtime_start: startTimeStampMilliSeconds,
//         dtime_end: endTimeStampMilliSeconds,
//       },
//       headers(),
//     );
//   },
//   streetDirs(rtsId) {
//     return instance.get(`/crossroad/rts/${rtsId}/street_dirs`, headers());
//   },
//   streetDirKts(rtsId, streetDirOID, startTimeStampMilliSeconds, endTimeStampMilliSeconds) {
//     return instance.post(
//       `/crossroad/rts/${rtsId}/kts/${streetDirOID}`,
//       {
//         dtime_start: startTimeStampMilliSeconds,
//         dtime_end: endTimeStampMilliSeconds,
//       },
//       headers(),
//     );
//   },
//   createReportPDF(rtsId, startTimeStampMilliSeconds1, endTimeStampMilliSeconds1, startTimeStampMilliSeconds2, endTimeStampMilliSeconds2, typeReport) {
//     return instance.post(
//       `/crossroad/rts/${rtsId}/report/tasks`,
//       {
//         type_report: typeReport,
//         period1: {
//           dtime_start: startTimeStampMilliSeconds1,
//           dtime_end: endTimeStampMilliSeconds1,
//         },
//         period2: {
//           dtime_start: startTimeStampMilliSeconds2,
//           dtime_end: endTimeStampMilliSeconds2,
//         },
//       },
//       headers(),
//     );
//   },
//   checkReportPDF(rtsId, taskOID) {
//     return instance.get(`/crossroad/rts/${rtsId}/report/tasks/${taskOID}`, {}, headers());
//   },
//   stateRtm(rtmId) {
//     return instance.get(`/crossroad/rtm/${rtmId}/detail`, headers());
//   },
//   staticRtm(rtmId) {
//     return instance.get(`/crossroad/rtm/${rtmId}/static`, headers());
//   },
//   setSettingsRtm(rtmId, control, mode, sequence, durations, phase) {
//     return instance.post(
//       `/crossroad/rtm/${rtmId}/set_param`,
//       {
//         oID: rtmId,
//         control,
//         mode,
//         sequence,
//         durations,
//         phase,
//       },
//       headers(),
//     );
//   },
//   setSettingsRts(rtmId, program, mode, sequence, durations) {
//     return instance.post(
//       `/crossroad/rts/${rtmId}/set_param`,
//       {
//         oID: rtmId,
//         program,
//         mode,
//         sequence,
//         durations,
//       },
//       headers(),
//     );
//   },
// };
