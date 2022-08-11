import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.client';
import { NODE_ENV } from '../config/config'

const compile = (app)=>{
    if(NODE_ENV == 'development'){
        const compiler = webpack(webpackConfig);
        const middleware = webpackMiddleware(compiler,{
            publicPath: webpackConfig.output.publicPath,
            serverSideRender:true
        })
        app.use(middleware);
        app.use(webpackHotMiddleware(compiler))
    }
}
export default{
    compile
}