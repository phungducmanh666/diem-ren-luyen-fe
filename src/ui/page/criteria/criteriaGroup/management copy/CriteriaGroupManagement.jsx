import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button, Form, Modal } from "react-bootstrap";
import { GoPlusCircle } from "react-icons/go";
import { RxReload } from "react-icons/rx";
import { CiImport } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomeDataTable from "~/ui/components/dataTable/CustomeDataTable";
import CustomeSpinner from "~/ui/components/spinner/CustomeSpinner";
import PromiseToast from "~/ui/components/toast/promiseToast/PromiseToast";
import FormCreateCriteria from "./subForm/create/FormCreateCriteriaGroup";
import FormCreateCriteriaGroup from "./subForm/create/FormCreateCriteriaGroup";
import CriteriaGroupService from "~/logic/service/api/CriteriaGroupService";
import FormEditCriteriaGroup from "./subForm/edit/FormEditCriteriaGroup";

function CriteriaGroupManagement(props) {
  //#region state

  //#region show hide state
  const [isShowEditForm, setIsShowEditForm] = React.useState(false);
  const [isShowCreateForm, setIsShowCreateForm] = React.useState(false);
  const [isShowDeleteForm, setIsShowDeleteForm] = React.useState(false);
  const [isShowSpinner, setIsShowSpinner] = React.useState(false);
  //#endregion

  //#region page data state
  const [data, setData] = useState([]);
  const [dataGroup, setDataGroup] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  //#endregion

  //#region table state
  const [page, setPage] = React.useState(1);
  const [rowPerPage, setRowPerPage] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [totalRows, setTotalRows] = React.useState(200);
  const [tablePending, setTablePending] = React.useState(false);
  //#endregion

  //#endregion

  //#region data table

  //#region table handle
  const onEdit = (row) => {
    selectedRow.current = row;
    setIsShowEditForm(true);
  };
  const onDelete = (row) => {
    selectedRow.current = row;
    setIsShowDeleteForm(true);
  };
  const onSearch = (text) => {
    console.log(text);
    setSearchText(text);
  };
  const onChangePage = (currnetPage, totalRows) => {
    console.log(`Page: ${currnetPage} | total rows: ${totalRows}`);
    setPage(currnetPage);
  };
  const onChangeRowsPerPage = (currentRowPerPage, currnetPage) => {
    console.log(`Page: ${currnetPage} | rows per page: ${currentRowPerPage}`);
    setRowPerPage(currentRowPerPage);
  };
  const tableColumns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Tên",
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
              <FaRegEdit className="me-2" />
              Delete
            </div>
          </Button>
        </div>
      ),
      width: "200px",
    },
  ];

  //#endregion

  //#region data table components
  const dataTable = (
    <CustomeDataTable
      columns={tableColumns}
      data={data}
      onSearch={onSearch}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      progressPending={tablePending}
      paginationDefaultPage={page}
      searchText={searchText}
    />
  );
  //#endregion

  //#endregion

  //#region ref
  const selectedRow = React.useRef(null);
  //#endregion

  //#region filter
  //#region filter handle
  //#endregion
  //#region filter components
  const selectFilter = (
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Data group filter</Form.Label>
      <Form.Select aria-label="Default select example" size="sm">
        <option value={0}>Tất cả</option>
        {dataGroup.map((item, index) => {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </Form.Select>
    </Form.Group>
  );
  //#endregion
  //#endregion

  //#region actions
  //#region actions handle
  const onAdd = () => {
    setIsShowCreateForm(true);
  };
  const onReload = () => {
    if (searchText !== "") {
      setSearchText("");
    } else if (page !== 1) {
      setPage(1);
    } else {
      loadData();
    }
    // loadDataGroup();
  };
  const onImport = () => {};
  //#endregion
  //#region actions components
  const btnAdd = (
    <Button size="sm" className="me-2" onClick={onAdd}>
      <div className="d-flex justify-content-start align-items-center">
        <GoPlusCircle className="me-2" />
        ADD
      </div>
    </Button>
  );
  const btnReload = (
    <Button size="sm" className="me-2" variant="success" onClick={onReload}>
      <div className="d-flex justify-content-start align-items-center">
        <RxReload className="me-2" />
        Reload
      </div>
    </Button>
  );
  const btnImport = (
    <Button variant="warning" size="sm" onClick={onImport}>
      <div className="d-flex justify-content-start align-items-center">
        <CiImport className="me-2" />
        Import
      </div>
    </Button>
  );
  //#endregion
  //#endregion

  //#region form
  //#region form handle
  const handleCreate = (values) => {
    createData(values);
  };
  const handleEdit = (newValue) => {
    const { id, name } = newValue;
    const apiPromise = CriteriaGroupService.updateCriteriaGroup(id, name);
    PromiseToast({
      promise: apiPromise,
      onSuccess: (data) => {
        console.log(data);
        setIsShowSpinner(false);
        setIsShowEditForm(false);
        loadData();
        return "Update data success!";
      },
      onFailed: (error) => {
        console.log(error);
        setIsShowSpinner(false);
        setIsShowEditForm(false);
        return "Update data failed!";
      },
    });
  };
  const handleDelete = () => {
    setIsShowSpinner(true);
    const apiPromise = CriteriaGroupService.deleteCriteriaGroup(
      selectedRow.current.id
    );
    PromiseToast({
      promise: apiPromise,
      onSuccess: (data) => {
        console.log(data);
        setIsShowSpinner(false);
        setIsShowDeleteForm(false);
        loadData();
        return "Delete data success!";
      },
      onError: (error) => {
        console.log(error);
        setIsShowSpinner(false);
        setIsShowDeleteForm(false);
        return "Delete data failed!";
      },
    });
  };
  //#endregion
  //#region form components
  const createForm = isShowCreateForm && (
    <FormCreateCriteriaGroup
      onHide={() => {
        setIsShowCreateForm(false);
      }}
      onSubmit={handleCreate}
    />
  );
  const editForm = isShowEditForm && (
    <FormEditCriteriaGroup
      currentRow={selectedRow.current}
      onHide={() => setIsShowEditForm(false)}
      onSubmit={handleEdit}
    />
  );

  const deleteForm = isShowDeleteForm && (
    <Modal
      centered
      show={true}
      onHide={() => {
        setIsShowDeleteForm(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Xóa row</Modal.Title>
      </Modal.Header>
      <Modal.Body>Bạn có chắc muốn xóa: {selectedRow.current.name}</Modal.Body>
      <Modal.Footer>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsShowDeleteForm(false)}
        >
          Đóng
        </Button>
        <Button size="sm" variant="primary" onClick={handleDelete}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
  //#endregion
  //#endregion

  //#region spinner component
  const spinner = isShowSpinner && <CustomeSpinner />;
  //#endregion

  //#region effect
  useEffect(() => {
    loadData();
    // console.log("reload group data");
    // loadDataGroup();
  }, []);

  useEffect(() => {
    console.log("reload table");
    loadData();
  }, [page, rowPerPage, searchText, currentGroup]);

  //#endregion

  //#region api
  const loadDataGroup = () => {
    // console.log("load data group");
    // setIsShowSpinner(true);
    // const apiPromise = getGroupData();
    // PromiseToast({
    //   promise: apiPromise,
    //   title: "Load data group",
    //   onSuccess: (data) => {
    //     console.log(data);
    //     setDataGroup(data);
    //     setIsShowSpinner(false);
    //     return "Load data group success";
    //   },
    //   onFailed: (data) => {
    //     console.log(data);
    //     setIsShowSpinner(false);
    //     return "Load data group failed";
    //   },
    // });
  };
  const loadData = () => {
    setTablePending(true);
    const apiPromise = CriteriaGroupService.getCriteriaGroups(
      page,
      rowPerPage,
      searchText
    );
    PromiseToast({
      promise: apiPromise,
      title: "Load data",
      onSuccess: (data) => {
        console.log(data);
        const { count, rows } = data.data;
        setData(rows);
        setTotalRows(count);
        setTablePending(false);
        return "Load data success";
      },
      onFailed: (data) => {
        console.log(data);
        setTablePending(false);
        return "Load data failed";
      },
    });
  };
  const createData = (values) => {
    const { name } = values;
    const apiPromise = CriteriaGroupService.createCriteriaGroup(name);
    setIsShowSpinner(true);
    PromiseToast({
      promise: apiPromise,
      title: "Create data",
      onSuccess: (data) => {
        console.log(data);
        setIsShowSpinner(false);
        setIsShowCreateForm(false);
        loadData();
        return "Create data success";
      },
      onFailed: (data) => {
        console.log(data);
        setIsShowSpinner(false);
        return "Create data failed";
      },
    });
  };
  //#endregion

  return (
    <>
      {spinner}
      {createForm}
      {editForm}
      {deleteForm}
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <h1 className={styles["title"]}>Quản lý nhóm tiêu chí</h1>
        </div>
        <div className={styles["body"]}>
          {/* <div className={styles["filter"]}>{selectFilter}</div> */}
          <div className={styles["actions"]}>
            {btnAdd} {btnReload} {btnImport}
          </div>
          <div className={styles["content"]}>{dataTable}</div>
        </div>
        <div className={styles["footer"]}></div>
      </div>
      <ToastContainer />
    </>
  );
}

export default CriteriaGroupManagement;
