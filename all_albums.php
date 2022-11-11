<?php
    ini_set("display_erorres", 1);

    ?>
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/all_albums.css">
        <title> All albums </title>
    </head>
    
    <body>
        
    <?php require_once("sections/navigation.php"); ?>
    
    <main>
        <h1> List of all albums </h1>
    </main>
    
    <footer>
        <?php
            $date_year = date("Y");
            echo "<p> Copyright © $date_year </p>";
        ?>
    </footer>

    <script src="js/reuse.js"></script>
    <script src="js/navigation.js"></script>
    <script src="js/all_albums.js"></script>
    
</body>
</html> 