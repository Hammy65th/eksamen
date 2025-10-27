import React from 'react'
import { Link } from 'react-router-dom';

const home = () => {
  return (
    <>
    <header className="bg-[rgb(150,186,210)] shadow">
        <nav className="container mx-auto flex justify-around items-center p-8">
          <ul className="flex space-x-6">
            <li>
              <Link to="#" className="hover:text-blue-600">
                Forside
              </Link>
            </li>
            <li>
              <Link to="/produkter" className="hover:text-blue-600">
                Produkter
              </Link>
            </li>
          </ul>

          <h1 className="text-2xl font-bold text-center">
            <a href="#">Bageriet</a>
          </h1>

          <ul className="flex space-x-6">
            <li>
              <Link to="/kontakt" className="hover:text-blue-600">
                Kontakt
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-blue-600">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      

      <section className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Vi Skaber lækkert! brød</h1>
        <p className="mb-8 text-gray-700 mr-70 ml-75 text-center">
          Der er mange tilgængelige udgaver af Lorem Ipsum, men de fleste
          udgaver har gennemgået forandringer, når noget har tilføjet humor
          eller tilfældige ord, som på ingen måde ser ægte ud.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
  
    <div
      
      className="bg-white flex flex-col items-center p-4"
    >
      
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2"></h2>
        <p className="text-gray-600"></p>
      </div>
    </div>

</div>

      </section>
    </>
  )
}

export default home