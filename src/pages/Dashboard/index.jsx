import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, limit, startAfter, query } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { format } from "date-fns";
import Modal from "../../components/Modal";
import "./dashboard.css";

const listRef = collection(db, "ticketing");

export default function Dashboard() {
    const { logout } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();
    const [loadingMore, setLoadingMore] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();

    useEffect(() => {
        async function loadTickets() {
            const q = query(listRef, orderBy("created", "desc"), limit(5));
            const querySnapshot = await getDocs(q);

            setTickets([]);
            await updateState(querySnapshot);
            setLoading(false);
        }

        loadTickets();

        return () => { }
    }, []);

    async function updateState(querySnapshot) {
        const isCollectionEmpty = querySnapshot.size === 0;

        if (!isCollectionEmpty) {
            let ticketList = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();

                ticketList.push({
                    id: doc.id,
                    subject: data.subject,
                    customer: data.customer || data.companyAddress || "Not found",
                    customerId: data.customerId,
                    created: data.created,
                    createdFormat: format(data.created.toDate(), "MM/dd/yyyy"),
                    status: data.status,
                    supplement: data.supplement,
                });
            });

            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

            setTickets(tickets => [...tickets, ...ticketList]);
            setLastDocs(lastDoc);

        } else {
            setIsEmpty(true);
        }

        setLoadingMore(false);
    }

    async function handleMore() {
        setLoadingMore(true);
        const q = query(listRef, orderBy("created", "desc"), startAfter(lastDocs), limit(5));
        const querySnapshot = await getDocs(q);
        await updateState(querySnapshot);
    }

    function toggleModal(item) {
        setShowPostModal(!showPostModal);
        setDetail(item);
    }

    if (loading) {
        return (
            <div>
                <Header />
                <div className="content">
                    <Title name="Tickets">
                        <FiMessageSquare size={25} />
                    </Title>
                    <div className="container dashboard">
                        <span>Looking for tickets...</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Tickets">
                    <FiMessageSquare size={25} />
                </Title>

                {tickets.length === 0 ? (
                    <div className="container dashboard">
                        <span>No tickets found...</span>
                        <Link to="/new" className="new">
                            <FiPlus color="#FFF" size={25} />
                            New ticket
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link to="/new" className="new">
                            <FiPlus color="#FFF" size={25} />
                            New ticket
                        </Link>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Subject</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td data-label="Customer">{item.customer}</td>
                                            <td data-label="Subject">{item.subject}</td>
                                            <td data-label="Status">
                                                <span className="badge" style={{ backgroundColor: item.status === "Open" ? "#5CB85C" : "#999" }}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td data-label="Registered">{item.createdFormat}</td>
                                            <td data-label="ACTIONS">
                                                <button className="action" style={{ backgroundColor: "#3583F6" }} onClick={ () => toggleModal(item)}>
                                                    <FiSearch color="#FFF" size={17} />
                                                </button>
                                                <Link to={`/new/${item.id}`} className="action" style={{ backgroundColor: "#F6A935" }}>
                                                    <FiEdit2 color="#FFF" size={17}/>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        {loadingMore && <h3>Looking for tickets...</h3>}
                        {!loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Search more</button>}
                    </>
                )}
            </div>

            {showPostModal && (
                <Modal
                    content={detail} 
                    close={() => setShowPostModal(!showPostModal)}
                />
            )}

        </div>
    );
}