CXX = g++
CXXFLAGS = -I/usr/include/SFML -std=c++17
LDFLAGS = -L/usr/lib/x86_64-linux-gnu -lsfml-window -lsfml-system -lsfml-graphics

TARGET = game
SRC = main.cpp

all: $(TARGET)

$(TARGET): $(SRC)
	$(CXX) $(CXXFLAGS) $(SRC) -o $(TARGET) $(LDFLAGS)

clean:
	rm -f $(TARGET)
