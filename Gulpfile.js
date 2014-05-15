/**
 * Gulpfile Sample
 * @author Epik38@github.com
 * @update 15/05/2014
 * @license MIT
 */

var gulp = require('gulp');

var sass = require('gulp-ruby-sass');     // Sass support   https://github.com/sindresorhus/gulp-ruby-sass
var jshint = require('gulp-jshint');      // JSHint         https://github.com/spenceralger/gulp-jshint
var concat = require('gulp-concat');      // JS Concat      https://github.com/wearefractal/gulp-concat
var uglify = require('gulp-uglify');      // JS Uglify      https://github.com/terinjokes/gulp-uglify
var rename = require('gulp-rename');      // Rename files   https://github.com/terinjokes/gulp-uglify

/**
 |--------------------------------------------------------------------------
 |  Sass Settings
 |--------------------------------------------------------------------------
 */
var sass_extension = 'scss';      // {string} Sass files extension : scss|sass
var sass_directory = 'sass';      // {string} Relative path to the Sass directory
var css_directory = 'css';        // {string} Relative path to the CSS directory

var sass_options = {
  cachLocation: '.sass-cache',    // {string}  Path to the .sass-cache folder
  compass: true,                  // {boolean} Compass support
  quiet: true,                    // {boolean} Silence warnings and status messages during compilation
  lineNumbers: false,             // {boolean} Write line numbers as comments in the generated CSS
  loadPath: '',                   // {string|array} Add a|multiple Sass import path
  noCache: false,                 // {boolean} Do not cache Sass files
  style: 'compressed'             // {string} Output style : nested|compact|compressed|expanded
};

/**
 |--------------------------------------------------------------------------
 |  Javascript Settings
 |--------------------------------------------------------------------------
 */
var js_directory = 'js';                  // {string} Relative path to the Javascript directory
var dist_directory = 'dist'               // {string} Relative path to the distribution directory
var minified_name = 'app';                // {string} Minified Javascript file name (Without .js)
var jshint_reporter = 'default';          // {string} JSHint reporter : default|jshint-stylish

/**
 |--------------------------------------------------------------------------
 |  Gulp Tasks
 |--------------------------------------------------------------------------
 */

/**
 * Compile your Sass files
 *
 */
gulp.task('sass', function() {
  return gulp.src(sass_directory + '/*.' + sass_extension)
    .pipe(sass(sass_options))
    .pipe(gulp.dest(css_directory));
});

/**
 * Watch your Javascript files
 * Helps to detect errors & problems
 */
gulp.task('lint', function() {
  return gulp.src(js_directory + '/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(jshint_reporter));
});

/**
 * Concat & Minify your Javascript files
 *
 * Take Javascript files in the Javascript directory
 * Concat & minify it
 * Then create the .min.js file in the distribution directory
 */
gulp.task('minify', function() {
  return gulp.src(js_directory + '/*.js')
    .pipe(concat(minified_name + '.js'))
    .pipe(gulp.dest(dist_directory))
    .pipe(rename(minified_name + '.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist_directory));
});

/**
 * Watch task
 * Act when you make some changes on files
 */
gulp.task('watch', function() {
  //TODO: Is that possible to write these in one line ?
  gulp.watch(js_directory + '/*.js', ['lint', 'minify']);

  gulp.watch(sass_directory + '/*.' + sass_extension, ['sass']);
  gulp.watch(sass_directory + '/*/*.' + sass_extension, ['sass']);
});

/**
 * Default task
 * Triggered each time you run 'gulp'
 */
gulp.task('default', ['lint', 'sass', 'minify', 'watch']);
