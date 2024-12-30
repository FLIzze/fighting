package structs

type Player struct {
    Name string `json:"name"`
    Uuid string `json:"uuid"`
    Cords Cords `json:"cords"`
    Velocity Velocity `json:"velocity"`
}

type Cords struct {
    X int `json:"x"`
    Y int `json:"y"`
}

type Velocity struct {
    X int `json:"x"`
    Y int `json:"y"`
}
