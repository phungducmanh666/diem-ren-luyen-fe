const { default: axiosInstance } = require("../config");

class CriteriaService {
  /**
   *
   * @param {*} name
   * @returns
   */
  async createCriteria({ group_id, name }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/criteria", {
          group_id: group_id,
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

  async getCriteria({ group_id, page, rowperpage, searchText }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("/criteria", {
          params: {
            group_id: group_id,
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

  async deleteCriteria({ id }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(`/criteria/${id}`)
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

  async updateCriteria({ id, name, group_id }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .put(`/criteria/${id}`, {
          name: name,
          group_id: group_id,
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

module.exports = new CriteriaService();
