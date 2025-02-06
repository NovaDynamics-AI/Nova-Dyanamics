use unicode_segmentation::UnicodeSegmentation;

pub fn count_tokens(text: &str) -> usize {
    // Simple tokenization based on words and punctuation
    text.unicode_words().count()
}

pub fn truncate_text(text: &str, max_length: usize) -> String {
    let words: Vec<&str> = text.unicode_words().collect();
    if words.len() <= max_length {
        return text.to_string();
    }
    words[..max_length].join(" ") + "..."
}

pub fn extract_code_blocks(text: &str) -> Vec<String> {
    let mut blocks = Vec::new();
    let mut in_block = false;
    let mut current_block = String::new();

    for line in text.lines() {
        if line.trim().starts_with("```") {
            if in_block {
                blocks.push(current_block.clone());
                current_block.clear();
            }
            in_block = !in_block;
            continue;
        }

        if in_block {
            current_block.push_str(line);
            current_block.push('\n');
        }
    }

    blocks
}

pub fn sanitize_input(text: &str) -> String {
    text.chars()
        .filter(|c| !c.is_control() || *c == '\n' || *c == '\t')
        .collect()
}
