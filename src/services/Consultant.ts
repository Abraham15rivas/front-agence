// eslint-disable-next-line
/* eslint-disable */

import axios from './axios'

class Consultant {
  async getListConsultants () {
    return await axios.get('consultants')
  }

  async getReport (params: Object) {
    return await axios.get('consultants/reports', { params })
  }

  async getGraph (params: Object, type: string) {
    return await axios.get(`consultants/${type}/graph`, { params })
  }
}

export default new Consultant()