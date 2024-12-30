package log

import "log"

const (
    COLOR_RESET   = "\033[0m"
    COLOR_GREEN   = "\033[32m"
    COLOR_YELLOW  = "\033[33m"
    COLOR_RED     = "\033[31m"
    COLOR_CYAN    = "\033[36m"
)

func Log(logLevel string, message string) {
    switch logLevel {
    case "info":
        log.Printf("%s[INFO] %s%s", COLOR_CYAN, message, COLOR_RESET)
    case "warning":
        log.Printf("%s[WARNING] %s%s", COLOR_YELLOW, message, COLOR_RESET)
    case "error":
        log.Printf("%s[ERROR] %s%s", COLOR_RED, message, COLOR_RESET)
    case "fatal":
        log.Fatalf("%s[FATAL] %s%s", COLOR_RED, message, COLOR_RESET)
    default:
        log.Printf("%s[INFO] %s%s", COLOR_CYAN, message, COLOR_RESET)
    }
}
