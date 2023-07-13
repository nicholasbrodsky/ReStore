const products = [
  {name: 'one', price: 50.00},
  {name: 'two', price: 100.00},
]

function App() {
  return (
    <div>
      <h1>Re-Store</h1>
      <ul>
        {products.map(product => {
          return (
            <li>{product.name}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
