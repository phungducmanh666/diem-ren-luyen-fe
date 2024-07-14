import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import TemplateManagementPage from "~/ui/template/management/TemplateManagementPage";
import "react-toastify/dist/ReactToastify.css";
import FormConfirm from "~/ui/components/subForm/confirm/FormConfirm";

function TemplateManagement2({
  tableColumns,
  FormCreate,
  FormEdit,
  callAPILoad,
  callAPICreate,
  callAPIEdit,
  callAPIDelete,
  currentRow,
  data,
  totalRows,
  isTablePending,
  isShowSpinner,
}) {
  const [isShowFormCreate, setIsShowFormCreate] = useState(false);
  const [isShowFormEdit, setIsShowFormEdit] = useState(false);
  const [isShowFormDelete, setIsShowFormDelete] = useState(false);

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

  const formAdd = isShowFormCreate && (
    <FormCreate
      onHide={() => setIsShowFormCreate(false)}
      onSubmit={callAPICreate}
    />
  );
  const formEdit = isShowFormEdit && (
    <FormEdit
      currentRow={currentRow}
      onHide={() => setIsShowFormEdit(false)}
      onSubmit={callAPIEdit}
    />
  );
  const formDelete = isShowFormDelete && (
    <FormConfirm
      onHide={() => setIsShowFormDelete(false)}
      onConfirm={() => {
        callAPIDelete(currentRow);
      }}
      title="Delete"
      content={`Delete: ${currentRow.name} ?`}
    />
  );

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

export default TemplateManagement2;
