#!/bin/bash

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "Docker is not running. Please start Docker first."
        exit 1
    fi
}

# Function to start the database
start_db() {
    echo "Starting MySQL container..."
    docker-compose up -d
    echo "Waiting for MySQL to be ready..."
    while ! docker exec helios-mysql mysqladmin ping -h localhost -u root -proot --silent; do
        sleep 1
    done
    echo "MySQL is ready!"
}

# Function to stop the database
stop_db() {
    echo "Stopping MySQL container..."
    docker-compose down
}

# Function to restart the database
restart_db() {
    stop_db
    start_db
}

# Function to show database status
status_db() {
    if docker ps | grep -q helios-mysql; then
        echo "MySQL container is running"
    else
        echo "MySQL container is not running"
    fi
}

# Main script logic
check_docker

case "$1" in
    start)
        start_db
        ;;
    stop)
        stop_db
        ;;
    restart)
        restart_db
        ;;
    status)
        status_db
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac

exit 0 