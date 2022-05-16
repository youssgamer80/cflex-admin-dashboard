var rulePrefix = '.antd-ns'

var sourcePath = './node_modules/ant-design-vue/dist/antd.css'
var targetFolder = './out/'
var targetFile = 'antd-namespaced.min.css'

/****/

var gulp = require('gulp');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');
var prefixwrap = require('postcss-prefixwrap');

gulp.task('build-namespaced-css', function() {
  return (
    gulp
      .src(sourcePath)
      .pipe(
        postcss([
          prefixwrap(rulePrefix),
          // Minify after prefixwrap
          cssnano({ preset: 'default' }),
        ])
      )
      .pipe(rename(targetFile))
      .pipe(gulp.dest(targetFolder))
  );
});