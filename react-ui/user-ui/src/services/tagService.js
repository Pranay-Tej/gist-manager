const API = "http://127.0.0.1:8080/gist-service";

const tagService = {
    getUserTags: (username) => {
        return fetch(`${API}/tags/all/${username}`, {
            method: "GET",
        }).then((response) => response.json());
    },
    updateTagsOfSnippet: (snippet_id, updated_tags) => {
        return fetch(`${API}/snippets/updateTags/${snippet_id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated_tags)
        }).then((response) => response);
        // return this.http.put<boolean>(environment.gistService + '/snippets/updateTags/' + id, updated_tags);
    },
    createNewTag: (username, new_tag_name) => {
        return fetch(`${API}/tags/${username}/${new_tag_name}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        }).then((response) => response);
        // return this.http.post<Tag>(environment.gistService + '/tags/' + username + '/' + name, {});
      }
};

export default tagService;
