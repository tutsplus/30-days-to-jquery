<?php

require 'functions.php';
connect();

if ( isset($_POST['q']) ) {
	$actors = get_actors_by_last_name( $_POST['q'] );
}

include 'views/index.tmpl.php';