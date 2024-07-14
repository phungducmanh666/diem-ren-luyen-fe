import { useFormik } from "formik";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import DateUtils from "~/logic/utils/DateUtils";

const SignupSchema = Yup.object().shape({
  code: Yup.string().min(1, "Tên không được để trống").required("Bắt buộc"),
  name: Yup.string().min(1, "Tên không được để trống").required("Bắt buộc"),
});

function FormEdit({
  currentRow,
  onHide,
  onSubmit: handleFormSubmit,
  ...props
}) {
  const formik = useFormik({
    initialValues: {
      id: currentRow.id,
      code: currentRow.code,
      name: currentRow.name,
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  return (
    <Modal show centered {...props} size="md">
      <Modal.Header>
        <Modal.Title>{"Chỉnh sửa"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">Mã khoa</label>
            <input
              id="id"
              name="id"
              type="text"
              className={`form-control ${
                formik.touched.id && formik.errors.id ? "is-invalid" : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.id}
              readOnly={true}
            />
            {formik.touched.id && formik.errors.id ? (
              <div className="invalid-feedback">{formik.errors.id}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="code">Mã khoa</label>
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
            <label htmlFor="name">Tên khoa</label>
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
