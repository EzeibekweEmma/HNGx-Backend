const express = require("express");
const app = express();
const port = 8888;
// Define a function to generate the response data
const response = (slack_name = "Ezeibekwe Emmanuel", track = "backend") => {
    const date = new Date();
    // Format the date and time as an ISO string (UTC format)
    const utc_time = date.toISOString();
    // Get the current day of the week (e.g., "Monday")
    const current_day = date.toLocaleString("en-us", { weekday: "long" });

    return {
        slack_name,
        current_day,
        utc_time,
        track,
        github_file_url:
            "https://github.com/EzeibekweEmma/HNGx-Backend/blob/main/hngx-stage-one/index.js",
        github_repo_url: "https://github.com/ezeibekweemma/HNGx-Backend",
        status_code: 200,
    };
};

// routes
app.get("/", (req, res) => {
    res.send(
        "<h2>Hello 👋, move to <a href='/api'>/api</a> to see the response.</h2>"
    );
});

app.get("/api", (req, res) => {
    const { slack_name, track } = req.query;
    res.status(200).json(response(slack_name, track));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
