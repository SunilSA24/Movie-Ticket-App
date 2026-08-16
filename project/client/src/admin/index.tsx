import { Tabs } from "antd"
import MovieList from "./MovieList"
import TheaterList from "./TheaterList"


function Admin() {

    const tabItem = [
        {
            key: '1',
            label: 'Movie List',
            children: <MovieList />
        },
        {
            key: '2',
            label: 'Theater List',
            children: <TheaterList />
        }, 
    ]

  return (
    <Tabs items={tabItem} />
  )
}

export default Admin