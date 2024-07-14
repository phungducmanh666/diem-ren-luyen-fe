import { ErrorMessage, Field, Formik, useFormik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(1, "Tên không được để trống").required("Bắt buộc"),
});

function FormCreateCriteriaGroup({
  onHide,
  onSubmit: handleFormSubmit,
  ...props
}) {
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
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
          <div className="form-group">
            <label htmlFor="name">Tên nhóm tiêu chí</label>
            <input
              id="name"
              name="name"
              type="name"
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
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="primary" onClick={formik.handleSubmit}>
          Lưu
        </Button>
        <Button size="sm" variant="danger" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormCreateCriteriaGroup;
