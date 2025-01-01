#ifndef STRUCTS_H
#define STRUCTS_H
struct Coords {
    float x, y;
};

struct Size {
    float width, height;
};

struct Velocity {
    float x, y;
};

struct KeyState {
    bool left;
    bool right;
    bool up;
    bool down;
};

#endif
