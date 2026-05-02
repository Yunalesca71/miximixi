#!/bin/bash

# Restaurant API Deployment Script
# Usage: ./deploy.sh [start|stop|restart|status]

set -e

# Configuration
APP_NAME="restaurant-api"
PORT="${PORT:-8080}"
DB_PATH="${DB_PATH:-./restaurant.db}"
LOG_FILE="./restaurant-api.log"
PID_FILE="./restaurant-api.pid"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_go() {
    if ! command -v go &> /dev/null; then
        log_error "Go is not installed. Please install Go 1.21+ first."
        log_info "Visit: https://go.dev/doc/install"
        exit 1
    fi

    GO_VERSION=$(go version | awk '{print $3}' | sed 's/go//')
    log_info "Go version: $GO_VERSION"
}

get_pid() {
    if [ -f "$PID_FILE" ]; then
        cat "$PID_FILE"
    else
        pgrep -f "./$APP_NAME" || echo ""
    fi
}

is_running() {
    PID=$(get_pid)
    if [ -n "$PID" ]; then
        ps -p "$PID" > /dev/null 2>&1
        return $?
    fi
    return 1
}

stop_service() {
    log_info "Stopping $APP_NAME..."
    
    PID=$(get_pid)
    if [ -n "$PID" ]; then
        kill "$PID" 2>/dev/null || true
        
        # Wait for process to stop
        for i in {1..10}; do
            if ! ps -p "$PID" > /dev/null 2>&1; then
                log_info "Service stopped"
                rm -f "$PID_FILE"
                return 0
            fi
            sleep 1
        done
        
        # Force kill if still running
        log_warn "Force killing process..."
        kill -9 "$PID" 2>/dev/null || true
        rm -f "$PID_FILE"
    else
        log_warn "No running process found"
    fi
}

start_service() {
    if is_running; then
        log_warn "Service is already running (PID: $(get_pid))"
        return 0
    fi

    log_info "Building $APP_NAME..."
    
    # Download dependencies
    log_info "Downloading dependencies..."
    go mod download
    
    # Build binary
    log_info "Compiling..."
    go build -o "$APP_NAME" .
    
    if [ ! -f "$APP_NAME" ]; then
        log_error "Build failed - binary not found"
        exit 1
    fi
    
    log_info "Build successful"
    
    # Start service
    log_info "Starting $APP_NAME on port $PORT..."
    
    export PORT="$PORT"
    export DB_PATH="$DB_PATH"
    
    nohup "./$APP_NAME" > "$LOG_FILE" 2>&1 &
    NEW_PID=$!
    
    # Save PID
    echo "$NEW_PID" > "$PID_FILE"
    
    # Wait for service to start
    sleep 2
    
    if is_running; then
        log_info "Service started successfully (PID: $NEW_PID)"
        log_info "API available at: http://localhost:$PORT"
        log_info "Swagger UI: http://localhost:$PORT/swagger/index.html"
        log_info "Logs: $LOG_FILE"
    else
        log_error "Failed to start service. Check logs: $LOG_FILE"
        exit 1
    fi
}

show_status() {
    if is_running; then
        PID=$(get_pid)
        log_info "$APP_NAME is running (PID: $PID)"
        log_info "API URL: http://localhost:$PORT"
        log_info "Swagger UI: http://localhost:$PORT/swagger/index.html"
        
        # Show recent logs
        if [ -f "$LOG_FILE" ]; then
            echo ""
            log_info "Recent logs:"
            tail -5 "$LOG_FILE"
        fi
    else
        log_warn "$APP_NAME is not running"
    fi
}

# Main command handler
case "${1:-start}" in
    start)
        check_go
        start_service
        ;;
    stop)
        stop_service
        ;;
    restart)
        check_go
        stop_service
        sleep 1
        start_service
        ;;
    status)
        show_status
        ;;
    build)
        check_go
        log_info "Building $APP_NAME..."
        go mod download
        go build -o "$APP_NAME" .
        log_info "Build successful: ./$APP_NAME"
        ;;
    *)
        echo "Usage: $0 [start|stop|restart|status|build]"
        echo ""
        echo "Commands:"
        echo "  start   - Build and start the service (default)"
        echo "  stop    - Stop the running service"
        echo "  restart - Restart the service"
        echo "  status  - Show service status and logs"
        echo "  build   - Build binary only"
        echo ""
        echo "Environment variables:"
        echo "  PORT    - Server port (default: 8080)"
        echo "  DB_PATH - SQLite database path (default: ./restaurant.db)"
        exit 1
        ;;
esac
