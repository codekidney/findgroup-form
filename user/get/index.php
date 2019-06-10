<?php
$obj = new stdClass();
$obj->user_name        = 'Henryk';
$obj->user_surname     = 'Sienkiewicz';
$obj->user_description = 'W lutym 1876 r. wraz z Heleną Modrzejewską i grupą znajomych wybrał się w podróż do USA. W owym czasie nie było to czymś powszednim.';
$obj->user_site_url    = 'https://pl.wikipedia.org/wiki/Henryk_Sienkiewicz';
$obj->user_avatar_url  = 'http://rkserv.hekko.pl/findgroup-form/images/avatar.jpg';
echo json_encode($obj);