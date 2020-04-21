import Emitter from "./emitter";

const userService = {
    getUsername: () => {
        return localStorage.getItem("username")
    },
    setUsername: () => {
        const username = window.prompt("Enter GitHub Username: ")
        if(username === null || username ===''){
            return
        }
        localStorage.setItem("username", username)
        Emitter.emit("usernameUpdate")
    },
    
};

export default userService;
