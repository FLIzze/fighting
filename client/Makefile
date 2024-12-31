CXX = g++
CXXFLAGS = -I/usr/include/SFML -I$(PWD)/include -std=c++17
LDFLAGS = -L/usr/lib/x86_64-linux-gnu -lsfml-window -lsfml-system -lsfml-graphics

TARGET = ./build/game
SRC = src/main.cpp src/player.cpp src/prop.cpp

all: $(TARGET)

$(TARGET): $(SRC)
	$(CXX) $(CXXFLAGS) $(SRC) -o $(TARGET) $(LDFLAGS)

clean:
	rm -f $(TARGET) build/*.o
