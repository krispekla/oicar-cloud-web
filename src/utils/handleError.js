import { HttpStatusCode, isDevelopment } from './constants'

const defaultNotFoundMessage = 'Traženi resurs ne postoji.'
const serverErrorMessage =
  'Dogodila se greška na strani servera. Molimo obratite se Vašem administratoru.'

const constructError = ({ field, message }) => ({
  errors: [{ field, messages: [message] }],
})

export default (app, response) => {
  const { status, data } = response

  switch (status) {
    case HttpStatusCode.UNAUTHORIZED:
      app.$store.dispatch('account/logout')
      return
    case HttpStatusCode.BAD_REQUEST:
      app.$store.dispatch('validation/error', constructError(data))
      break
    case HttpStatusCode.NOT_FOUND:
      app.$alert.info(data.message || defaultNotFoundMessage)
      break
    case HttpStatusCode.UNPROCESSABLE_ENTITY:
      app.$store.dispatch('validation/error', data)
      break
    case HttpStatusCode.SERVER_ERROR:
      app.$alert.error(serverErrorMessage)
      break
    default:
      if (isDevelopment) console.error(response)
      break
  }

  return data
}
