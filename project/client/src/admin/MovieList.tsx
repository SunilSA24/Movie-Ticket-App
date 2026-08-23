import { useSelector } from "react-redux"
import { Button, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import MovieForm from "./MovieForm";
import type { RootState } from "../redux/store";


function MovieList() {
  const movies = useSelector((state: RootState) => state.movies);
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  
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
  ];

  return ( <>
    <div className="d-flex justify-content-end mb-3">
      <Button type="primary" onClick={() => {
        setModalOpen(true)
      }}>Add Movies</Button>
    </div>
    <Table columns={tableList} dataSource={movies} rowKey="title" />
    {isModalOpen && <MovieForm isModalOpen={isModalOpen} setModalOpen={setModalOpen}/>}
  </>
    
  )
}

export default MovieList
