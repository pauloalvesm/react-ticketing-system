import { useContext, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiSettings, FiUpload } from "react-icons/fi";
import avatar from "../../assets/images/avatar.png";
import { AuthContext } from "../../contexts/auth";
import "./profile.css";

export default function Profile() {
    const { user } = useContext(AuthContext);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);

    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === "image/jpeg" || image.type === "image/png") {
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(image))
            } else {
                alert("Please send an image in PNG or JPEG format.")
                setImageAvatar(null);
                return;
            }
        }
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="My account">
                    <FiSettings size={25} />
                </Title>

                <div className="container">

                    <form className="form-profile">
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25} />
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile} /> <br />
                            {avatarUrl === null ? (
                                <img src={avatar} alt="Profile picture" width={250} height={250} />
                            ) : (
                                <img src={avatarUrl} alt="Profile picture" width={250} height={250} />
                            )}

                        </label>

                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                        <label>Email</label>
                        <input type="text" value={email} disabled={true} />

                        <button type="submit">Save</button>
                    </form>

                </div>

                <div className="container">
                    <button className="logout-btn" onClick={() => logout()}>Exit</button>
                </div>

            </div>

        </div>
    );
}