# Frontend build stage
FROM node:20-alpine AS frontend
WORKDIR /app/web

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY web/package.json web/pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy frontend source code
COPY web .

# Create output directory for build artifacts
WORKDIR /app
RUN mkdir -p server/router/frontend/dist

# Build frontend
WORKDIR /app/web
RUN pnpm release

# Backend build stage
FROM golang:1.25-alpine AS backend
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Copy frontend build artifacts from frontend stage
# The frontend build output is in /app/server/router/frontend/dist in the frontend stage
COPY --from=frontend /app/server/router/frontend/dist ./server/router/frontend/dist

# Build backend
RUN CGO_ENABLED=0 go build \
    -trimpath \
    -ldflags="-s -w -extldflags '-static'" \
    -tags netgo \
    -o memos \
    ./cmd/memos

# Final stage
FROM alpine:latest

# Install runtime dependencies
RUN apk add --no-cache tzdata ca-certificates

WORKDIR /usr/local/memos

# Copy binary
COPY --from=backend /app/memos .

# Create data directory
RUN mkdir -p /var/opt/memos

# Set environment variables
ENV MEMOS_MODE="prod" \
    MEMOS_PORT="5230" \
    MEMOS_DATA="/var/opt/memos" \
    MEMOS_DRIVER="postgres"

# Expose port
EXPOSE 5230

# Volume for data persistence
VOLUME /var/opt/memos

# Run
ENTRYPOINT ["./memos"]
