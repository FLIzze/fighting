package server

import (
    "encoding/json"
    "fmt"
    "net"
    "sync"
    "time"
    "udp-server/structs"
    "udp-server/log"
)

const (
    MAX_PLAYER_INACTIVITY = 5 * time.Second
    PERIODIC_BROADCAST    = 2 * time.Second
)

type Server struct {
    players map[string]structs.Player
    mu      sync.Mutex
    conn    *net.UDPConn
    clients map[string]*ClientInfo
}

type ClientInfo struct {
    addr       *net.UDPAddr
    lastSeen   time.Time
    playerUuid string 
}

func NewServer() *Server {
    return &Server{
        players: make(map[string]structs.Player),
        clients: make(map[string]*ClientInfo),
    }
}

func (s *Server) Start(host, port string) {
    udpAddr, err := net.ResolveUDPAddr("udp", host+":"+port)
    if err != nil {
        log.Log("error", fmt.Sprintf("Error resolving UDP address: %s", err))
    }

    conn, err := net.ListenUDP("udp", udpAddr)
    if err != nil {
        log.Log("error", fmt.Sprintf("Error listening on UDP: %s", err))
    }
    s.conn = conn
    log.Log("info", fmt.Sprintf("Server started on %s", udpAddr))

    go s.periodicBroadcast()
    s.listen()
}

func (s *Server) listen() {
    buffer := make([]byte, 1024)
    for {
        n, addr, err := s.conn.ReadFromUDP(buffer)
        if err != nil {
            log.Log("error", fmt.Sprintf("Error reading from UDP: %s", err))
        }

        var player structs.Player
        err = json.Unmarshal(buffer[:n], &player)
        if err != nil {
            log.Log("error", fmt.Sprintf("Error unmarshaling player data: %s", err))
        }

        s.mu.Lock()
        s.players[player.Uuid] = player
        s.clients[addr.String()] = &ClientInfo{
            addr:       addr,
            lastSeen:   time.Now(),
            playerUuid: player.Uuid, 
        }
        s.mu.Unlock()

        log.Log("info", fmt.Sprintf("Received update from %s (UUID: %s, Name: %s)", addr, player.Uuid, player.Name))
    }
}

func (s *Server) periodicBroadcast() {
    ticker := time.NewTicker(PERIODIC_BROADCAST)
    defer ticker.Stop()

    for {
        <-ticker.C
        s.cleanupInactiveClients()
        s.broadcastPlayers()
    }
}

func (s *Server) cleanupInactiveClients() {
    s.mu.Lock()
    defer s.mu.Unlock()

    for addr, client := range s.clients {
        if time.Since(client.lastSeen) > MAX_PLAYER_INACTIVITY {
            log.Log("warning", fmt.Sprintf("Removing inactive client %s (Last seen: %v, Inactive for > 5s)", addr, client.lastSeen))

            delete(s.players, client.playerUuid)
            delete(s.clients, addr)
        }
    }
}

func (s *Server) broadcastPlayers() {
    s.mu.Lock()
    defer s.mu.Unlock()

    var playerUpdates []structs.Player
    for _, player := range s.players {
        playerUpdates = append(playerUpdates, player)
    }

    data, err := json.Marshal(playerUpdates)
    if err != nil {
        log.Log("error", fmt.Sprintf("Error marshaling player data: %s", err))
        return
    }

    for _, clientInfo := range s.clients {
        _, err := s.conn.WriteToUDP(data, clientInfo.addr)
        if err != nil {
            log.Log("error", fmt.Sprintf("Error sending data to client: %s", err))
        }
        log.Log("info", fmt.Sprintf("Broadcasting to %s: %s", clientInfo.addr, formatPlayerData(data)))
    }
}

func formatPlayerData(data []byte) string {
    var players []structs.Player
    err := json.Unmarshal(data, &players)
    if err != nil {
        log.Log("error", fmt.Sprintf("Error unmarshaling player data for logging: %s", err))
        return string(data)
    }

    var playerInfo string
    for _, player := range players {
        playerInfo += fmt.Sprintf("{Name: %s} ", player.Name)
    }

    return playerInfo
}
