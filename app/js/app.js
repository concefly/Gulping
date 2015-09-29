import React from 'react';
import Router from 'react-router';

// let Route = Router.Route;;
// let RouteHandler = Router.RouteHandler;
let {Route , RouteHandler , Link} = Router;

class App extends React.Component{
    render(){
        return(
                <div>
                    <h1>App</h1>
                    <nav>
                        <li><Link to='about'>about</Link></li>
                        <li><Link to='blogs'>blogs</Link></li>
                    </nav>
                    <RouteHandler/>
                </div>
              )
    }
}

class About extends React.Component{
    render(){
        return(
                <div>
                    About
                </div>
              )
    }
}

class Blogs extends React.Component{
    render(){
        return(
                <div>
                    Blogs
                </div>
              )
    }
}
let routes = (
        <Route handler={App}>
            <Route name='about' path='about' handler={About}/>
            <Route name='blogs' path='blogs' handler={Blogs}/>
        </Route>
);

Router.run(routes , Router.HashLocation, (Root) => {
    React.render(<Root /> ,document.body);
})
