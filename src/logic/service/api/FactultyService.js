const { default: axiosInstance } = require("../config");

class FacultyService {
  async createFaculty({ code, name }) {
    return await new Promise((resolve, reject) => {
      axiosInstance
        .post("/faculties", {
          code: code,
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

  async getFaculties({ page, rowPerPage, searchText }) {
    return await new Promise((resolve, reject) => {
      axiosInstance
        .get("/faculties", {
          params: {
            page: page,
            rowPerPage: rowPerPage,
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

  async deleteFaculty({ id }) {
    return await new Promise((resolve, reject) => {
      axiosInstance
        .delete(`/faculties/${id}`)
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

  async editFaculty({ id, code, name }) {
    return await new Promise((resolve, reject) => {
      axiosInstance
        .put(`/faculties/${id}`, {
          code: code,
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

module.exports = new FacultyService();
