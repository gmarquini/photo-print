import { useNavigate, useParams } from "react-router";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import "../styles/session-style.css";
import cancelIcon from "../assets/cancel-icon.svg";
import { SessionSide } from "../components/session-side";
import { Header } from "../components/header";
import { isAxiosError } from "axios";
import { Loading } from "../components/loading";

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

// type PrintOrderItem = {
//   photoId: string;
//   size: PhotoSize;
//   quantity: number;
//   paperType: "glossy" | "matte";
//   showDate: boolean;
//   createdAt: Date;
// };

type PrintSettings = {
  photoId: string;
  size: PhotoSize;
  quantity: number;
  paperType: "glossy" | "matte";
  showDate: boolean;
};

type SessionStatus = "checking" | "valid" | "error";

export function Session() {
  const { sessionId } = useParams();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [settings, setSettings] = useState<PrintSettings[]>([]);
  const navigate = useNavigate();
  const [sessionCheck, setSessionCheck] = useState<{
    sessionId: string | undefined;
    status: SessionStatus;
  }>({ sessionId: undefined, status: "checking" });

  function formHandler() {
    if (settings.length <= 0) {
      return alert("Não há fotos a serem enviadas.");
    }

    settings.map(
      async (setting) =>
        await api.post(`/sessions/photos/${setting.photoId}/printOrders`, {
          size: setting.size,
          quantity: setting.quantity,
          paperType: setting.paperType,
          showDate: setting.showDate,
        }),
    );

    navigate(`/sessions/${sessionId}/allDonePage`);
  }

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      if (!sessionId) {
        setSessionCheck({ sessionId, status: "error" });
        return;
      }

      try {
        await api.get(`sessions/${sessionId}`);

        if (!cancelled) {
          setSessionCheck({ sessionId, status: "valid" });
        }
      } catch (error: unknown) {
        if (cancelled) return;

        if (isAxiosError(error) && error.response?.status === 404) {
          navigate("/notFound", { replace: true });
        }

        console.log("Não foi possível validar a sessão");
        setSessionCheck({ sessionId, status: "error" });
      }
    }

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, [sessionId, navigate]);

  async function uploadPhotos(files: File[]) {
    if (!sessionId) return;

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("photo", file);
    });

    await api.post(`/sessions/${sessionId}/photos`, formData);

    const response = await api.get(`/sessions/${sessionId}/photos`);

    const uploadedPhotos = response.data as Photo[];

    setPhotos(uploadedPhotos);
    setSettings(
      uploadedPhotos.map((photo) => ({
        photoId: photo.id,
        size: "10x15",
        paperType: "glossy",
        quantity: 1,
        showDate: false,
      })),
    );
  }

  async function deletePhoto(photoId: string) {
    if (!sessionId) return;

    await api.delete(`sessions/${sessionId}/photos/${photoId}`);

    const response = await api.get(`/sessions/${sessionId}/photos`);

    // Atualizar o estado de selectedPhotos
    const remainingPhotos = response.data as Photo[];
    const remainingIds = new Set(remainingPhotos.map((photo) => photo.id));

    setPhotos(remainingPhotos);
    setSelectedPhotoIds((currentIds) =>
      currentIds.filter((id) => remainingIds.has(id)),
    );
    setSettings((currentSettings) =>
      currentSettings.filter((setting) => remainingIds.has(setting.photoId)),
    );
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

  function applyPrintSettings(draftSettings: PrintSettings[]) {
    setSettings((currentSettings) => {
      const updatedSettings = currentSettings.map((setting) => {
        const updatedSetting = draftSettings.find(
          (draft) => draft.photoId === setting.photoId,
        );
        return updatedSetting ?? setting;
      });

      const newSettings = draftSettings.filter(
        (draft) =>
          !currentSettings.some((setting) => setting.photoId === draft.photoId),
      );

      const result = [...updatedSettings, ...newSettings];

      return result;
    });
  }

  useEffect(() => {
    if (
      !sessionId ||
      sessionCheck.sessionId !== sessionId ||
      sessionCheck.status !== "valid"
    ) {
      return;
    }

    async function loadPhotos() {
      const response = await api.get(`/sessions/${sessionId}/photos`);
      const uploadedPhotos = response.data as Photo[];

      setPhotos(response.data);

      setPhotos(uploadedPhotos);
      setSettings(
        uploadedPhotos.map((photo) => ({
          photoId: photo.id,
          size: "10x15",
          paperType: "glossy",
          quantity: 1,
          showDate: false,
        })),
      );
    }

    loadPhotos();
  }, [sessionId, sessionCheck]);

  // Carregamento da página para não mostrar conteúdo caso a sessão não exista.

  if (
    sessionCheck.sessionId !== sessionId ||
    sessionCheck.status === "checking"
  ) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (sessionCheck.status === "error") {
    return <p>Não foi possível validar a sessão.</p>;
  }

  return (
    <div className="session-page">
      <Header />

      <aside className="side">
        <SessionSide
          selectedPhotosIds={selectedPhotoIds}
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
                    <div className="setting-size">
                      <small>{photoSettings?.size}</small>
                    </div>
                    <div className="setting-papertype">
                      <small>
                        {photoSettings?.paperType === "glossy"
                          ? "Brilhante"
                          : "Fosco"}
                      </small>
                    </div>
                    <div className="setting-quantity">
                      <small>{"Qnt:" + photoSettings?.quantity}</small>
                    </div>
                    <div className="setting-showdate">
                      <small>
                        {photoSettings?.showDate ? "data: on" : "data: off"}
                      </small>
                    </div>
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
