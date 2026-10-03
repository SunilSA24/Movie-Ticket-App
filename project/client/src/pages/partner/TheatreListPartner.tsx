
import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TheatreForm from "./TheatreForm";
import useUserController from "../../controlers/userController";
import { deleteTheatre, getTheatreByOwner } from "../../apiCalls/theatreCalls";
import type { Theatre } from "../../models/theatre.model";
import DeleteModal from "../../component/DeleteModal";

function TheaterListPartner() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedTheatre, setSelectedTheatre] = useState<Theatre | null>(null);
  const { userData } = useUserController();
  const [theatreList, setTheatreList] = useState<Theatre[]>([]);

  const handleDeleteTheatre = async () => {
    if (!selectedTheatre) return;

    try {
      const response = await deleteTheatre(selectedTheatre);
      if (response?.success) {
        message.success(response.message);
        setTheatreList((previous) => previous.filter((item) => item._id !== selectedTheatre._id));
        setSelectedTheatre(null);
      }
    } catch (error) {
      console.error('Failed to delete theatre:', error);
    }
  };

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
      render: (_text: unknown, record: Theatre) => (
        <div className="d-flex gap-5">
          <Button onClick={() => {
            setSelectedTheatre(record);
            setModalOpen(true);
          }}>
            <EditOutlined />
          </Button>
          <Button onClick={() => {
            setSelectedTheatre(record);
            setDeleteModalOpen(true);
          }}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!userData?._id) return;

    (async () => {
      try {
        const response = await getTheatreByOwner(userData._id);
        const nextTheatres = response?.theatres
          ? Array.isArray(response.theatres)
            ? response.theatres
            : [response.theatres]
          : [];

        setTheatreList(nextTheatres);
      } catch (error) {
        console.error('Failed to load theatres:', error);
      }
    })();
  }, [userData?._id]);

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Button type="primary" onClick={() => {
          setSelectedTheatre(null);
          setModalOpen(true);
        }}>
          Add Theater
        </Button>
      </div>

      <Table columns={tableList} dataSource={theatreList} rowKey="_id" />

      {isModalOpen && userData && <TheatreForm
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        selectedTheatre={selectedTheatre}
        userData={userData}
        formType={selectedTheatre ? "edit" : "add"}
      />}

      {isDeleteModalOpen && selectedTheatre && (
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          onConfirm={handleDeleteTheatre}
          title="Delete Theatre"
          message="Are you sure you want to delete this theatre?"
        />
      )}
    </>
  );
}

export default TheaterListPartner;