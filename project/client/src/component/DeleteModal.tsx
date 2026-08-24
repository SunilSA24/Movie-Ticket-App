import { message, Modal } from "antd"
import type { MovieModel } from "../models/movie.model";
import { deleteMovie } from "../apiCalls/movieCalls";

interface DeleteModal {
    isDeleteModalOpen: boolean;
    setDeleteModalOpen?: (isOpen: boolean) => void;
    selectedMovie?: MovieModel,
    setSelectedMovie: (movie?: MovieModel) => void
}



function DeleteModal({isDeleteModalOpen, setDeleteModalOpen, selectedMovie, setSelectedMovie}: DeleteModal) {

    const handleOk = async (value?: MovieModel) => {
        if (!value) return
        try {
            const res = await deleteMovie(value)
            if (res.success) {
                message.success(res.message);
                setDeleteModalOpen?.(false);
                setSelectedMovie(undefined);
                
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleCancel = () => {
        setDeleteModalOpen?.(false);
    }

  return (
    <Modal
        title="Delete Movie"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isDeleteModalOpen}
        onOk={() => handleOk(selectedMovie)}
        onCancel={handleCancel}
      >
        <h3>Are you sure you want to delete a selected movie</h3>
        
      </Modal>
  )
}

export default DeleteModal