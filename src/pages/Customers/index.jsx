import { useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiUser } from "react-icons/fi";

export default function Customers() {
    const [nome, setName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [address, setAddress] = useState("");

    function handleRegister(e) {
        e.preventDefault();
        alert("TEST")
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Customers">
                    <FiUser size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Trade name</label>
                        <input
                            type="text"
                            placeholder="Company name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>CNPJ</label>
                        <input
                            type="text"
                            placeholder="Enter your CNPJ"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                        />

                        <label>Address</label>
                        <input
                            type="text"
                            placeholder="Company address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <button type="submit">
                            Save
                        </button>
                    </form>
                </div>

            </div>

        </div>
    );
}