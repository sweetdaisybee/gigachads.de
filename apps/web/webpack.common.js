import HtmlWebpackPlugin from "html-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import tailwind from "@tailwindcss/postcss";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

/**
 * @type {import("webpack").Configuration}
 */
const webpackCommonConfig = {
  target: "web",
  experiments: {
    outputModule: true
  },
  entry: path.join(import.meta.dirname, "src", "index.tsx"),
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json", ".css", ".wasm"],
    alias: {
      "@components/*": path.join(import.meta.dirname, "src", "components"),
      "@views/*": path.join(import.meta.dirname, "src", "views"),
      "@hooks/*": path.join(import.meta.dirname, "src", "hooks"),
      "@assets/*": path.join(import.meta.dirname, "src", "assets"),
      "@servicesV1/*": path.join(import.meta.dirname, "src", "services", "v1"),
      "@utils/*": path.join(import.meta.dirname, "src", "utils")
    },
    extensionAlias: {
      ".jsx": [".tsx", ".jsx"],
      ".js": [".ts", ".js"]
    },
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: "ts-loader",
        exclude: [/node_modules/, /.\.d\.ts$/]
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  tailwind({
                    optimize: {
                      minify: true
                    }
                  })
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp|gif)$/i,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]"
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        minify: [
          CssMinimizerPlugin.cssnanoMinify,
          CssMinimizerPlugin.cleanCssMinify
        ]
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      template: path.join(import.meta.dirname, "public", "index.html"),
      inject: "body",
      scriptLoading: "module"
    })
  ]
};

export default webpackCommonConfig;
