import { useSelector } from "react-redux"
import type { MovieModel } from "../models/movie.model";
import { Table } from "antd";
import moment from "moment";



function MovieList() {
  const movies = useSelector((state: { movies?: { data?: MovieModel[] } }) => state.movies?.data ?? []);
  console.log("Movies", movies);

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

  return (
      <Table columns={tableList} dataSource={movies} rowKey="title" />
  )
}

export default MovieList