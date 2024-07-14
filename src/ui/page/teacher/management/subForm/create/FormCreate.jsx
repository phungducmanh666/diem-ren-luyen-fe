import { useFormik } from "formik";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import DateUtils from "~/logic/utils/DateUtils";

const SignupSchema = Yup.object().shape({
  code: Yup.string().min(1, "Tên không được để trống").required("Bắt buộc"),
  name: Yup.string().min(1, "Tên không được để trống").required("Bắt buộc"),
  start_year: Yup.number().required("Bắt buộc").nullable().min(0),
  end_year: Yup.number()
    .required("Bắt buộc")
    .nullable()
    .min(0)
    .when("start_year", (start_year, schema) => {
      return (
        start_year &&
        schema.min(start_year, "năm kết thúc phải sau năm bắt đầu")
      );
    }),
});

function FormCreate({
  groups,
  currentGroup,
  onHide,
  onSubmit: handleFormSubmit,
  ...props
}) {
  const formik = useFormik({
    initialValues: {
      id: "",
      code: "",
      name: "",
      start_year: DateUtils.getCurrentYear(),
      end_year: DateUtils.getCurrentYear() + 1,
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      handleFormSubmit({ ...values, faculty_code: selectedGroup.code });
    },
  });

  const [selectedGroup, setSelectedGroup] = React.useState(
    currentGroup.id !== 0 ? currentGroup : groups[0]
  );

  return (
    <Modal show centered {...props} size="md">
      <Modal.Header>
        <Modal.Title>{"Thêm mới"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="exampleFormControlSelect1">Khoa</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              value={selectedGroup.id}
              onChange={(e) => {
                const id = parseInt(e.target.value);
                const newGroup = groups.find((item) => item.id === id);
                setSelectedGroup(newGroup);
              }}
            >
              {groups.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="code">Mã lớp</label>
            <input
              id="code"
              name="code"
              type="text"
              className={`form-control ${
                formik.touched.code && formik.errors.code ? "is-invalid" : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.code}
            />
            {formik.touched.code && formik.errors.code ? (
              <div className="invalid-feedback">{formik.errors.code}</div>
            ) : null}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="name">Tên lớp</label>
            <input
              id="name"
              name="name"
              type="text"
              className={`form-control ${
                formik.touched.name && formik.errors.name ? "is-invalid" : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="invalid-feedback">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="start_year">Năm bắt đầu</label>
            <input
              id="start_year"
              name="start_year"
              type="number"
              className={`form-control ${
                formik.touched.start_year && formik.errors.start_year
                  ? "is-invalid"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.start_year}
            />
            {formik.touched.start_year && formik.errors.start_year ? (
              <div className="invalid-feedback">{formik.errors.start_year}</div>
            ) : null}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="end_year">Năm kết thúc</label>
            <input
              id="end_year"
              name="end_year"
              type="number"
              className={`form-control ${
                formik.touched.end_year && formik.errors.end_year
                  ? "is-invalid"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.end_year}
            />
            {formik.touched.end_year && formik.errors.end_year ? (
              <div className="invalid-feedback">{formik.errors.end_year}</div>
            ) : null}
          </div>
          <div className="mt-3 d-flex justify-content-end">
            <Button size="sm" variant="primary" onClick={formik.handleSubmit}>
              Lưu
            </Button>
            <Button
              size="sm"
              variant="danger"
              className="ms-2"
              onClick={onHide}
            >
              Đóng
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default FormCreate;
