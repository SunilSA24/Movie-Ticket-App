import { Modal } from "antd";

interface DeleteModalProps {
    isDeleteModalOpen: boolean;
    setDeleteModalOpen?: (isOpen: boolean) => void;
    onConfirm: () => Promise<void> | void;
    title?: string;
    message?: string;
}

function DeleteModal({
    isDeleteModalOpen,
    setDeleteModalOpen,
    onConfirm,
    title = "Delete Movie",
    message = "Are you sure you want to delete this movie?"
}: DeleteModalProps) {
    const handleOk = async () => {
        await onConfirm();
        setDeleteModalOpen?.(false);
    };

    const handleCancel = () => {
        setDeleteModalOpen?.(false);
    };

    return (
        <Modal
            title={title}
            closable={{ "aria-label": "Custom Close Button" }}
            open={isDeleteModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <h3>{message}</h3>
        </Modal>
    );
}

export default DeleteModal;