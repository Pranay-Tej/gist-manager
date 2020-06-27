import config from "./config";

const API = config.API();

const wakeupService = {
    wakeupBackend: () => {
        return fetch(`${API}/wakeup`,{ method: "GET"})
        .then((response) => response.text())
    }
};

export default wakeupService;
