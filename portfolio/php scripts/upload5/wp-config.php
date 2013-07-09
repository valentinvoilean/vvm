<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'studyb_trialfacts_us');

/** MySQL database username */
define('DB_USER', 'studyb_tfwpusu');

/** MySQL database password */
define('DB_PASSWORD', 'X1UmyCS8');

/** MySQL hostname */
define('DB_HOST', 'mysql8.quadrahosting.com.au');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '~/HSl$>Q[;8!JF%QqrtAaC2*g:`9VQZKi?_`Rru/FCCIS/MyU#e.FrWH5K_VK]1:');
define('SECURE_AUTH_KEY',  'VvXe5A`@jnF}Y$JRqwVcr4$@|Wz6f%l>gNPQ&wVr!>_(L=NC)dP3? bqG I-7S3>');
define('LOGGED_IN_KEY',    '+$>nI}#<Y&~S058Kp-On;4`jCS~1C,zzFK5:JupgKPcu4kd5I4>CW/Lu73fD($`R');
define('NONCE_KEY',        'G`)IdMXDI}%K9qY-1J4WqO@JPYF(ME7t}t)i0[.`=<*qX?b5@1_{M Sf3>p;~oQO');
define('AUTH_SALT',        '>6HI_xVej(nd8Z6&K+L,A`lvfX*dso@9-;?[&vSR`mj{PW7WHDjZM=Wf%B(Z}T/R');
define('SECURE_AUTH_SALT', '__q/bi_Itc-K-H<cFOSi(jo;F{?KF7w]hC5{x[odlXw)h)o;*B[jF>=5+,{}S1LE');
define('LOGGED_IN_SALT',   'mD[juH/]BhAc{=:tQ*/m!2d&xO=)+O6lHL@B6YL92{^kKi*,jS+r.@7?H:L)vyA)');
define('NONCE_SALT',       'oVmsfY#-gxi+`SYj`:_E.9Ayc<(29@9C@<Cnod@A^gP:,#&FdzWPkNH/>Ey,(sl#');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
