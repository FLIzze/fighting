package main

import (
    s "udp-server/server"
)

const (
    HOST = "localhost"
    PORT = "6969"
)

func main() {
    s.Start(HOST, PORT)
}
