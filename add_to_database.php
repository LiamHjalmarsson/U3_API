<?php
    ini_set("display_erorres", 1);

    require_once("sections/header.php");
    require_once("sections/navigation.php");

?>


    <main>

        <h1> ADD SOMETHING TO DATABASE </h1>
        
        <form id="add_music" action="http://localhost:8080/api/create.php" method="POST">
            <input type="text" name="band" placeholder="Enter band or artist" class="band">
            <input class="album" type="text" name="album" placeholder="Enter album">
            <input type="file" name="image" class="image">
            <input class="year" type="text" name="changer" placeholder="Enter changer">
            <input class="year" type="number" name="year" placeholder="Enter year">
            <!-- <input class="song" type="text" name="song" placeholder="Enter song"> -->
            <button type="submit" id="submit_btn"> Add to database </button>
        </form>

        <!-- <button class="add_another"> Add another song </button> -->

    </main>

    <section>

    </section>

    <footer>
        <?php
            $date_year = date("Y");
            echo "<p> Copyright © $date_year </p>";
        ?>
    </footer>

    <script src="js/navigation.js"></script>
    <script src="js/add_to_database.js"></script>
</html> 