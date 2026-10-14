const updates = document.getElementById("updates");

fetch("https://api.github.com/users/jaaccc/repos")
    .then((response) => response.json())
    .then((repos) => {
        const requests = repos.map((repo) => {
            return fetch(`https://api.github.com/repos/jaaccc/${repo.name}/commits`)
                .then((response) => response.json())
                .then((commits) => {
                    return commits.map((commit) => ({
                        repository: repo.name,
                        date: commit.commit.author.date,
                        message: commit.commit.message,
                    }));
                });
        });

        return Promise.all(requests);
    })
    .then((commits) => {
        const allCommits = commits.flat();

        allCommits.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        const recentCommits = allCommits.slice(0, 3);

        updates.innerHTML = "";

        recentCommits.forEach((commit, index) => {
            const update = document.createElement("div");

            update.innerHTML = `
                <div><a href="https://github.com/jaaccc/${commit.repository}">${commit.repository}</a></div>
                <div>${new Date(commit.date).toLocaleDateString()}</div>
                <div>${commit.message}</div>
                ${index < recentCommits.length - 1 ? "<br>" : ""}
            `;

            updates.appendChild(update);
        });
    })
    .catch((error) => {
        updates.textContent = "unable to load updates";
        console.error(error);
    });
