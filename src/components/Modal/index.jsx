import { FiX } from "react-icons/fi";
import "./modal.css";

export default function Modal({ content, close }) {
    return (
        <div className="modal">
            <div className="container">
                <button className="close" onClick={close}>
                    <FiX size={25} color="#FFF" />
                    Back
                </button>

                <main>
                    <h2>Ticket details</h2>

                    <div className="row">
                        <span>
                            Customer: <i>{content.companyAddress}</i>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Subject: <i>{content.subject}</i>
                        </span>
                        <span>
                            Registered on: <i>{content.createdFormat}</i>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Status:
                            <i className="status-badge" style={{ color: "#FFF", backgroundColor: content.status === "Open" ? "#5CB85C" : "#999" }}>
                                {content.status}
                            </i>
                        </span>
                    </div>

                    {content.supplement !== '' && (
                        <>
                            <h3>Supplement</h3>
                            <p>
                                {content.supplement}
                            </p>
                        </>
                    )}

                </main>
            </div>
        </div>
    )
}