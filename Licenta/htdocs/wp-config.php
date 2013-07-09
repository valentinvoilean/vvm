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
define('DB_NAME', 'licenta');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

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
define('AUTH_KEY',         'vg4aB5&!rXI-p6W$`t=_2`AO_+*8/b:O_*nWxMJ!!rpB|a0U=L^@r}ND $f!LT1.');
define('SECURE_AUTH_KEY',  '.h]K@;c64 04%vp[7ZJNLvgz^|+&E@byzJoE@ cqQ|8]>4F,{pQ|`&rz7+o!FE;S');
define('LOGGED_IN_KEY',    '1gsN&y42Ye3W8)nk99Prfz|u]nGt9].OzDF^:u-wqU2T/GZ[/M]v9FFR95cy:FRn');
define('NONCE_KEY',        'O!Rl)[-hKHMLa|?+@w]V+}8-G%laeB C!q!.6Ou7;*s^ tV-g|X^cjEB(E3Meov|');
define('AUTH_SALT',        '<|:Y^lR;buZxic%Dtzpn&2@*4W[pB(p9D3_I|W/HM&3Qvw?L=6Fj:wDv|.f?ablL');
define('SECURE_AUTH_SALT', 'DKqAIn[6{Gyt~:EIl1D%5W^6pE?qIm4+>CX%;23.|!$cJg~2vGZrQ 1Z0(6W&gJ+');
define('LOGGED_IN_SALT',   'Av@^ARz<$+x[q~Qm^Ov^}x:`]L]IdQ1ni%vga<NRCox(/kR+YmS9-y/:E]SF{9nI');
define('NONCE_SALT',       'P$51|0RXTq#Nv?120]J LL,5veJ1-X<&gZ*$+&wrjN9; ot2>cdZbk3yZJ#KPN]j');

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
