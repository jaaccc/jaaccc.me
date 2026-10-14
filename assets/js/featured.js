const featured = document.getElementById("featured");

fetch("https://api.github.com/repos/jaaccc/keep")
    .then((response) => {
        if (!response.ok) {
            throw new Error("failed to fetch repository");
        }

        return response.json();
    })
    .then((repo) => {
        featured.innerHTML = "";

        const project = document.createElement("div");

        project.innerHTML = `
            <div><a href="${repo.html_url}">${repo.name}</a></div>
            <div>${repo.description || "no description available"}</div>
        `;

        featured.appendChild(project);
    })
    .catch((error) => {
        featured.textContent = "unable to load featured project";
        console.error(error);
    });
