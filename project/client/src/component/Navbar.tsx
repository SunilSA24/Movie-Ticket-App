import { useEffect } from "react";
import { Avatar, Button, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getCurrenetUser } from "../apiCalls/authCalls";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, setUserData } from "../redux/slices/user";

// const { Text } = Typography;

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector((state: any) => state.user);

    const getUser = async () => {
        try {
            const userData = await getCurrenetUser();
            dispatch(setUserData(userData));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUser();
    }, [dispatch]);

    const isLoggedIn = Boolean(userData?.name);

    const handleLogout = () => {
        dispatch(clearUserData());
        navigate("/login");
    };

    return (
        <header className="movie-header">
            <div className="navbar-brand">
                <span className="brand-icon">🎬</span>
                <div>
                    <div className="brand-name">MovieApp</div>
                    <div className="brand-subtitle">Book tickets now</div>
                </div>
            </div>

            <div className="navbar-search">
                <Input.Search
                    placeholder="Search for movies, shows, events"
                    size="large"
                    enterButton
                    className="navbar-search-input"
                />
            </div>

            <div className="navbar-actions">
                {isLoggedIn ? (
                    <div className="user-panel">
                        <div className="user-menu-trigger">
                            <Avatar style={{ backgroundColor: "#d84a60" }}>
                                {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                            </Avatar>
                            <Link to={'/admin'}  className="user-name-text">{userData?.name}</Link>
                        </div>

                        <div className="user-actions-column">
                            <button className="logout-btn" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link to="/login">
                        <Button type="primary" size="large" className="signin-btn">
                            Sign In
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Navbar