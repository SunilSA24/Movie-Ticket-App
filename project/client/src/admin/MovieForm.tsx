import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd"
import TextArea from "antd/es/input/TextArea"
import moment from "moment"
import { addMovies, updateMovie } from "../apiCalls/movieCalls"
import type { MovieModel } from "../models/movie.model"

interface MovieFormProps {
  isModalOpen: boolean,
  setModalOpen: (isOpen: boolean) => void,
  selectedMovie?: MovieModel,
  formType: string,
  setSelectedMovie: (movie?: MovieModel) => void
}

const formatDateInputValue = (date?: string | Date) => {
  if (!date) return undefined;

  const parsedDate = moment(date);
  return parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : undefined;
}

function MovieForm({ isModalOpen, setModalOpen, selectedMovie, formType, setSelectedMovie }: MovieFormProps) {

  const handleCancel = () => {
    setModalOpen(false);
  }

  const handleSubmit = async (value: MovieModel) => {
    if (formType === 'add') {
      try {
        const resp = await addMovies(value);
        if (resp.success) {
          message.success(resp.message);
          setModalOpen(false);
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      if (!selectedMovie) return;
      try {
        const res = await updateMovie({...value, _id: selectedMovie._id})
        if(res.success) {
          setSelectedMovie(undefined);
          setModalOpen(false);
          message.success(res.message);
        }
      } catch (error) {
        console.error(error)
      }
    }
    
  }


  return (
    <Modal width={800} open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form
        className="movie-form"
        layout="vertical"
        style={{ width: "100%" }}
        onFinish={handleSubmit}
        initialValues={{
          ...selectedMovie,
          releaseDate: formatDateInputValue(selectedMovie?.releaseDate),
        }}
      >
        <Row
          gutter={{
            xs: 6,
            sm: 10,
            md: 12,
            lg: 16,
          }}
        >
          <Col span={24}>
            <Form.Item
              label="Movie Name"
              htmlFor="title"
              name="title"
              className="d-block"
              rules={[{ required: true, message: "Movie name is required!" }]}
            >
              <Input
                id="title"
                type="text"
                placeholder="Enter the movie name"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              htmlFor="description"
              name="description"
              className="d-block"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <TextArea
                id="description"
                rows={4}
                placeholder="Enter the  description"
              ></TextArea>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row
              gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}
            >
              <Col span={8}>
                <Form.Item
                  label="Movie  Duration (in min)"
                  htmlFor="duration"
                  name="duration"
                  className="d-block"
                  rules={[
                    { required: true, message: "Movie duration  is required!" },
                  ]}
                >
                  <Input
                    id="duration"
                    type="string"
                    placeholder="Enter the movie duration"
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Select Movie Lanuage"
                  htmlFor="language"
                  name="language"
                  className="d-block"
                  rules={[
                    { required: true, message: "Movie language  is required!" },
                  ]}
                >
                  <Select
                    id="language"
                    className="movie-form-select"
                    placeholder="Select Language"
                    style={{ width: "100%", height: "45px" }}
                    options={[
                      { value: "English", label: "English" },
                      { value: "Hindi", label: "Hindi" },
                      { value: "Punjabi", label: "Punjabi" },
                      { value: "Telugu", label: "Telugu" },
                      { value: "Bengali", label: "Bengali" },
                      { value: "German", label: "German" },
                      { value: "Kannada", label: "Kannada" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Release Date"
                  htmlFor="releaseDate"
                  name="releaseDate"
                  className="d-block"
                  rules={[
                    {
                      required: true,
                      message: "Movie Release Date is required!",
                    },
                  ]}
                >
                  <Input
                    id="releaseDate"
                    type="date"
                    placeholder="Choose the release date"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row
              gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}
            >
              <Col span={8}>
                <Form.Item
                  label="Select Movie Genre"
                  htmlFor="genre"
                  name="genre"
                  className="d-block"
                  rules={[
                    { required: true, message: "Movie genre  is required!" },
                  ]}
                >
                  <Select
                    className="movie-form-select"
                    placeholder="Select Genre"
                    style={{ width: "100%", height: "45px" }}
                    options={[
                      { value: "Action", label: "Action" },
                      { value: "Comedy", label: "Comedy" },
                      { value: "Horror", label: "Horror" },
                      { value: "Love", label: "Love" },
                      { value: "Patriot", label: "Patriot" },
                      { value: "Bhakti", label: "Bhakti" },
                      { value: "Thriller", label: "Thriller" },
                      { value: "Mystery", label: "Mystery" },
                      { value: "Sports", label: "Sports" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  label="posterPath"
                  htmlFor="posterPath"
                  name="posterPath"
                  className="d-block"
                  rules={[
                    { required: true, message: "Movie Poster  is required!" },
                  ]}
                >
                  <Input
                    id="posterPath"
                    type="text"
                    placeholder="Enter the poster URL"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            Submit the Data
          </Button>
          <Button onClick={handleCancel} className="mt-3" block>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default MovieForm