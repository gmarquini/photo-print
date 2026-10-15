import { useState } from "react";
import "../styles/session-side.css";

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

type PrintSettings = {
  photoId: string;
  size: PhotoSize;
  quantity: number;
  paperType: "glossy" | "matte";
  showDate: boolean;
};

type SettinsDraft = Omit<PrintSettings, "photoId">;

type SessionSideProps = {
  selectedPhotosIds: string[];
  selectedCount: number;
  onApply: (settings: PrintSettings[]) => void;
};

export function SessionSide({
  selectedPhotosIds,
  selectedCount,
  onApply,
}: SessionSideProps) {
  const [size, setSize] = useState("10x15");
  const [quantity, setQuantity] = useState(1);
  const [paperType, setPaperType] = useState<"glossy" | "matte">("glossy");
  const [showDate, setShowDate] = useState(false);
  const sizes: PhotoSize[] = [
    "10x15",
    "13x18",
    "20x20",
    "13x35",
    "50x61",
    "40x50",
    "30x38",
    "28x35",
  ];

  return (
    <form className="session-side">
      <p>{selectedCount} fotos selecionadas</p>
      <h2>Selecione as fotos e defina como quer imprimir</h2>
      <div className="size-container">
        <label>Tamanho</label>
      </div>
      {sizes.map((sizeOption) => (
        <label key={size} htmlFor={size} className="size-option">
          <input
            type="radio"
            id={sizeOption}
            name="size"
            value={sizeOption}
            checked={size === sizeOption}
            onChange={() => setSize(sizeOption)}
          />
          <span>{size}</span>
        </label>
      ))}
      <div>
        <label>Acabamento</label>
        <label htmlFor="glossy" className="paper-type">
          <input
            type="radio"
            name="paperType"
            id="glossy"
            value="glossy"
            checked={
              selectedPhotosIds.length > 0 &&
              selectedPhotosIds.every((photoId) =>
                settings.some(
                  (setting) =>
                    setting.photoId === photoId &&
                    setting.paperType === "glossy",
                ),
              )
            }
            onChange={() =>
              onSettingsChange(
                settings.map((setting) =>
                  selectedPhotosIds.includes(setting.photoId)
                    ? { ...setting, paperType: "glossy" }
                    : setting,
                ),
              )
            }
          />
          <span>Brilhante</span>
        </label>
        <label htmlFor="matte" className="paper-type">
          <input
            type="radio"
            name="paperType"
            id="matte"
            value="matte"
            checked={
              selectedPhotosIds.length > 0 &&
              selectedPhotosIds.every((photoId) =>
                settings.some(
                  (setting) =>
                    setting.photoId === photoId &&
                    setting.paperType === "matte",
                ),
              )
            }
            onChange={() =>
              onSettingsChange(
                settings.map((setting) =>
                  selectedPhotosIds.includes(setting.photoId)
                    ? { ...setting, paperType: "matte" }
                    : setting,
                ),
              )
            }
          />
          <span>Fosco</span>
        </label>
      </div>

      <div>
        <label>Cópias</label>
        <label htmlFor="quantity">
          <input
            type="number"
            name="quantity"
            id="quantity"
            min={1}
            value={
              selectedPhotosIds.length > 0
                ? (settings.find((setting) =>
                    selectedPhotosIds.includes(setting.photoId),
                  )?.quantity ?? 1)
                : 1
            }
            onChange={(event) =>
              onSettingsChange(
                settings.map((setting) =>
                  selectedPhotosIds.includes(setting.photoId)
                    ? { ...setting, quantity: Number(event.target.value) }
                    : setting,
                ),
              )
            }
          />
        </label>
      </div>

      <div>
        <label htmlFor="show-date">Adicione data à foto:</label>
        <input
          id="show-date"
          type="checkbox"
          checked={
            selectedPhotosIds.length > 0 &&
            selectedPhotosIds.every((photoId) =>
              settings.some(
                (setting) => setting.photoId === photoId && setting.showDate,
              ),
            )
          }
          onChange={(event) =>
            onSettingsChange(
              settings.map((setting) =>
                selectedPhotosIds.includes(setting.photoId)
                  ? { ...setting, showDate: event.target.checked }
                  : setting,
              ),
            )
          }
        />
      </div>

      <button type="button" onClick={onApply}>
        Aplicar
      </button>
    </form>
  );
}
