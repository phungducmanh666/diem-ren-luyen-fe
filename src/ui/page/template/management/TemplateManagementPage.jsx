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

const tableData = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@me.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "janedoe@me.com",
    phone: "123-456-7890",
  },
];

const groupData = [
  {
    id: 1,
    name: "Group 1",
  },
  {
    id: 2,
    name: "Group 2",
  },
];

const data = [
  {
    id: 1,
    name: "Data 1",
    idGroup: 1,
  },
  {
    id: 2,
    name: "Data 2",
    idGroup: 1,
  },
  {
    id: 3,
    name: "Data 3",
    idGroup: 2,
  },
  {
    id: 4,
    name: "Data 4",
    idGroup: 2,
  },
];

const getGroupData = async () => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(groupData);
    }, 1000);
  });
};

const getData = async (idGroup) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = data.filter((item) => item.idGroup === idGroup);
      resolve(result);
    }, 1000);
  });
};

function TemplateManagementPage({}) {
  //#region state

  //#region show hide state
  const [isShowEditForm, setIsShowEditForm] = React.useState(false);
  const [isShowCreateForm, setIsShowCreateForm] = React.useState(false);
  const [isShowDeleteForm, setIsShowDeleteForm] = React.useState(false);
  const [isShowSpinner, setIsShowSpinner] = React.useState(false);
  //#endregion

  //#region page data state
  const [data, setData] = useState([...tableData]);
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
      name: "STT",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Tên",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Số điện thoại",
      selector: (row) => row.phone,
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
      data={tableData}
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
    setSearchText("");
    setPage(1);
    loadDataGroup();
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
  const handleCreate = () => {
    setIsShowCreateForm(false);
  };
  const handleEdit = () => {
    setIsShowEditForm(false);
  };
  const handleDelete = () => {
    setIsShowDeleteForm(false);
  };
  //#endregion
  //#region form components
  const createForm = isShowCreateForm && (
    <Modal
      centered
      show={true}
      onHide={() => {
        setIsShowCreateForm(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create row</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsShowCreateForm(false)}
        >
          Close
        </Button>
        <Button size="sm" variant="primary" onClick={handleCreate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
  const editForm = isShowEditForm && (
    <Modal
      centered
      show={true}
      onHide={() => {
        setIsShowEditForm(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit row</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsShowEditForm(false)}
        >
          Close
        </Button>
        <Button size="sm" variant="primary" onClick={handleEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
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
        <Button size="sm" variant="primary" onClick={handleDelete}>
          Xác nhận
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => setIsShowDeleteForm(false)}
        >
          Đóng
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
    console.log("reload group data");
    loadDataGroup();
  }, []);

  useEffect(() => {
    console.log("reload table");
    loadData();
  }, [page, rowPerPage, searchText, currentGroup]);

  //#endregion

  //#region api
  const loadDataGroup = () => {
    console.log("load data group");
    setIsShowSpinner(true);
    const apiPromise = getGroupData();
    PromiseToast({
      promise: apiPromise,
      title: "Load data group",
      onSuccess: (data) => {
        console.log(data);
        setDataGroup(data);
        setIsShowSpinner(false);
        return "Load data group success";
      },
      onFailed: (data) => {
        console.log(data);
        setIsShowSpinner(false);
        return "Load data group failed";
      },
    });
  };
  const loadData = () => {
    setTablePending(true);
    setTimeout(() => {
      setTablePending(false);
    }, 1000);
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
          <h1 className={styles["title"]}>Trang quản lý</h1>
        </div>
        <div className={styles["body"]}>
          <div className={styles["filter"]}>{selectFilter}</div>
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

export default TemplateManagementPage;
