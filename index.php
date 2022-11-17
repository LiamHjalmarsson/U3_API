<!-- https://github.com/LiamHjalmarsson/U3_API -->
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
        <link rel="stylesheet" href="css/homepage.css">
        <title> HomePage </title>
    </head>
    
    <body>
        
    <?php require_once("sections/navigation.php"); ?>

    <header>
        
        <h1> WELCOME TO LOVE FOR MUSIC </h1>

    </header>

    <footer>
        <?php
            $date_year = date("Y");
            echo "<p> Copyright © $date_year </p>";
        ?>
    </footer>

    <script src="js/reuse.js"></script>
    <script src="js/navigation.js"></script>
    
<body>
</html> 