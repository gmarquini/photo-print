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

type SessionSideProps = {
  selectedPhotosIds: string[];
  selectedCount: number;
  onApply: (draftSettings: PrintSettings[]) => void;
};

export function SessionSide({
  selectedPhotosIds,
  selectedCount,
  onApply,
}: SessionSideProps) {
  const [size, setSize] = useState<PhotoSize>("10x15");
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

  function sendInformation() {
    if (selectedPhotosIds.length === 0) {
      return alert("Selecione pelo menos uma foto para aplizar as mudanças");
    }

    const draftSettings = selectedPhotosIds.map((photoId) => ({
      photoId,
      size,
      quantity,
      paperType,
      showDate,
    }));

    onApply(draftSettings);
  }

  return (
    <form className="session-side">
      <p>{selectedCount} fotos selecionadas</p>
      <h2>Selecione as fotos e defina como quer imprimir</h2>
      <div className="size-container">
        <label>Tamanho</label>
      </div>
      {sizes.map((sizeOption) => (
        <label key={sizeOption} htmlFor={sizeOption} className="size-option">
          <input
            type="radio"
            id={sizeOption}
            name="size"
            value={sizeOption}
            checked={size === sizeOption}
            onChange={() => setSize(sizeOption)}
          />
          <span>{sizeOption}</span>
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
            checked={paperType === "glossy"}
            onChange={() => setPaperType("glossy")}
          />
          <span>Brilhante</span>
        </label>
        <label htmlFor="matte" className="paper-type">
          <input
            type="radio"
            name="paperType"
            id="matte"
            value="matte"
            checked={paperType === "matte"}
            onChange={() => setPaperType("matte")}
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
            value={quantity}
            min={1}
            onChange={(event) => setQuantity(Number(event.target.value))}
          />
        </label>
      </div>

      <div>
        <label htmlFor="show-date">Adicione data à foto:</label>
        <input
          id="show-date"
          type="checkbox"
          checked={showDate}
          onChange={(event) => setShowDate(event.target.checked)}
        />
      </div>

      <button type="button" onClick={sendInformation}>
        Aplicar
      </button>
    </form>
  );
}
