<?php
    ini_set("display_erorres", 1);

    require_once("sections/header.php");
    require_once("sections/navigation.php");

?>


    <h1> WELCOME TO LOVE FOR MUSIC </h1>
    
    <footer>
        <?php
            $date_year = date("Y");
            echo "<p> Copyright © $date_year </p>";
        ?>
    </footer>

    <script src="js/navigation.js"></script>
</html> 