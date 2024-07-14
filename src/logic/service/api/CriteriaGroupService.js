const { default: axiosInstance } = require("../config");

class CriteriaGroupService {
  /**
   *
   * @param {*} name
   * @returns
   */
  async createCriteriaGroup({ name }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/criteria-groups", {
          name: name,
        })
        .then((res) => {
          if (res.data.code === 201) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getCriteriaGroups({ page, rowperpage, searchText }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("/criteria-groups", {
          params: {
            page: page,
            rowPerPage: rowperpage,
            search: searchText,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getCriteriaByGroup(group_id) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`/criteria-groups/${group_id}/criteria`)
        .then((res) => {
          if (res.data.code === 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async deleteCriteriaGroup({ id }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(`/criteria-groups/${id}`)
        .then((res) => {
          if (res.data.code === 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async updateCriteriaGroup({ id, name }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .put(`/criteria-groups/${id}`, {
          name: name,
        })
        .then((res) => {
          if (res.data.code === 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = new CriteriaGroupService();
