import { useSelector } from "react-redux"
import { Button, Table, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useState } from "react";
import MovieForm from "./MovieForm";
import type { RootState } from "../../redux/store";
import type { MovieModel } from "../../models/movie.model";
import DeleteModal from "../../component/DeleteModal";
import { deleteMovie } from "../../apiCalls/movieCalls";

function MovieList() {
  const movies = useSelector((state: RootState) => state.movies);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieModel | undefined>();
  const [formType, setFormType] = useState<string>('add');

  const handleDeleteMovie = async () => {
    if (!selectedMovie) return;

    try {
      const res = await deleteMovie(selectedMovie);
      if (res?.success) {
        message.success(res.message);
        setSelectedMovie(undefined);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const tableList = [
    {
      key: 'posterPath',
      title: 'Poster',
      dataIndex: 'posterPath',
      render: (posterPath: string) => (
        <img src={posterPath} alt="movie poster" width="75" height="auto" />
      ),
    },
    {
      key: 'description',
      title: 'Description',
      dataIndex: 'description',
    },
    {
      key: 'language',
      title: 'Language',
      dataIndex: 'language',
      render: (languages: string[]) => (
        <div>
          {languages?.map((text: string) => (
            <span key={text} style={{ marginRight: 8 }}>{text}</span>
          ))}
        </div>
      ),
    },
    {
      key: 'releaseDate',
      title: 'Release Date',
      dataIndex: 'releaseDate',
      render: (date: Date) => {
        return moment(date).format('DD-MM-YYYY')
      }
    },
    {
      key: 'duration',
      title: 'Duration',
      dataIndex: 'duration',
    },
    {
      key: 'rating',
      title: 'Rating',
      dataIndex: 'rating',
    },
    {
      key: 'action',
      title: 'Action',
      render: (_text: unknown, record: MovieModel) => {
        return <div className="d-flex gap-5">
          <Button onClick={() => {
            setModalOpen(true)
            setSelectedMovie(record)
            setFormType('edit');
          }}><EditOutlined /></Button>
          <Button onClick={() => {
            setDeleteModalOpen(true)
            setSelectedMovie(record);
          }}><DeleteOutlined /></Button>
        </div>
      }
    },
  ];

  return ( <>
    <div className="d-flex justify-content-end mb-3">
      <Button type="primary" onClick={() => {
        setModalOpen(true)
        setFormType('add');
        setSelectedMovie(undefined);
      }}>Add Movies</Button>
    </div>
    <Table columns={tableList} dataSource={movies} rowKey="title" />

    {isModalOpen && <MovieForm 
    isModalOpen={isModalOpen} 
    setModalOpen={setModalOpen} 
    selectedMovie={selectedMovie}
    formType={formType}
    setSelectedMovie={setSelectedMovie}
    />}

    {isDeleteModalOpen && <DeleteModal 
    isDeleteModalOpen={isDeleteModalOpen} 
    setDeleteModalOpen={setDeleteModalOpen}
    onConfirm={handleDeleteMovie}
    />}
  </>
    
  )
}

export default MovieList
