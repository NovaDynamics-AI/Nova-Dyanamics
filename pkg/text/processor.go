
package text

import (
    "strings"
    "unicode"
)

func CountTokens(text string) int {
    return len(strings.Fields(text))
}

func TruncateText(text string, maxLength int) string {
    words := strings.Fields(text)
    if len(words) <= maxLength {
        return text
    }
    return strings.Join(words[:maxLength], " ") + "..."
}

func ExtractCodeBlocks(text string) []string {
    var blocks []string
    var inBlock bool
    var currentBlock strings.Builder
    
    lines := strings.Split(text, "\n")
    for _, line := range lines {
        if strings.HasPrefix(strings.TrimSpace(line), "```") {
            if inBlock {
                blocks = append(blocks, currentBlock.String())
                currentBlock.Reset()
            }
            inBlock = !inBlock
            continue
        }
        
        if inBlock {
            currentBlock.WriteString(line)
            currentBlock.WriteRune('\n')
        }
    }
    
    return blocks
}

func SanitizeInput(text string) string {
    return strings.Map(func(r rune) rune {
        if unicode.IsControl(r) && r != '\n' && r != '\t' {
            return -1
        }
        return r
    }, text)
}
