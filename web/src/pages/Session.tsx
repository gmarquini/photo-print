import { useParams } from "react-router";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import "../styles/session-style.css";
import cancelIcon from "../assets/cancel-icon.svg";

type Photo = {
  id: string;
  filename: string;
};

export function Session() {
  const { sessionId } = useParams();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  function formHandler() {
    console.log("enviado");
    return;
  }

  async function sendPhotos(files: File[]) {
    if (!sessionId) return;

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("photo", file);
    });

    await api.post(`/sessions/${sessionId}/photos`, formData);

    const response = await api.get(`/sessions/${sessionId}/photos`);

    setPhotos(response.data);
  }

  async function deletePhoto(photoId: string) {
    if (!sessionId) return;

    await api.delete(`sessions/${sessionId}/photos/${photoId}`);

    const response = await api.get(`/sessions/${sessionId}/photos`);

    setPhotos(response.data);
  }

  useEffect(() => {
    async function loadPhotos() {
      if (!sessionId) return;

      const response = await api.get(`/sessions/${sessionId}/photos`);

      setPhotos(response.data);
    }

    loadPhotos();
  }, [sessionId]);

  return (
    <div className="session-page">
      <div>
        <h1>Adicione suas fotos:</h1>
        <div>
          <div className="photos-container">
            {photos.map((photo) => (
              <div className="photo-thumbnail" key={photo.id}>
                <img
                  className="photo"
                  src={`http://localhost:3000/sessions/${sessionId}/photos/${photo.id}`}
                  alt={photo.filename}
                />
                <button
                  className="delete-button"
                  onClick={() => deletePhoto(photo.id)}
                >
                  <img src={cancelIcon} alt="" />
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            accept=".jpg, .jpeg, png, heic, webp, heif, tiff"
            multiple
            onChange={(event) => {
              if (!event.target.files) return;

              const selectedFiles = Array.from(event.target.files);

              setFiles(selectedFiles);
              sendPhotos(selectedFiles);
            }}
          />
        </div>
      </div>
      <button className="send-button" type="submit" onSubmit={formHandler}>
        Enviar
      </button>
    </div>
  );
}
