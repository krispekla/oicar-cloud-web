import Vue from 'vue'

class Alert {
  constructor() {
    this.defaultConfig = {
      group: 'main',
      duration: 3000,
      speed: 500,
    }
  }

  alert(config) {
    Vue.notify({ ...this.defaultConfig, ...config })
    return new Promise(resolve => {
      setTimeout(() => resolve(), this.defaultConfig.duration)
    })
  }

  /**
   * @param {String} text - success message
   * @param {String} group - optional - in which group to show message (main|modal)
   * @return {Promise} returns promise which will resolve after duration of alert expires
   */
  success(text, group = this.defaultConfig.group) {
    return this.alert({
      text,
      type: 'success',
      title: 'Uspjeh',
      group,
    })
  }

  /**
   * @param {String} text - error message
   * @param {Object} error - exception object
   * @param {String} group - optional - in which group to show message (main|modal)
   * @return {Promise} returns promise which will resolve after duration of alert expires
   */
  error(text, error, group = this.defaultConfig.group) {
    if (error) {
      const errorResponse = error.response || error
      const errorStatus = `${errorResponse.status ? `(${errorResponse.status})` : ''}`
      // eslint-disable-next-line no-param-reassign
      text = `${text} ${errorStatus}`
    }

    return this.alert({
      text,
      type: 'error',
      title: 'Greška',
      group,
    })
  }

  /**
   * @param {String} text - warning message
   * @param {String} group - optional - in which group to show message (main|modal)
   * @return {Promise} returns promise which will resolve after duration of alert expires
   */
  warning(text, group = this.defaultConfig.group) {
    return this.alert({
      text,
      type: 'warn',
      title: 'Upozorenje',
      group,
    })
  }

  /**
   * @param {String} text - info message
   * @param {String} group - optional - in which group to show message (main|modal)
   * @return {Promise} returns promise which will resolve after duration of alert expires
   */
  info(text, group = this.defaultConfig.group) {
    return this.alert({
      text,
      type: 'info',
      title: 'Info',
      group,
    })
  }

  clear() {
    this.alert({ clean: true })
  }
}

export default {
  // eslint-disable-next-line no-shadow
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$alert', {
      get() {
        return new Alert()
      },
    })
  },
}
