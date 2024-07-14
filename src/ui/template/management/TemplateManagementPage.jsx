import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button, Col, Container, Row } from "react-bootstrap";
import { GoPlusCircle } from "react-icons/go";
import { RxReload } from "react-icons/rx";
import { CiImport } from "react-icons/ci";
import "react-toastify/dist/ReactToastify.css";
import CustomeDataTable from "~/ui/components/dataTable/CustomeDataTable";
import CustomeSpinner from "~/ui/components/spinner/CustomeSpinner";
import { TiExport } from "react-icons/ti";

function TemplateManagementPage({
  title,
  onAdd,
  onReload,
  onImport,
  onExport,
  tableColumns,
  data,
  totalRows,
  tablePending,
  showSpinner,
  search,
  filter,
  // FormAdd,
  // FormEdit,
  // FormDelete,
}) {
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");
  const [rowPerPage, setRowPerPage] = React.useState(10);

  // const [isShowFormAdd, setIsShowFormAdd] = React.useState(false);
  // const [isShowFormEdit, setIsShowFormEdit] = React.useState(false);
  // const [isShowFormDelete, setIsShowFormDelete] = React.useState(false);

  // const formAdd = isShowFormAdd && FormAdd;
  // const formEdit = isShowFormEdit && FormEdit;
  // const formDelete = isShowFormDelete && FormDelete;

  useEffect(() => {
    setSearchText(search);
  }, [search]);

  const onChangePage = (currnetPage, totalRows) => {
    setPage(currnetPage);
  };

  const onChangeRowsPerPage = (currentRowPerPage, currnetPage) => {
    setRowPerPage(currentRowPerPage);
  };

  const onSearch = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    onReload({ page, rowPerPage, searchText });
  }, [page, rowPerPage, searchText]);

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

  const btnAdd = (
    <Button className="mb-2 me-2" size="sm" onClick={onAdd}>
      <div className="d-flex justify-content-start align-items-center">
        <GoPlusCircle className="me-2" />
        ADD
      </div>
    </Button>
  );
  const btnReload = (
    <Button
      className="mb-2 me-2"
      size="sm"
      variant="success"
      onClick={() => {
        if (page !== 1) {
          setPage(1);
        } else if (searchText !== "") {
          setSearchText("");
        } else {
          onReload({ page, rowPerPage, searchText });
        }
      }}
    >
      <div className="d-flex justify-content-start align-items-center">
        <RxReload className="me-2" />
        Reload
      </div>
    </Button>
  );
  const btnImport = (
    <Button
      className="mb-2 me-2"
      variant="warning"
      size="sm"
      onClick={onImport}
    >
      <div className="d-flex justify-content-start align-items-center">
        <CiImport className="me-2" />
        Import
      </div>
    </Button>
  );
  const btnExport = (
    <Button className="mb-2 me-2" variant="danger" size="sm" onClick={onExport}>
      <div className="d-flex justify-content-start align-items-center">
        <TiExport className="me-2" />
        Export
      </div>
    </Button>
  );

  const spinner = showSpinner && <CustomeSpinner />;

  return (
    <Container fluid>
      {spinner}
      {/* {formAdd}
      {formEdit}
      {formDelete} */}
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <h1 className={styles["title"]}>{title}</h1>
        </div>
        <div className={styles["body"]}>
          {filter && (
            <Row xs={1} md={2} lg={4}>
              <Col>
                <div className={styles["filter"]}>{filter}</div>
              </Col>
            </Row>
          )}
          <div className={`${styles["actions"]} mt-3`}>
            {btnAdd}
            {btnReload}
            {btnImport}
            {btnExport}
          </div>
          <div className={styles["content"]}>{dataTable}</div>
        </div>
        <div className={styles["footer"]}></div>
      </div>
    </Container>
  );
}

export default TemplateManagementPage;
