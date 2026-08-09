import { useEffect } from "react";
import { Avatar, Button, Input, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { getCurrenetUser } from "../apiCalls/authCalls";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/slices/user";

const { Text } = Typography;

function Home() {
    const dispatch = useDispatch();
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
    }, []);

    const isLoggedIn = Boolean(userData?.name);

    return (
        <div className="home-page">
            <nav className="movie-navbar">
                <div className="navbar-brand">
                    <span className="brand-icon">🎬</span>
                    <span className="brand-name">MovieApp</span>
                </div>

                <div className="navbar-search">
                    <Input.Search
                        placeholder="Search movies..."
                        size="large"
                        enterButton
                        className="navbar-search-input"
                    />
                </div>

                <div className="navbar-actions">
                    {isLoggedIn ? (
                        <Space align="center" size="small" className="profile-chip">
                            <Avatar style={{ backgroundColor: "rgb(235, 78, 98)" }}>
                                {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                            </Avatar>
                            <Text strong>{userData?.name}</Text>
                        </Space>
                    ) : (
                        <Link to="/login">
                            <Button type="primary" size="large" className="signin-btn">
                                Sign In
                            </Button>
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Home