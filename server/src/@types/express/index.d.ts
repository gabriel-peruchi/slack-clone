/* eslint-disable */
declare namespace Express {
  export interface Request {
    userId: string
    userSuper: boolean
    organizationId: string
  }
}
