// properly serializing params that have arrays or objects as values (axios issue)
import { formatDate } from './helper'

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
