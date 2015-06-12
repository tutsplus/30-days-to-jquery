<?php

require 'functions.php';
connect();

$info = get_actor_info( $_GET['actor_id'] );

include 'views/actor.tmpl.php';