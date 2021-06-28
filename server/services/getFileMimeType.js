module.exports = function(extension) {
  switch (extension) {
    case '.py':
      return 'text/x-python'
    case '.php':
      return 'text/x-php'
    case '.js':
    case '.ts':
      return 'text/x-javascript'
    case '.vue':
    case '.jsx':
    case '.tsx':
      return 'text/jscript'
    case '.pas':
      return 'text/x-pascal'
    case '.cs':
      return 'application/x-csh'
    case '.cpp':
    case '.c':
      return 'text/plain'
    case '.java':
      return 'application/octet-stream'
    case '.html':
      return 'text/html'
    case '.css':
    case '.sass':
    case '.scss':
      return 'text/css'
    case '.txt':
      return 'text/plain'
    default:
      return
  }
}
