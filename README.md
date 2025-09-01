# Project 4 — Jenkins Distributed Pipeline (Controller + 2 SSH Agents)

This demo sets up a Jenkins controller with **two Linux agents**. The Jenkins pipeline compiles a Maven project on **agent1** and runs tests on **agent2**.

## Prerequisites
- Docker Desktop (Windows/macOS) or Docker Engine (Linux)
- `docker compose` v2
- 4 GB RAM and 2 CPUs allocated to Docker
- Ports `8080` (HTTP) and `50000` (JNLP) free

## 1) Start the stack
```bash
docker compose build
docker compose up -d
docker ps
```
You should see 3 containers: `jenkins`, `agent1`, `agent2`.

## 2) Unlock Jenkins
- Open http://localhost:8080
- Get the admin password:
  ```bash
  docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword
  ```
- Install **Suggested plugins** (ensure **SSH Build Agents**, **Pipeline**, **Git** are included).

## 3) Create SSH credentials
- Manage Jenkins → Credentials → System → Global credentials → **Add Credentials**
  - Kind: Username with password
  - Username: `jenkins`
  - Password: `jenkins`
  - ID: `agent-ssh-creds`

## 4) Register agents
- Manage Jenkins → Nodes → New Node
  - Name: `agent1`
  - Type: Permanent Agent
  - # of executors: 1
  - Remote root dir: `/home/jenkins`
  - Labels: `agent1`
  - Launch method: **Launch agents via SSH**
    - Host: `agent1`
    - Credentials: `agent-ssh-creds`
    - Host Key Verification Strategy: **Non verifying...**
  - Save and **Launch agent**.
- Repeat for `agent2` (label `agent2`, host `agent2`).

## 5) Create the Pipeline job
- New Item → **Pipeline**
- Name: `distributed-maven-pipeline`
- In **Pipeline** tab → Definition: **Pipeline script**
- Paste the contents of `Jenkinsfile` from this folder.
- Save.

## 6) Run
- Click **Build Now**
- Stage 1 (Prepare) & Stage 2 (Compile) run on **agent1**
- Stage 3 (Test) runs on **agent2**
- Artifacts and JUnit results are archived in the build.

## Notes
- The pipeline copies the project from `/repo/maven-project` (mounted read-only from this folder) into the agent workspaces.
- For real projects, store your Jenkinsfile and code in Git and use "Pipeline script from SCM".
- Default demo credentials: user `jenkins`/`jenkins` only exist inside demo agents for local use.
