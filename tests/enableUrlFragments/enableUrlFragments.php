<?

// Example PHP code where assets are just in static strings and must be explicitly identified
$foo = 'assets/standard.css#grunt-cache-bust';
$bar = "assets/standard.jpg#grunt-cache-bust";

?>
<html>
<head>
    <title>Test page</title>
</head>
<body>
    <script type="text/javascript" src="assets/standard.js#grunt-cache-bust"></script>
</body>
</html>
