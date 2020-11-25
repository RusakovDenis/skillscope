const gulp = require("gulp");
const sync = require("browser-sync");
const imagemin = require("gulp-imagemin");
const postcss = require("gulp-postcss");
const htmlmin = require("gulp-htmlmin");
const csso = require("gulp-csso");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const uglify = require("gulp-uglify");
const ghpages = require("gh-pages");

// Deploy github

const ghPages = () => {
	ghpages.publish("build", function (err) {

	});
}

exports.ghPages = ghPages;

// HTML

const html = () => {
	return gulp.src("src/*.html")
		.pipe(htmlmin({
			removeComments: true,
			collapseWhitespace: true,
		}))
		.pipe(posthtml([
			include(),
		]))
		.pipe(gulp.dest("dist"))
		.pipe(sync.stream({
			once: true
		}));
};

exports.html = html;

// Styles

const styles = () => {
	return gulp.src("src/css/**/*.css")
		.pipe(postcss([
			require("autoprefixer"),
		]))
		.pipe(csso())
		.pipe(gulp.dest("dist/css"))
		.pipe(sync.stream({
			once: true
		}));
};

exports.styles = styles;

// Scripts

const scripts = () => {
	return gulp.src("src/js/**/*.js")
		.pipe(gulp.dest("dist/js"))
		// .pipe(uglify())
		.pipe(sync.stream({
			once: true
		}));
};

exports.scripts = scripts;

// Copy

const copy = () => {
	return gulp.src([
		"src/fonts/*",
		"src/img/**/*",
	], {
		base: "src"
	})
		.pipe(gulp.dest("dist"))
		.pipe(sync.stream({
			once: true
		}));
};

exports.copy = copy;

const img = () => {
	return gulp.src("src/img/**/*.{png,jpg,svg}")
		.pipe(imagemin([
			imagemin.optipng({ optimizationLevel: 3 }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: false },
					{ removeRasterImages: true },
					{ removeUselessStrokeAndFill: false },
				]
			}),
		]))

		.pipe(gulp.dest("dist/img"));
};

exports.img = img;

// Server

const server = () => {
	sync.init({
		ui: false,
		notify: false,
		server: {
			baseDir: "dist"
		}
	});
};

exports.server = server;

// Watch

const watch = () => {
	gulp.watch("src/*.html", gulp.series(html));
	gulp.watch("src/css/*.css", gulp.series(styles));
	gulp.watch("src/js/*.js", gulp.series(scripts));
	gulp.watch([
		"src/fonts/*",
		"src/img/**/*",
	], gulp.series(copy));
};

exports.watch = watch;

// Default

exports.default = gulp.series(
	gulp.parallel(
		html,
		styles,
		scripts,
		copy,
	),
	gulp.parallel(
		watch,
		server,
	),
);