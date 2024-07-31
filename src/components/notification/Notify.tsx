import "./Notify.css";
import { Notification } from "./types";

interface NotifyProps extends Notification {
  onClose?: (id: number) => void;
}

export function Notify(props: NotifyProps) {
  const { id, title, details, image, onClose } = props;

  return (
    <div className="notify">
      {image && (
        <img src={image} alt="Notification Icon" className="notify-image" />
      )}
      <div className="notify-content">
        <h4 className="notify-title">{title}</h4>
        {details && <p className="notify-details">{details}</p>}
      </div>
      <button className="notify-close" onClick={() => onClose && onClose(id)}>
        ×
      </button>
    </div>
  );
}

export default Notify;
