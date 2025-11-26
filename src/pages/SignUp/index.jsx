export default function SignUp() {
    return (
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Ticket system logo" />
                </div>

                <form>
                    <h1>New account</h1>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="email@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="**********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Register</button>
                </form>

                <Link to="/">
                    Already have an account? Log in
                </Link>

            </div>
        </div>
    );
}