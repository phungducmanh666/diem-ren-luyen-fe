import { useFormik } from "formik";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import DateUtils from "~/logic/utils/DateUtils";

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(1, "Tên không được để trống").required("Bắt buộc"),
  start_date: Yup.date().required("Bắt buộc").nullable(),
  end_date: Yup.date()
    .required("Bắt buộc")
    .nullable()
    .when("start_date", (start_date, schema) => {
      return start_date
        ? schema.min(start_date, "Ngày kết thúc phải sau ngày bắt đầu")
        : schema;
    }),
});

function FormEdit({
  onHide,
  currentRow,
  onSubmit: handleFormSubmit,
  ...props
}) {
  const formik = useFormik({
    initialValues: {
      id: currentRow.id,
      name: currentRow.name,
      start_date: currentRow.start_date,
      end_date: currentRow.end_date,
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  return (
    <Modal show centered {...props} size="md">
      <Modal.Header>
        <Modal.Title>{"Thêm mới"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Tên học kì</label>
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
          <div className="form-group mb-3">
            <label htmlFor="start_date">Ngày bắt đầu</label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              className={`form-control ${
                formik.touched.start_date && formik.errors.start_date
                  ? "is-invalid"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.start_date}
            />
            {formik.touched.start_date && formik.errors.start_date ? (
              <div className="invalid-feedback">{formik.errors.start_date}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="end_date">Ngày kết thúc</label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              className={`form-control ${
                formik.touched.end_date && formik.errors.end_date
                  ? "is-invalid"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.end_date}
            />
            {formik.touched.end_date && formik.errors.end_date ? (
              <div className="invalid-feedback">{formik.errors.end_date}</div>
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

export default FormEdit;
