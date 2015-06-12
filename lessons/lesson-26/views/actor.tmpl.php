<?php include '_partials/header.php'; ?>

<?php
	if ( $info ) {
		echo "<h1>{$info->first_name} {$info->last_name}</h1>";
		echo "<p>{$info->film_info}</p>";
	} else {
		echo "<p>No results available.</p>";
	}
?>

<p><a href="index.php">Back</a></p>
	
<?php include '_partials/footer.php'; ?>