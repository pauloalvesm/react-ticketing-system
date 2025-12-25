
import { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiPlusCircle } from "react-icons/fi";
import { AuthContext } from "../../contexts/auth";
import { db } from "../../services/firebaseConnection";
import { collection, getDocs, getDoc, doc, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./new.css";

const listRef = collection(db, "customers");

export default function New() {
    const { user } = useContext(AuthContext);

    const [customers, setCustomers] = useState([]);
    const [loadCustomer, setLoadCustomer] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0)

    const [supplement, setSupplement] = useState("");
    const [subject, setSubject] = useState("Support");
    const [status, setStatus] = useState("Open");

    useEffect(() => {
        async function loadCustomers() {
            const querySnapshot = await getDocs(listRef)
                .then((snapshot) => {
                    let customerList = [];

                    snapshot.forEach((doc) => {
                        customerList.push({
                            id: doc.id,
                            companyAddress: doc.data().companyAddress
                        })
                    })

                    if (snapshot.docs.size === 0) {
                        console.log("NO COMPANIES FOUND");
                        setCustomers([{ id: "1", companyAddress: "FREELA" }]);
                        setLoadCustomer(false);
                        return;
                    }

                    setCustomers(customerList);
                    setLoadCustomer(false);

                })
                .catch((error) => {
                    console.log("ERROR WHEN SEARCHING FOR CUSTOMERS", error);
                    setLoadCustomer(false);
                    setCustomers([{ id: '1', companyAddress: "FREELA" }]);
                })
        }

        loadCustomers();
    }, []);


    function handleOptionChange(e) {
        setStatus(e.target.value);
    }

    function handleChangeSelect(e) {
        setSubject(e.target.value);
    }

    function hnadleChangeCustomer(e) {
        setCustomerSelected(e.target.value);
        console.log(customers[e.target.value].companyAddress);
    }

    async function handleRegister(e) {
        e.preventDefault();

        await addDoc(collection(db, "ticketing"), {
            created: new Date(),
            customer: customers[customerSelected].companyAddress,
            customerId: customers[customerSelected].id,
            subject: subject,
            supplement: supplement,
            status: status,
            userId: user.uid,
        })
            .then(() => {
                toast.success("Registered call!");
                setSupplement("");
                setCustomerSelected(0);
            })
            .catch((error) => {
                toast.error("Error registering, please try again later!");
                console.log(error);
            })
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="New call">
                    <FiPlusCircle size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>

                        <label>Customers</label>
                        {
                            loadCustomer ? (
                                <input type="text" disabled={true} value="Loading..." />
                            ) : (
                                <select value={customerSelected} onChange={hnadleChangeCustomer}>
                                    {customers.map((item, index) => {
                                        return (
                                            <option key={index} value={index}>
                                                {item.companyAddress}
                                            </option>
                                        )
                                    })}
                                </select>
                            )
                        }

                        <label>subject</label>
                        <select value={subject} onChange={handleChangeSelect} >
                            <option value="Support">Support</option>
                            <option value="Visit">Technical Visit</option>
                            <option value="Financial">Financial</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input
                                type="radio"
                                name="radio"
                                value="Open"
                                onChange={handleOptionChange}
                                checked={status === "Open"}
                            />
                            <span>Em Open</span>

                            <input
                                type="radio"
                                name="radio"
                                value="Progress"
                                onChange={handleOptionChange}
                                checked={status === "Progress"}
                            />
                            <span>Progress</span>

                            <input
                                type="radio"
                                name="radio"
                                value="Attended"
                                onChange={handleOptionChange}
                                checked={status === "Attended"}
                            />
                            <span>Attended</span>
                        </div>


                        <label>supplement</label>
                        <textarea
                            type="text"
                            placeholder="Describe your issue (optional)."
                            value={supplement}
                            onChange={(e) => setSupplement(e.target.value)}
                        />

                        <button type="submit">Register</button>

                    </form>
                </div>
            </div>
        </div>
    )
}