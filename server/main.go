package main

import (
    "encoding/json"
    "log"
    "net/http"

    "github.com/gorilla/websocket"
)

const (
    HOST = "localhost"
    PORT = "6969"
)

type Player struct {
    Name     string   `json:"name"`
    Uuid     string   `json:"uuid"`
    Cords    Cords    `json:"cords"`
    Size     Size     `json:"size"`
    Velocity Velocity `json:"velocity"`
}

type Velocity struct {
    X float32 `json:"x"`
    Y float32 `json:"y"`
}

type Cords struct {
    X float32 `json:"x"`
    Y float32 `json:"y"`
}

type Size struct {
    Width  int `json:"width"`
    Height int `json:"height"`
}

type Message struct {
    Type    string   `json:"type"`
    Player  Player   `json:"player"`  
    Players []Player `json:"players"`
}

var upgrader = websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool {
        return true
    },
}

var (
    players     = make(map[string]Player)
    connections = make(map[string]*websocket.Conn)
)

func handleConnection(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println("Upgrade error:", err)
        return
    }
    defer conn.Close()

    var player Player

    for {
        _, p, err := conn.ReadMessage()
        if err != nil {
            log.Println("Read message error:", err)
            break
        }

        var message Message
        err = json.Unmarshal(p, &message)
        if err != nil {
            log.Println("Unmarshal error:", err)
            continue
        }

        switch message.Type {
        case "join":
            log.Println("Player connected:", message.Player.Uuid)
            player = message.Player
            players[player.Uuid] = player
            connections[player.Uuid] = conn
            broadcast("join", players)
        case "update":
            for _, p := range message.Players {
                players[p.Uuid] = p
            }
            broadcast("update", players)
        default:
            log.Println("Unknown message type:", message.Type)
        }
    }

    log.Println("Player disconnected:", player.Uuid)
    delete(players, player.Uuid)
    delete(connections, player.Uuid)
}

func broadcast(eventType string, players map[string]Player) {
    var playerList []Player
    for _, p := range players {
        playerList = append(playerList, p)
    }

    message := Message{
        Type:    eventType,
        Players: playerList,
    }

    for _, conn := range connections {
        err := conn.WriteJSON(message)
        if err != nil {
            log.Println("Write message error:", err)
            return
        }
    }
}

func main() {
    http.HandleFunc("/ws", handleConnection)
    log.Println("Server started at", HOST+":"+PORT)
    log.Fatal(http.ListenAndServe(HOST+":"+PORT, nil))
}

