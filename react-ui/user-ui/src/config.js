const config = {
    API: () => {
        if (process.env.NODE_ENV == "production") {
            return "https://gistmanager-backend.herokuapp.com/gist-service";
        } else {
            return "http://127.0.0.1:8080/gist-service";
        }
    },
};

export default config;
