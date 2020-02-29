const purgecss = require('@fullhuman/postcss-purgecss')({

    // Specify the paths to all of the template files in your project 
    content: [
      './**/*.html',
    ],
  
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  })
  
  // Variables
  let postcss = require('gulp-postcss');
  let autoprefixer = require('autoprefixer');
  let tailwindcss = require('tailwindcss');
  let postcss_scss = require('postcss-scss');
  let gulp = require('gulp');
  let sourcemaps = require('gulp-sourcemaps');
  
  // Sass Plugins
  let sass = require('gulp-sass');
  let uglifycss = require('gulp-uglifycss');
  
  let processors = [tailwindcss, autoprefixer, purgecss];
  
  gulp.task(
    'sass',
    gulp.series(function() {
      return gulp
        .src('./src/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss(processors, { syntax: postcss_scss }))
        .pipe(sourcemaps.write('./dist/maps'))
        .pipe(uglifycss())
        .pipe(gulp.dest('./'));
    })
  );
  
  gulp.task(
    'watch',
    gulp.series(function() {
      gulp.watch('./**/*.scss', gulp.series('sass'));
      gulp.watch('./**/*.html', gulp.series('sass'));
    })
  );
  
  gulp.task('default', gulp.series('sass', 'watch'));