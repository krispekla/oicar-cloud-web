export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'

export const MediaType = {
  APPLICATION_JSON: 'application/json',
}

export const HttpStatusCode = {
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  SERVER_ERROR: 500,
}

export const MomentFormat = {
  DATE: 'DD.MM.YYYY.',
  DATE_TIME: 'DD.MM.YYYY. HH:mm',
  TIME: 'HH:mm',
}
