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
        <link rel="stylesheet" href="css/album.css">
        <title> <?php echo $_GET["album"]?> </title>
    </head>
    
    <body>
        
    <?php require_once("sections/navigation.php"); ?>
    
    <main>
    </main>
    
    <footer>
        <?php
            $date_year = date("Y");
            echo "<p> Copyright © $date_year </p>";
        ?>
    </footer>

    <script src="js/reuse.js"></script>
    <script src="js/navigation.js"></script>
    <script src="js/album.js"></script>
    <script src="js/album_btns.js"></script>

    
</body>
</html> 