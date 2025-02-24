import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Login from './components/Login.js';

function App() {
  return (
    <div className="App">
      <Header title='UPOFITNESS' options="a"/>
      <Login />
      <Footer />
    </div>
  );
}

export default App;
