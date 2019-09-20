const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const postcssPresetEnv = require("postcss-preset-env");
const merge = require("webpack-merge");
const CheckerPlugin = require("awesome-typescript-loader").CheckerPlugin;
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const getClientEnvironmentVariables = env => {
	var envData = require(`./appsettings.${env}.json`).ReactSettings;

	var result = {};

	for (let key in envData) {
		result[key] = JSON.stringify(envData[key]);
	} // for

	return result;
}; // getClientEnvironmentVariables(env)

const envVars = getClientEnvironmentVariables(
	process.env.ASPNETCORE_ENVIRONMENT
);
const isProduction = envVars.Environment === '"production"';
const isHotReloading =
	envVars.HotReloading == '"false"' || envVars.HotReloading === "false"
		? false
		: true;

module.exports = (env = {}) => {
	const shared = () => ({
		mode: isProduction ? "production" : "development",
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx"]
		},
		output: {
			filename: "[name].js",
			publicPath: "/dist/"
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: "awesome-typescript-loader",
					exclude: "/node_modules/"
				},
				{
					test: /\.(png|jpg|jpeg|gif|svg)$/,
					use: [
						{
							loader: "file-loader",
							options: {}
						}
					]
				}
			]
		},
		plugins: [
			new CheckerPlugin(),
			new webpack.DefinePlugin({
				"process.env": envVars
			})
		].concat(
			isProduction
				? [
						new CleanWebpackPlugin(["dist"], {
							root: path.join(__dirname, "./wwwroot"),
							verbose: true,
							dry: false
						})
				  ]
				: []
		),

		optimization: {
			splitChunks: {
				chunks: "all"
			}
		}
	});

	const client = merge(shared(), {
		entry: {
			bundle: "./Client/index.tsx"
		},
		output: { path: path.join(__dirname, "./wwwroot/dist") },
		plugins: [
			new MiniCssExtractPlugin({
				filename: "styles.css"
			})
		].concat(
			!isProduction
				? [
						new webpack.SourceMapDevToolPlugin({
							filename: "[file].map",
							moduleFilenameTemplate: path.relative(
								"./wwwroot/dist",
								"[resourcePath]"
							)
						})
				  ]
				: []
		),
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						isHotReloading
							? {
									loader: "style-loader",
									options: {
										sourceMap: !isProduction
									}
							  }
							: MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								sourceMap: !isProduction
							}
						},
						{
							loader: "postcss-loader",
							options: {
								sourceMap: !isProduction,
								ident: "postcss",
								plugins: () => [
									postcssPresetEnv({
										browsers: [
											// Docs on how to change inclusions: https://github.com/browserslist/browserslist#full-list
											"last 3 Chrome versions",
											"last 3 Firefox versions",
											"last 3 Edge versions",
											"last 3 Safari versions",
											"iOS 10-12",
											"Android 6-9"
										]
									}),
									require("cssnano")()
								]
							}
						},
						{
							loader: "sass-loader",
							options: {
								sourceMap: !isProduction
							}
						}
					]
				}
			]
		}
	});

	if (!isProduction) {
		client.devtool = "eval-source-map";
	}

	return client;
};
