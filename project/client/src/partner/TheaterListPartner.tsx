
import { Button, Table } from "antd";
import { useState } from "react";
import TheatreForm from "./TheatreForm";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";



function TheaterListPartner() {
 const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const tableList = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "address",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "phone",
      title: "Phone",
      dataIndex: "phone",
    },
    {
      key: "action",
      title: "Action",
      // render: (_text: unknown) => (
      //   <div className="d-flex gap-5">
      //     <Button>
      //       <EditOutlined />
      //     </Button>
      //     <Button>
      //       <DeleteOutlined />
      //     </Button>
      //   </div>
      // ),
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Button type="primary" onClick={() => {
          setModalOpen(true)
        }}>
          Add Theater
        </Button>
      </div>

      <Table columns={tableList}  rowKey="_id" />

      {isModalOpen && <TheatreForm 
      isModalOpen={isModalOpen} 
      setModalOpen={setModalOpen}
      />}
    </>
  );
}

export default TheaterListPartner;