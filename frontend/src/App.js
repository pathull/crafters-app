import './App.css';

function App() {
  const goToLogin = async () => {
    console.log('Dude you click on it');
    // await fetch('http://localhost:8080/login');
    const data = await fetch('http://localhost:8080/');
    const hello = await data.json();
    console.log(hello);
  };

  return (
    <div className="App">
      <h1>Welcome to Knitting Social Media App</h1>
      <button onClick={goToLogin} type="button">
        Login
      </button>
      <button type="button">Logout</button>
    </div>
  );
}

export default App;
