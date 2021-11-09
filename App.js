import Movies from './components/movie'
import Home from './components/Home';
import About from './components/About';
import Nav from './Nav';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
function App() {
  return (
      //  router provide facility of routing in our app
    <Router>   
      <Nav />
      {/* when we give path to our component so when it found a path in begining so it 
      shows that component data and break imidiate but in it there is a problem
      that for e.g., in case of home component if we enter '/movies' in search engine it shows both
      component home and movies so for rectify this problem we use 'exact' so we give path '/' it will
       show only home component */}
      
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/movies' component={Movies} />
        {/* <Route path='/about' component={About}/> */}

        {/* when we use render in route it passes internal props and these props comes in callback of render 
        then we wrote our component and pass same render props and also own props */}
        <Route path='/about'render={(props)=>( 
          <About {...props} isAuth={true}/>
        )} />
      </Switch>
    </Router>
  );
}

export default App;
