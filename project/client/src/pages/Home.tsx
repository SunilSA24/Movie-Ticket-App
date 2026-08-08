import { useEffect } from "react";
import { getCurrenetUser } from "../apiCalls/authCalls"

function Home() {
    const getUser = async () => {
        try {
            const userData = await getCurrenetUser();
            console.log('user', userData);
        } catch (error) {

        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>Home</div>
    )
}

export default Home