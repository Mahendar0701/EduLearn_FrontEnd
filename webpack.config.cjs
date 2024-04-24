// /* eslint-disable no-undef */
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// // const path = require('path');
// import path from "path";
// // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
// // const HtmlWebpackPlugin = require('html-webpack-plugin');

// import HtmlWebpackPlugin from "html-webpack-plugin";

// // eslint-disable-next-line no-undef
// module.exports = {
//   mode: "development",

//   // entry: './src/main.tsx',
//   entry: path.resolve(__dirname, "./src/main.tsx"),

//   resolve: {
//     extensions: [".tsx", ".ts", ".js"],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx|ts|tsx)$/,
//         exclude: /node_modules/,
//         use: {
//           // loader: "ts-loader",
//           loader: "babel-loader",
//         },
//       },
//       {
//         test: /\.css$/i,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
//         type: "asset/inline",
//       },
//       {
//         test: /\.(png|jpe?g|gif)$/i,
//         type: "asset/resource",
//         // use: [
//         //     {
//         //         loader: 'file-loader',
//         //         options: {
//         //             name: '[name].[ext]',
//         //             outputPath: 'images', // output directory for images
//         //         },
//         //     },
//         // ],
//       },
//     ],
//   },
//   output: {
//     path: path.resolve(__dirname, "./build-webpack"),
//     filename: "bundle.js",
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       // template: './index.html',
//       template: path.resolve(__dirname, "./index.html"),
//     }),
//   ],
//   stats: "error-only",
//   //   optimization: {
//   //     splitChunks: {
//   //       chunks: "all",
//   //     },
//   //   },
// };


/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// import path from "path";
// import HtmlWebpackPlugin from "html-webpack-plugin";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/main.tsx"),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
        use: ["file-loader"],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
    }),
  ],
  stats: "errors-only",
};

