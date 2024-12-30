package main

import (
    s "udp-server/server"
)

const (
    HOST = "localhost"
    PORT = "6969"
)

func main() {
    server := s.NewServer()
    server.Start(HOST, PORT)
}
