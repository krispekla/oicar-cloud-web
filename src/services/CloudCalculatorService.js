// eslint-disable-next-line no-unused-vars
import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import api from '@utils/api'

class CloudCalculatorService {
  /**
   *
   * @param {String} resource - Main server URL that will be used for the request
   */
  constructor(resource) {
    this.apiInstance = api
    this.resource = resource
  }

  /**
   *
   * @param {Boolean} [onlyActive=false] - Get only data with active flag set to 1
   * @param {Boolean} [onlyBase=false] - Get only neccesary base data
   * @returns {Promise<AxiosResponse>}
   */
  getAll(onlyActive = false, onlyBase = false) {
    const path = onlyBase === true ? `${this.resource}/baseAll` : this.resource
    return this.apiInstance.get(path, { params: { onlyActive } })
  }

  /**
   *
   * @param {(String|Number)} id - Unique identifier of data to be returned
   * @returns {Promise<AxiosResponse>}
   */
  get(id) {
    return this.apiInstance.get(`${this.resource}/${id}`)
  }

  /**
   *  @param {Boolean} [onlyBase=false] - Get only neccesary base data
   *  @returns {Promise<AxiosResponse>}
   */
  getList(onlyBase = false) {
    const path = `${this.resource}/${onlyBase ? 'baseList' : 'list'}`
    return this.apiInstance.get(path)
  }

  /**
   *
   * @param {Number} [page=1] - Page number
   * @param {Number} [pageSize=10] - Number of data per page
   * @param {Object} [searchParams={}] - Get filtered paginated data
   * @param {Boolean} [onlyBase=false] - Get only neccesary base data
   * @returns {Promise<AxiosResponse>}
   */
  getPaginated(page = 1, pageSize = 10, searchParams = {}, onlyBase = false) {
    const path = `${this.resource}/${onlyBase} ? 'basePaginated' : 'paginated'`
    return this.apiInstance.get(path, {
      params: {
        ...searchParams,
        page,
        pageSize,
      },
    })
  }

  /**
   *
   * @param {Object} data - Data to send to server
   * @returns {Promise<AxiosResponse>}
   */
  create(data) {
    return this.apiInstance.post(`${this.resource}`, data)
  }

  /**
   *
   * @param {Object} data - Data to send to server
   * @returns {Promise<AxiosResponse>}
   */
  update(data) {
    return this.apiInstance.put(`${this.resource}`, data)
  }

  /**
   *
   * @param {(String|Number)} id - Unique identifier of data to be deleted
   * @returns {Promise<AxiosResponse>}
   */
  delete(id) {
    return this.apiInstance.delete(`${this.resource}`, { params: { id } })
  }

  /**
   *
   * @param {AxiosRequestConfig} config - Custom service request
   * @returns {Promise<AxiosResponse>}
   */
  custom(config) {
    if (config !== undefined && typeof config === 'object')
      config.url = `${this.resource}/${config.url}`

    return this.apiInstance(config)
  }
}

export default CloudCalculatorService
