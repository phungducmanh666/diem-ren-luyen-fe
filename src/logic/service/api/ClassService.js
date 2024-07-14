const { default: axiosInstance } = require("../config");

class ClassService {
  async getFaculties() {
    return await new Promise((resolve, reject) => {
      axiosInstance
        .get("/faculties")
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

  async getClasses({ page, rowPerPage, searchText, faculty_code }) {
    console.log(page, rowPerPage, searchText, faculty_code);
    return await new Promise((resolve, reject) => {
      axiosInstance
        .get("/classes", {
          params: {
            page: page,
            rowPerPage: rowPerPage,
            search: searchText,
            faculty_code: faculty_code,
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

  async createClass({ code, name, start_year, end_year, faculty_code }) {
    return await new Promise((resolve, reject) => {
      axiosInstance
        .post("/classes", {
          code,
          name,
          start_year,
          end_year,
          faculty_code,
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

  async editClass({ id, code, name, start_year, end_year, faculty_code }) {
    return await new Promise((resolve, reject) => {
      axiosInstance
        .put(`/classes/${id}`, {
          code,
          name,
          start_year,
          end_year,
          faculty_code,
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

  async deleteClass({ id }) {
    return await new Promise((resolve, reject) => {
      axiosInstance
        .delete(`/classes/${id}`)
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

module.exports = new ClassService();
