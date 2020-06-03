import { ValidationProvider } from 'vee-validate'
export const componentValidationMixin = {
  props: {
    name: {
      type: String,
      required: true,
    },
    rules: [String, Object],
  },
  computed: {
    calculateValidations() {
      if (this.required && !this.rules) return 'required'
      if (!this.required && isEmptyObject(this.rules)) return

      return this.required ? `required|${this.rules}` : this.rules
    },
  },
  components: { ValidationProvider },
}

// properly serializing params that have arrays or objects as values (axios issue)

export default params => {
  const keys = Object.keys(params)
  let options = ''

  const formatParam = (key, value) => `${key}=${encodeURIComponent(value)}&`

  keys.forEach(key => {
    const isParamNotNull = params[key] !== null
    const isParamTypeObject = typeof params[key] === 'object'
    const isParamTypeArray = isParamTypeObject && isParamNotNull && params[key].length >= 0
    const isParamTypeDate = isParamTypeObject && params[key] instanceof Date

    if ((!isParamTypeObject || isParamTypeDate) && isParamNotNull) {
      if (isParamTypeDate) {
        // eslint-disable-next-line no-param-reassign
        params[key] = formatDate(params[key], 'YYYY-MM-DD')
      }

      options += formatParam(key, params[key])
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach(element => {
        options += formatParam(key, element)
      })
    }
  })

  return options ? options.slice(0, -1) : options
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

import moment from 'moment'

export const formatDate = (date, format = MomentFormat.DATE) => moment(date).format(format)
// check if object is empty
export const isEmptyObject = object => {
  if (!isObject(object) || object == null) return false
  return Object.keys(object).length < 1
}

export const copy = object => JSON.parse(JSON.stringify(object))

// check if array is empty
export const isEmptyArray = array => {
  if (!Array.isArray(array)) return false
  return array.length === 0
}
// check if string is null or empty
export const isNullOrEmptyString = value => {
  if (value == null) {
    return true
  }
  if (!isString(value)) {
    return null
  }

  return value === ''
}

// check if value is string
export const isString = value => typeof value === 'string'

// check if value is object
export const isObject = value => {
  if (value == null) return false
  return typeof value === 'object' && value.constructor === Object
}

// check if value is boolean
export const isBoolean = value => typeof value === 'boolean'

// clear all properties and set them to default values
export const clearObject = (object, propertiesToIgnore = []) => {
  for (const key in object) {
    if (propertiesToIgnore.includes(key)) {
      continue
    }

    const propValue = object[key]

    if (isObject(propValue)) {
      clearObject(propValue)
    } else if (isBoolean(propValue)) {
      // eslint-disable-next-line no-param-reassign
      object[key] = false
    } else if (Array.isArray(propValue)) {
      // eslint-disable-next-line no-param-reassign
      object[key] = []
    } else {
      // eslint-disable-next-line no-param-reassign
      object[key] = null
    }
  }
}
