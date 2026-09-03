import { Header} from './Header'
import  Menu  from './Menu'
import { Footer } from './Footer'

function App() {
  
  return (
    <>
      <Header/>

      <main>
        <Menu/>
        <p id="location">📍Bole, Addis Ababa</p>
      </main>
      
     <Footer/>
    </>
  );
}

export default App;
