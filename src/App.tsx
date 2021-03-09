import { Cart, Details, Header, Market } from 'components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'app.scss';

const App = () => (
  <div className="App">
    <Router>
      <Header />
      <Switch>
        <Route path="/cart" component={Cart} />
        <Route path="/details/:id" component={Details} />
        <Route component={Market} />
      </Switch>
    </Router>
  </div>
);

export default App;
