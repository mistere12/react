import Header from './Header'
import  Menu  from './Menu'
import { Footer } from './Footer'
import { CartProvider } from "./cart/CartProvider"

function App() {
  
  return (
    <CartProvider>
      <Header/>

      <main>
        <Menu/>
        <p id="location">📍Bole, Addis Ababa</p>
      </main>
      
     <Footer/>
    </CartProvider>
  );
}

export default App;
