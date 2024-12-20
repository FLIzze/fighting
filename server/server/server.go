package server

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type Server struct {
    Host string
    Port string
}

var upgrade = websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool {
        return true
    },
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrade.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
        return
    }
    defer conn.Close()

    conn.WriteMessage(websocket.TextMessage, []byte("Hello, client!"))
    log.Println("Client connected")

    for {
        messageType, p, err := conn.ReadMessage()
        if err != nil {
            log.Println("read: ", err)
            break
        }
        log.Printf("Received: %s", p)

        if err := conn.WriteMessage(messageType, p); 
        err != nil {
            log.Println("write: ", err)
            break
        }
    }
}

func (s *Server) Start(host string, port string) {
    http.HandleFunc("/ws", handleConnections)

    log.Printf("Server started on %s:%s", s.Host, s.Port)
    err := http.ListenAndServe(s.Host+":"+s.Port, nil)
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}
