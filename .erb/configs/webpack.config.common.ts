export default { mode: 'development', resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] }, module: { rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }] } };
