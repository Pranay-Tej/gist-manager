import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Library from "./components/library/Library";
import wakeupService from "./services/wakeupService";
import Loading from "./components/common/Loading";
import tagService from "./services/tagService";

function App() {
    const [wakeupMessage, setWakeupMessage] = useState(null);

    const wakeupBackend = () => {
        wakeupService.wakeupBackend().then((data) => {
            // console.log(data);
            setWakeupMessage(data);
        });
        // tagService.getUserTags("Pranay-Tej").then((data) => {
        //     console.log(data);
        //     setWakeupMessage(data);
        // });
    };

    useEffect(() => {
        if (wakeupMessage == null) {
            wakeupBackend();
        }
    }, []);

    return (
        <div className="app">
            {wakeupMessage ? (
                <>
                    <Navbar />
                    <Library />
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default App;
