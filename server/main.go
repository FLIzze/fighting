package main

import (
    s "server/server"
)

const (
    HOST = "localhost"
    PORT = "6969"
)

func main() {
    server := s.Server{Host: HOST, Port: PORT}
    server.Start(HOST, PORT)
}
