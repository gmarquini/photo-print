import loading from "../assets/loading.svg";
import "../styles/loading-component.css";

export function Loading() {
  return (
    <div className="loading-container">
      <img className="loading-component" src={loading} alt="" />
    </div>
  );
}
