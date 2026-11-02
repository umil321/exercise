/**
 * The site answers every API call with HTTP 200 and reports the real outcome
 * in the JSON body, so both values are kept and can be asserted on.
 */
export interface ApiResult {
  httpStatus: number;
  responseCode: number;
  message: string;
}
