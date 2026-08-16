import { Card, Tag,  Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import type { MovieModel } from "../models/movie.model";
import "./MovieCard.scss";

const { Title } = Typography;

interface MovieCardProps {
  movie: MovieModel | null;
}

function MovieCard({ movie }: MovieCardProps) {
  if (!movie) {
    return null;
  }

  const posterUrl = movie.posterPath || "https://via.placeholder.com/300x450?text=Movie";
  const ratingValue = movie.rating ?? 0;

  return (
    <Card
      className="movie-card"
      hoverable
      cover={
        <div className="movie-poster-wrapper">
          <img
            className="movie-poster"
            src={posterUrl}
            alt={movie.title}
          />

          <div className="movie-rating-overlay">
            <StarFilled />
            <span>{ratingValue}/5</span>
          </div>
        </div>
      }
    >
      <div className="movie-info">
        <Title level={4} className="movie-title">
          {movie.title}
        </Title>

        <div className="movie-tags">
          {movie.language?.map((lang) => (
            <Tag key={lang} color="blue">
              {lang}
            </Tag>
          ))}

          {movie.description && <Tag>{movie.description}</Tag>}
        </div>

      </div>
    </Card>
  );
}

export default MovieCard;