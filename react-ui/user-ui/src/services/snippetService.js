import config from "../config";

const API = config.API();

const snippetService = {
    getUserSnippets: (username) => {
        return fetch(`${API}/snippets/${username}/all`,{ method: "GET"})
        .then((response) => response.json())
    },
    getTagSnippets: (tagId) => {
        return fetch(`${API}/snippets/tag/${tagId}`,{ method: "GET"})
        .then((response) => response.json())
    },
    downloadSnippetById: (snippet_id) => {
        return fetch(`${API}/snippets/download/${snippet_id}`,{ method: "GET"})
        .then((response) => response.json())
    }
};

export default snippetService;
