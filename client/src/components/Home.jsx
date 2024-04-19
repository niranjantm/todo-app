
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
    </div>
  )
}

export default Home