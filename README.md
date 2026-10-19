# Container Chaining

Brings back the container chaining mechanic from Mindustry v4 beta

Each push to `master` builds a mod ZIP, increments the version in `mod.hjson` by `0.01`, and publishes a GitHub release with the ZIP attached.

Current limitations:
- saving, connecting to a server relies on splitting the containers' contents which result in rounding errors in the save or desync in the client, losing you some items depending on the amount of containers you have
- multiple cores may delete more items than expected

![Screenshot](./screenshot.png)