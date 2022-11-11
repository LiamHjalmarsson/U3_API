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
    <link rel="stylesheet" href="css/add_database.css">
    <title>Add to database </title>
</head>

<body>
    
<?php require_once("sections/navigation.php"); ?>

    <main>

        <h1> ADD SOMETHING TO DATABASE </h1>
        
        <form id="add_music" action="http://localhost:8080/api/create.php" method="POST">
            <input type="text" name="band" placeholder="Enter band or artist" class="band">
            <input class="album" type="text" name="album" placeholder="Enter album">
            <input type="file" name="image" class="image">
            <input class="genre" type="text" name="genre" placeholder="Enter genre">
            <input class="year" type="number" name="year" placeholder="Enter year">
            <button type="submit" id="submit_btn" class="band_btn"> <a> Add data </a> </button>
        </form>

    </main>

    <section>

    </section>

    <footer>
        <?php
            $date_year = date("Y");
            echo "<p> Copyright © $date_year </p>";
        ?>
    </footer>

    <script src="js/reuse.js"></script>
    <script src="js/navigation.js"></script>
    <script src="js/add_to_database.js"></script>
        
</body>
</html> 