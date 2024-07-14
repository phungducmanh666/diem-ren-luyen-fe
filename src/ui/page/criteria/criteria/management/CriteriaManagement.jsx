import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { CiTrash } from "react-icons/ci";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import PromiseToast from "~/ui/components/toast/promiseToast/PromiseToast";
import TemplateManagementPage from "~/ui/template/management/TemplateManagementPage";
import "react-toastify/dist/ReactToastify.css";
import FormConfirm from "~/ui/components/subForm/confirm/FormConfirm";
import ClassService from "~/logic/service/api/ClassService";
import FormEdit from "./subForm/edit/FormEdit";
import FormCreate from "./subForm/create/FormCreate";
import CriteriaGroupService from "~/logic/service/api/CriteriaGroupService";
import CriteriaService from "~/logic/service/api/CriteriaService";

function CriteriaManagement(props) {
  //#region state and variable
  const [data, setData] = useState([]);
  const [dataGroup, setDataGroup] = useState([]);
  const [totalRows, setTotalRows] = useState(200);
  const [isTablePending, setIsTablePending] = useState(false);
  const [isShowSpinner, setIsShowSpinner] = useState(false);

  const [isShowFormCreate, setIsShowFormCreate] = useState(false);
  const [isShowFormEdit, setIsShowFormEdit] = useState(false);
  const [isShowFormDelete, setIsShowFormDelete] = useState(false);

  const currentRow = React.useRef(null);
  const currentGroup = React.useRef(null);
  const loadInfo = React.useRef(null);

  const tableColumns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "group id",
      selector: (row) => row.group_id,
      sortable: true,
      width: "100px",
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
      width: "300px",
    },
  ];
  //#endregion

  //#region call api
  const callAPILoad = ({ page, rowPerPage, searchText }) => {
    const apiPromise = CriteriaService.getCriteria({
      page: page,
      rowPerPage: rowPerPage,
      searchText: searchText,
      group_id: currentGroup.current.id,
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
  const callAPICreate = ({ id, name, group_id }) => {
    const apiPromise = CriteriaService.createCriteria({
      name,
      group_id,
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
  const callAPIEdit = ({ id, name, group_id }) => {
    const apiPromise = CriteriaService.updateCriteria({
      id,
      name,
      group_id,
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
    const apiPromise = CriteriaService.deleteCriteria({ id });
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
  const callApiLoadGroup = () => {
    const apiPromise = CriteriaGroupService.getCriteriaGroups({});
    setIsShowSpinner(true);
    PromiseToast({
      promise: apiPromise,
      title: "Load data",
      onSuccess: (data) => {
        console.log(data);
        const { rows, count } = data.data;
        setDataGroup(rows);
        setIsShowSpinner(false);
        if (rows.length > 0) {
          currentGroup.current = rows[0];
          callAPILoad(loadInfo.current);
        }
        return "Load data group success";
      },
      onFailed: (data) => {
        console.log(data);
        setIsShowSpinner(false);
        return "Load data group failed";
      },
    });
  };
  //#endregion

  //#region handle
  const onAdd = () => {
    setIsShowFormCreate(true);
  };
  const onReload = ({ page, rowPerPage, searchText }) => {
    loadInfo.current = { page, rowPerPage, searchText };
    if (currentGroup.current == null) {
      return;
    }
    console.log(page, rowPerPage, searchText);
    callAPILoad(loadInfo.current);
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
  const onChangeGroup = ({ id }) => {
    const group = dataGroup.find((item) => item.id === id);
    currentGroup.current = group ? group : { id: 0, code: "", name: "" };
    callAPILoad(loadInfo.current);
  };
  //#endregion

  //#region components
  const formAdd = isShowFormCreate && (
    <FormCreate
      onHide={() => setIsShowFormCreate(false)}
      onSubmit={callAPICreate}
      groups={dataGroup}
      currentGroup={currentGroup.current}
    />
  );
  const formEdit = isShowFormEdit && (
    <FormEdit
      currentRow={currentRow.current}
      onHide={() => setIsShowFormEdit(false)}
      onSubmit={callAPIEdit}
      groups={dataGroup}
      currentGroup={dataGroup.find(
        (item) => item.code === currentRow.current.faculty_code
      )}
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

  const filter = (
    <>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="basic-addon1">Nhóm tiêu chí</InputGroup.Text>
        <Form.Select
          value={currentGroup.current?.id || 0}
          size="sm"
          onChange={(e) => {
            const id = parseInt(e.target.value);
            onChangeGroup({ id });
          }}
        >
          <option value={0}>Tất cả</option>
          {dataGroup.map((item, index) => (
            <option value={item.id} key={index}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </InputGroup>
    </>
  );
  //#endregion

  useEffect(() => {
    callApiLoadGroup();
  }, []);

  return (
    <>
      {formAdd}
      {formEdit}
      {formDelete}
      <TemplateManagementPage
        title={"Quản lý tiêu chí"}
        onAdd={onAdd}
        onReload={onReload}
        onImport={onImport}
        onExport={onExport}
        data={data}
        tableColumns={tableColumns}
        totalRows={totalRows}
        tablePending={isTablePending}
        showSpinner={isShowSpinner}
        filter={filter}
      />
      <ToastContainer />
    </>
  );
}

export default CriteriaManagement;
