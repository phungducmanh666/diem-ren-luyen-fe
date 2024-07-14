const { default: axiosInstance } = require("../config");

class SemesterService {
  async getSemesters({ page, rowperpage, searchText }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("/semesters", {
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

  async createSemester({ name, start_date, end_date }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/semesters", {
          name: name,
          start_date: start_date,
          end_date: end_date,
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

  async deleteSemester({ id }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(`/semesters/${id}`)
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

  async updateSemester({ id, name, start_date, end_date }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .put(`/semesters/${id}`, {
          name: name,
          start_date: start_date,
          end_date: end_date,
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

module.exports = new SemesterService();
