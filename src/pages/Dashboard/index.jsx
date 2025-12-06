import { useContext } from "react";
import {AuthContext} from "../../contexts/auth";

export default function Dashboard() {
    const { logout } = useContext(AuthContext);

    async function handleLogout() {
        await logout();
    }

    return (
        <div>
            <h1>Page Dashboard</h1>
            <button onClick={handleLogout}>Log out</button>
        </div>
    );
}
