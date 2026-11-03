import { useState } from "react";
import { useParams } from "react-router";
import veryImg from "../assets/VERY.png";
import { api } from "../services/api";
import "../styles/mobile-upload-page.css";

export function MobileUploadPage() {
  const { sessionId } = useParams();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadFailed, setUploadFailed] = useState(false);

  async function uploadPhotos(files: File[]) {
    if (!sessionId) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("photo", file);
    });

    await api.post(`/sessions/${sessionId}/photos`, formData);
  }

  return (
    <main className="mobile-upload-page">
      <section className="mobile-upload-card">
        <header className="mobile-upload-brand">
          <span>VERY</span>
          <img src={veryImg} alt="Very" />
          <span>SMART PRINT</span>
        </header>

        <h1>Envie suas fotos</h1>
        <p className="mobile-upload-description">
          Selecione na galeria as fotos que deseja revelar.
        </p>

        <label className="mobile-upload-button" aria-busy={isUploading}>
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .heic, .webp, .heif, .tiff"
            multiple
            disabled={isUploading}
            onChange={async (event) => {
              const selectedFiles = Array.from(event.target.files ?? []);
              if (selectedFiles.length === 0) return;

              setUploadMessage("");
              setUploadFailed(false);
              setIsUploading(true);
              try {
                await uploadPhotos(selectedFiles);
                setUploadMessage(
                  selectedFiles.length === 1
                    ? "Foto enviada com sucesso!"
                    : "Fotos enviadas com sucesso!",
                );
              } catch (error) {
                console.error("Não foi possível enviar as fotos", error);
                setUploadFailed(true);
                setUploadMessage(
                  "Não foi possível enviar. Confira sua conexão e tente novamente.",
                );
              } finally {
                setIsUploading(false);
                event.target.value = "";
              }
            }}
          />
          {isUploading ? (
            <>
              <span className="mobile-upload-spinner" aria-hidden="true" />
              <span>Enviando fotos...</span>
            </>
          ) : (
            <span>Escolher fotos</span>
          )}
        </label>

        <p className="mobile-upload-formats">
          JPG, PNG, HEIC e outros formatos de imagem
        </p>
        {uploadMessage && (
          <p
            className={`mobile-upload-status${uploadFailed ? " is-error" : ""}`}
            role={uploadFailed ? "alert" : "status"}
          >
            {uploadMessage}
          </p>
        )}
      </section>
    </main>
  );
}
