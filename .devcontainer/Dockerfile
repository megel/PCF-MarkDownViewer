# PCF TypeScript DevContainer
FROM mcr.microsoft.com/devcontainers/typescript-node:20

# Install Power Platform CLI (pac)
RUN npm install -g pac


# Install Mono and msbuild
RUN apt-get update \
    && apt-get install -y gnupg ca-certificates apt-transport-https \
    && apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF \
    && echo "deb https://download.mono-project.com/repo/ubuntu stable-focal main" | tee /etc/apt/sources.list.d/mono-official-stable.list \
    && apt-get update \
    && apt-get install -y mono-complete msbuild \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspaces/PCF-MarkDownViewer
