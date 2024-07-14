import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import PromiseToast from "~/ui/components/toast/promiseToast/PromiseToast";
import TemplateManagementPage from "~/ui/template/management/TemplateManagementPage";
import "react-toastify/dist/ReactToastify.css";
import FormConfirm from "~/ui/components/subForm/confirm/FormConfirm";
import FactultyService from "~/logic/service/api/FactultyService";
import FormCreate from "./subForm/create/FormCreate";
import FormEdit from "./subForm/edit/FormEdit";
import SemesterService from "~/logic/service/api/SemesterService";
import CriteriaGroupService from "~/logic/service/api/CriteriaGroupService";

function CriteriaGroupManagement(props) {
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
      name: "Tên nhóm tiêu chí",
      selector: (row) => row.name,
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

  const callAPILoad = ({ page, rowPerPage, searchText }) => {
    loadInfo.current = { page, rowPerPage, searchText };

    const apiPromise = CriteriaGroupService.getCriteriaGroups({
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
  const callAPICreate = ({ id, name }) => {
    const apiPromise = CriteriaGroupService.createCriteriaGroup({
      name,
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
  const callAPIEdit = ({ id, name }) => {
    const apiPromise = CriteriaGroupService.updateCriteriaGroup({
      id,
      name,
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
    const apiPromise = CriteriaGroupService.deleteCriteriaGroup({ id });
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
        title={"Quản lý Nhóm tiêu chí"}
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

export default CriteriaGroupManagement;
