import { useParams } from "react-router";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import "../styles/session-style.css";
import cancelIcon from "../assets/cancel-icon.svg";
import { SessionSide } from "../components/session-side";

type Photo = {
  id: string;
  filename: string;
};

type PhotoSize =
  | "10x15"
  | "13x18"
  | "15x20"
  | "20x20"
  | "13x35"
  | "50x61"
  | "40x50"
  | "30x38"
  | "28x35";

type PrintOrderItem = {
  photoId: string;
  size: PhotoSize;
  quantity: number;
  paperType: "glossy" | "matte";
  showDate: boolean;
  createdAt: Date;
};

type PrintSettings = {
  photoId: string;
  size: PhotoSize;
  quantity: number;
  paperType: "glossy" | "matte";
  showDate: boolean;
};

type SettingsDraft = Omit<PrintSettings, "photoId">;

export function Session() {
  const { sessionId } = useParams();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [settings, setSettings] = useState<PrintSettings[]>([]);
  const [printOrder, setPrintOrders] = useState<PrintOrderItem[]>([]);

  function formHandler() {
    console.log("enviado");
  }

  async function uploadPhotos(files: File[]) {
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

  function onTogglePhoto(photoId: string) {
    const isSelected = selectedPhotoIds.includes(photoId);

    if (!isSelected) {
      setSettings((currentSettings) =>
        currentSettings.some((setting) => setting.photoId === photoId)
          ? currentSettings
          : [
              ...currentSettings,
              {
                photoId,
                size: "10x15",
                quantity: 1,
                paperType: "glossy",
                showDate: false,
              },
            ],
      );
    }

    setSelectedPhotoIds((currentIds) =>
      isSelected
        ? currentIds.filter((id) => id !== photoId)
        : [...currentIds, photoId],
    );
  }

  const allSelected =
    photos.length > 0 &&
    photos.every((photo) => selectedPhotoIds.includes(photo.id));

  function toggleAll() {
    const nextSelectedIds = allSelected ? [] : photos.map((photo) => photo.id);

    setSettings((currentSettings) => [
      ...currentSettings,
      ...nextSelectedIds
        .filter(
          (photoId) =>
            !currentSettings.some((setting) => setting.photoId === photoId),
        )
        .map((photoId) => ({
          photoId,
          size: "10x15" as const,
          quantity: 1,
          paperType: "glossy" as const,
          showDate: false,
        })),
    ]);
    setSelectedPhotoIds(nextSelectedIds);
  }

  function applyPrintSettings() {
    if (selectedPhotoIds.length === 0) return;

    const newOrders: PrintOrderItem[] = selectedPhotoIds.flatMap((photoId) => {
      const photoSettings = settings.find((item) => item.photoId === photoId);

      return photoSettings ? [{ ...photoSettings, createdAt: new Date() }] : [];
    });

    setPrintOrders((currentOrders) => [...currentOrders, ...newOrders]);
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
      <header className="header">Very Very Smart Print</header>

      <aside className="side">
        <SessionSide
          selectedPhotosIds={selectedPhotoIds}
          settings={settings}
          onSettingsChange={setSettings}
          selectedCount={selectedPhotoIds.length}
          onApply={applyPrintSettings}
        />
      </aside>

      <main className="photo-board">
        <h1>Adicione suas fotos:</h1>
        <button className="select-all" onClick={toggleAll}>
          {allSelected ? "Desmarcar tudo" : "Selecionar tudo"}
        </button>

        <div className="upload-panel">
          <div className="photos-container">
            {photos.map((photo) => {
              const photoSettings = settings.find(
                (item) => item.photoId === photo.id,
              );

              return (
                <div className="photo-thumbnail" key={photo.id}>
                  <img
                    className="photo"
                    src={`http://localhost:3000/sessions/${sessionId}/photos/${photo.id}`}
                    alt={photo.filename}
                  />
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => deletePhoto(photo.id)}
                  >
                    <img src={cancelIcon} alt="" />
                  </button>
                  <input
                    type="checkbox"
                    className="photo-checkbox"
                    checked={selectedPhotoIds.includes(photo.id)}
                    onChange={() => onTogglePhoto(photo.id)}
                  />
                  <div className="photo-setting">
                    <small>{photoSettings?.size}</small>
                    <br />
                    <small>
                      {photoSettings?.paperType === "glossy"
                        ? "Brilhante"
                        : "Fosco"}
                    </small>
                    <br />
                    <small>{"qty:" + photoSettings?.quantity}</small>
                    <br />
                    <small>
                      {photoSettings?.showDate ? "data: on" : "data: off"}
                    </small>
                    <br />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="upload-actions">
            <label className="upload-button">
              <input
                type="file"
                accept=".jpg, .jpeg, png, heic, webp, heif, tiff"
                multiple
                onChange={(event) => {
                  if (!event.target.files) return;

                  const selectedFiles = Array.from(event.target.files);

                  uploadPhotos(selectedFiles);
                }}
              />
              <span>Carregar fotos</span>
            </label>

            <button type="button" className="send-button" onClick={formHandler}>
              Concluir
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
