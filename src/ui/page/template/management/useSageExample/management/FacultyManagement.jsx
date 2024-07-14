import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import PromiseToast from "~/ui/components/toast/promiseToast/PromiseToast";
import TemplateManagementPage from "~/ui/template/management/TemplateManagementPage";
import "react-toastify/dist/ReactToastify.css";
import FormConfirm from "~/ui/components/subForm/confirm/FormConfirm";

function FacultyManagement(props) {
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(200);
  const [isTablePending, setIsTablePending] = useState(false);
  const [isShowSpinner, setIsShowSpinner] = useState(false);

  const [isShowFormCreate, setIsShowFormCreate] = useState(false);
  const [isShowFormEdit, setIsShowFormEdit] = useState(false);
  const [isShowFormDelete, setIsShowFormDelete] = useState(false);

  const currentRow = React.useRef(null);

  const tableColumns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "start date",
      selector: (row) => row.start_date,
      sortable: true,
    },
    {
      name: "end date",
      selector: (row) => row.end_date,
      sortable: true,
    },
    {
      cell: (row) => (
        <div className="w-100 d-flex justify-content-end align-items-center">
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
      width: "200px",
    },
  ];

  const onAdd = () => {
    setIsShowFormCreate(true);
  };
  const onReload = ({ page, rowPerPage, searchText }) => {
    callAPILoad({ page, rowPerPage, searchText });
  };
  const onImport = () => {
    console.log("import");
  };
  const onExport = () => {
    console.log("export");
  };
  const onEdit = (row) => {
    currentRow.current = row;
    setIsShowFormEdit(true);
  };
  const onDelete = (row) => {
    currentRow.current = row;
    setIsShowFormDelete(true);
  };

  const formAdd = isShowFormCreate && (
    <Modal show centered>
      <Modal.Body>
        <Button
          size="sm"
          variant="danger"
          onClick={() => setIsShowFormCreate(false)}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
  const formEdit = isShowFormEdit && (
    <Modal show centered>
      <Modal.Body>
        <Button
          size="sm"
          variant="danger"
          onClick={() => setIsShowFormEdit(false)}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
  const formDelete = isShowFormDelete && (
    <FormConfirm
      onHide={() => setIsShowFormDelete(false)}
      onConfirm={() => {
        callAPIDelete(currentRow.current);
      }}
      title="Delete"
      content="Are you sure to delete?"
    />
  );

  const callAPILoad = ({ page, rowPerPage, searchText }) => {
    setIsTablePending(true);

    const apiPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "Công nghệ phần mềm",
            start_date: "01/01/2022",
            end_date: "01/01/2023",
          },
        ]);
      }, 2000);
    });

    PromiseToast({
      promise: apiPromise,
      title: "Load data",
      onSuccess: (data) => {
        console.log(data);
        setData(data);
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
  const callAPICreate = ({ id, name }) => {};
  const callAPIEdit = ({ id, newName }) => {};
  const callAPIDelete = ({ id }) => {};

  return (
    <>
      {formAdd}
      {formEdit}
      {formDelete}
      <TemplateManagementPage
        title={"Quản lý khoa"}
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

export default FacultyManagement;
