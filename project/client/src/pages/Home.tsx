
import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import Navbar from "../component/Navbar";
import { getAllMovies } from "../apiCalls/movieCalls";
import MovieCard from "../component/MovieCard";
import type { MovieModel } from "../models/movie.model";

function Home() {
    const [movies, setMovies] = useState<MovieModel[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const fetchedMovies = await getAllMovies();
                setMovies(fetchedMovies.data || []);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <div className="home-shell">
            <Navbar />
            <div className="home-content">
                <Row gutter={[16, 16]}>
                    {movies.map((movie, index) => (
                        <Col xs={24} sm={12} lg={8} key={`${movie.title}-${index}`}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default Home