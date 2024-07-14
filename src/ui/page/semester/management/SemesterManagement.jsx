import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { CiTrash } from "react-icons/ci";
import { ToastContainer } from "react-toastify";
import PromiseToast from "~/ui/components/toast/promiseToast/PromiseToast";
import TemplateManagementPage from "~/ui/template/management/TemplateManagementPage";
import "react-toastify/dist/ReactToastify.css";
import FormConfirm from "~/ui/components/subForm/confirm/FormConfirm";
import FormCreate from "./subForm/create/FormCreate";
import FormEdit from "./subForm/edit/FormEdit";
import SemesterService from "~/logic/service/api/SemesterService";
import { FaEye, FaRegEdit } from "react-icons/fa";

function SemesterManagement(props) {
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(200);
  const [isTablePending, setIsTablePending] = useState(false);
  const [isShowSpinner, setIsShowSpinner] = useState(false);

  const [isShowFormCreate, setIsShowFormCreate] = useState(false);
  const [isShowFormEdit, setIsShowFormEdit] = useState(false);
  const [isShowFormDelete, setIsShowFormDelete] = useState(false);

  const currentRow = React.useRef(null);
  const loadInfo = React.useRef(null);

  const tableColumns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Tên học kì",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Ngày bắt đầu",
      selector: (row) => row.start_date,
      sortable: true,
      width: "150px",
    },
    {
      name: "Ngày kết thúc",
      selector: (row) => row.end_date,
      sortable: true,
      width: "150px",
    },
    {
      cell: (row) => (
        <div className="w-100 d-flex justify-content-end align-items-center">
          <Button
            size="sm"
            variant="primary"
            className="me-2"
            onClick={() => {
              onView(row);
            }}
          >
            <div className="d-flex justify-content-start align-items-center">
              <FaEye className="me-2" />
              Chi tiết
            </div>
          </Button>
          <Button
            size="sm"
            variant="warning"
            className="me-2"
            onClick={() => {
              onEdit(row);
            }}
          >
            <div className="d-flex justify-content-start align-items-center">
              <FaRegEdit className="me-2" />
              Edit
            </div>
          </Button>
          <Button
            size="sm"
            variant="danger"
            className="me-2"
            onClick={() => {
              onDelete(row);
            }}
          >
            <div className="d-flex justify-content-start align-items-center">
              <CiTrash className="me-2" />
              Delete
            </div>
          </Button>
        </div>
      ),
      width: "300px",
    },
  ];

  const callAPILoad = ({ page, rowPerPage, searchText }) => {
    loadInfo.current = { page, rowPerPage, searchText };

    const apiPromise = SemesterService.getSemesters({
      page: page,
      rowPerPage: rowPerPage,
      searchText: searchText,
    });

    setIsTablePending(true);

    PromiseToast({
      promise: apiPromise,
      title: "Load data",
      onSuccess: (data) => {
        console.log(data);
        const { count, rows } = data.data;
        setData(rows);
        setTotalRows(count);
        setIsTablePending(false);
        return "Load data success";
      },
      onFailed: (data) => {
        console.log(data);
        setIsTablePending(false);
        return "Load data failed";
      },
    });
  };
  const callAPICreate = ({ id, name, start_date, end_date }) => {
    const apiPromise = SemesterService.createSemester({
      name,
      start_date,
      end_date,
    });

    setIsShowSpinner(true);

    PromiseToast({
      promise: apiPromise,
      title: "Add data",
      onSuccess: (data) => {
        console.log(data);
        setIsShowSpinner(false);
        setIsShowFormCreate(false);
        callAPILoad(loadInfo.current);
        return "Add data success";
      },
      onFailed: (data) => {
        console.log(data);
        setIsShowSpinner(false);
        return "Add data failed";
      },
    });
  };
  const callAPIEdit = ({ id, name, start_date, end_date }) => {
    const apiPromise = SemesterService.updateSemester({
      id,
      name,
      start_date,
      end_date,
    });

    setIsShowSpinner(true);

    PromiseToast({
      promise: apiPromise,
      title: "Edit data",
      onSuccess: (data) => {
        console.log(data);
        setIsShowSpinner(false);
        setIsShowFormEdit(false);
        callAPILoad(loadInfo.current);
        return "Edit data success";
      },
      onFailed: (data) => {
        console.log(data);
        setIsShowSpinner(false);
        return "Edit data failed";
      },
    });
  };
  const callAPIDelete = ({ id }) => {
    const apiPromise = SemesterService.deleteSemester({ id });
    setIsShowSpinner(true);

    PromiseToast({
      promise: apiPromise,
      title: "Delete data",
      onSuccess: (data) => {
        console.log(data);
        setIsShowSpinner(false);
        setIsShowFormDelete(false);
        callAPILoad(loadInfo.current);
        return "Delete data success";
      },
      onFailed: (data) => {
        console.log(data);
        setIsShowSpinner(false);
        return "Delete data failed";
      },
    });
  };

  const onAdd = () => {
    setIsShowFormCreate(true);
  };
  const onReload = ({ page, rowPerPage, searchText }) => {
    console.log(page, rowPerPage, searchText);
    callAPILoad({ page, rowPerPage, searchText });
  };
  const onImport = () => {
    console.log("import");
  };
  const onExport = () => {
    console.log("export");
  };
  const onView = (row) => {};
  const onEdit = (row) => {
    currentRow.current = row;
    setIsShowFormEdit(true);
  };
  const onDelete = (row) => {
    currentRow.current = row;
    setIsShowFormDelete(true);
  };

  const formAdd = isShowFormCreate && (
    <FormCreate
      onHide={() => setIsShowFormCreate(false)}
      onSubmit={callAPICreate}
    />
  );
  const formEdit = isShowFormEdit && (
    <FormEdit
      currentRow={currentRow.current}
      onHide={() => setIsShowFormEdit(false)}
      onSubmit={callAPIEdit}
    />
  );
  const formDelete = isShowFormDelete && (
    <FormConfirm
      onHide={() => setIsShowFormDelete(false)}
      onConfirm={() => {
        callAPIDelete(currentRow.current);
      }}
      title="Delete"
      content={`Delete: ${currentRow.current.name} ?`}
    />
  );

  return (
    <>
      {formAdd}
      {formEdit}
      {formDelete}
      <TemplateManagementPage
        title={"Quản lý Học kì"}
        onAdd={onAdd}
        onReload={onReload}
        onImport={onImport}
        onExport={onExport}
        data={data}
        tableColumns={tableColumns}
        totalRows={totalRows}
        tablePending={isTablePending}
        showSpinner={isShowSpinner}
      />
      <ToastContainer />
    </>
  );
}

export default SemesterManagement;
