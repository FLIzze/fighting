package structs

type Player struct {
    Name string `json:"name"`
    Uuid string `json:"uuid"`
    Cords Cords
    Velocity Velocity
    Size Size
}

type Cords struct {
    X int `json:"x"`
    Y int `json:"y"`
}

type Velocity struct {
    X int `json:"x"`
    Y int `json:"y"`
}

type Size struct {
    Width int `json:"width"`
    Height int `json:"height"`
}
