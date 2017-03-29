exports.name = 'story';
exports.outputFormat = ['md', 'markdown'];

exports.render = function (str) {
  const lines = str.split('\n');
  return lines.map((line) => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('{') && trimmedLine.endsWith('}')) {
      const name = trimmedLine.slice(1, -1).trim();
      return `<a name="${name}">\n`;
    } else {
      const matches = line.match(/\s*[*-]\s*([^{]+){([^}]+)}/);
      if (matches) {
        const linkContent = matches[1].trim();
        const target = matches[2];
        return `- [${linkContent}](#${target})`;
      }
    }
    
    return line;
  }).join('\n');
};

  