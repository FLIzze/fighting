package server

import (
    "bytes"
    "encoding/binary"
    "log"
    "net"
)

func Start(host string, port string) {
    addr, err := net.ResolveUDPAddr("udp", host+":"+port)
    if err != nil {
        log.Fatal("Error while starting server: ", err)
    }

    conn, err := net.ListenUDP("udp", addr)
    if err != nil {
        log.Fatal("Error while starting server: ", err)
    }
    defer conn.Close()
    log.Printf("Server started on %s", addr)

    for {
        handleConnection(conn)
    }
}

func handleConnection(conn *net.UDPConn) {
    buf := make([]byte, 1024) 
    n, addr, err := conn.ReadFromUDP(buf)
    if err != nil {
        log.Fatalf("Error reading from %s: %s", addr, err)
    }

    reader := bytes.NewReader(buf[:n])
    var length uint16
    err = binary.Read(reader, binary.BigEndian, &length)
    if err != nil {
        log.Fatalf("Error reading length from %s: %s", addr, err)
    }

    typeBytes := make([]byte, length)
    _, err = reader.Read(typeBytes)
    if err != nil {
        log.Fatalf("Error reading type from %s: %s", addr, err)
    }
    typeName := string(typeBytes)

    data := buf[n-int(length):]

    log.Printf("Received message from %s: Type: %s, Data: %s", addr, typeName, data)

    switch typeName {
    case "JOIN":
        handleJoin(data)
    case "LEAVE":
        handleLeave(data)
    case "MOVE":
        handleMove(data)
    default:
        log.Println("Unknown type:", typeName)
    }
}

func handleUpdate(data []byte) {
    // Process UPDATE message
}

func handleJoin(data []byte) {
    // Process JOIN message
}

func handleLeave(data []byte) {
    // Process LEAVE message
}

func handleMove(data []byte) {
    // Process MOVE message
}
