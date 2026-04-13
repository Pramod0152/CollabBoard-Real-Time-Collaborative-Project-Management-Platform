export class MetaDto {
  /**
   * HIT - the resource was found in server cache
   * MISS - The resource was not found in Servers cache and was served from the origin data-source (Db)
   */
  cacheStatus?: string;

  /** Custome code for the response.  */
  code?: number | string;

  /** Custome code for the response.  */
  httpStatusCode?: number;

  path?: string;

  method?: string;

  timestamp?: Date;

  severity?: string;

  stack?: string;

  app_version?: string;

  setting_version?: string;

  constructor(opt: any) {
    this.cacheStatus = opt.cacheStatus || 'MISS';
  }
}
