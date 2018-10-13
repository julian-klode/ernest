<?php

require_once '../../mastodon.feed/config.php';

$redis = new Redis();
$redis->pconnect($config['redis-url']);

$avatar_url = $_GET["url"];
$expected_host = "files.mastodon.social";
$expected_path = "/accounts/avatars";
$expected_type = ".jpg";
$avatar_host = parse_url($avatar_url, PHP_URL_HOST);
$avatar_path = parse_url($avatar_url, PHP_URL_PATH);

if ($avatar_host  != "files.mastodon.social" || strncmp($avatar_path, $expected_path, strlen($expected_path)) != 0 || strpos($avatar_path, $expected_type) !=  strlen($avatar_path) - strlen($expected_type)) {
	http_response_code(403);
	return;
}

$avatar = $redis->get("avatars/data/$avatar_path");
$avatar_content_type = null;


if ($avatar) {
	header('X-Location: redis');
} else {
	header('X-Location: url');
	$avatar = file_get_contents($avatar_url);
	if ($avatar) {
		$redis->set("avatars/data/$avatar_path", $avatar);
		$redis->expire("avatars/data/$avatar_path", 28 * 24 * 60 * 60);
	}
}

$time = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];
header("X-Debugging-Time-Used: $time");

if ($avatar) {
	$max_age = 28 * 24 * 60 * 60;
	$mod_gmt = gmdate("D, d M Y H:i:s \G\M\T", $_SERVER["REQUEST_TIME_FLOAT"]);
	$exp_gmt = gmdate("D, d M Y H:i:s \G\M\T", $_SERVER["REQUEST_TIME_FLOAT"] + $max_age);
	header("Expires: " . $exp_gmt);
	header("Last-Modified: " . $mod_gmt);
	header("Cache-Control: public, max-age=" . $max_age);
	header('Content-Type: image/jpeg');
	header('Content-Length: '. strlen($avatar));
	echo $avatar;
} else {
	http_response_code(404);
}

?>


