import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Landing from './Landing';
import App from './App';

export default function MenuRouting() {
    return (
        <Router>
        <Switch>
            <Route exact path="/">
                <Landing />
            </Route>
            <Route path="/viewer">
                <App />
            </Route>
        </Switch>
        </Router>
    )
}