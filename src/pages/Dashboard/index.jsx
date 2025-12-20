import { useContext } from "react";
import {AuthContext} from "../../contexts/auth";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
    const { logout } = useContext(AuthContext);

    async function handleLogout() {
        await logout();
    }

    return (
        <div>
            <Header/>
            <div className="content">
                <Title name="Tickets">
                    <FiMessageSquare size={25} />
                </Title>

                <>
                    <Link to="/new" className="new">
                        <FiPlus color="#FFF" size={25} />
                        New call 
                    </Link>

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Customer</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Status</th>
                                <th scope="col">Registering at</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Customer">Corner Market</td>
                                <td data-label="Subject">Support</td>
                                <td data-label="Status">
                                    <span className="badge" style={{ backgroundColor: '#999' }}>
                                        Open
                                    </span>
                                </td>
                                <td data-label="Registered">01/28/2025</td>
                                <td data-label="#">
                                    <button className="action" style={{ backgroundColor: '#3583f6' }}>
                                        <FiSearch color='#FFF' size={17} />
                                    </button>
                                    <button className="action" style={{ backgroundColor: '#f6a935' }}>
                                        <FiEdit2 color='#FFF' size={17} />
                                    </button>
                                </td>
                            </tr>



                            <tr>
                                <td data-label="Customer">TECH Information Technology</td>
                                <td data-label="Subject">Support</td>
                                <td data-label="Status">
                                    <span className="badge" style={{ backgroundColor: '#999' }}>
                                        Open
                                    </span>
                                </td>
                                <td data-label="Registered">01/28/2025</td>
                                <td data-label="#">
                                    <button className="action" style={{ backgroundColor: '#3583f6' }}>
                                        <FiSearch color='#FFF' size={17} />
                                    </button>
                                    <button className="action" style={{ backgroundColor: '#f6a935' }}>
                                        <FiEdit2 color='#FFF' size={17} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>

            </div>
        </div>
    );
}
