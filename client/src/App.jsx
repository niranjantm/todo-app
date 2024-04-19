import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Todos from "./pages/Todos"
import Home from "./components/Home"

function App() {
  const router = createBrowserRouter([
    {path:"/",element:<Home></Home>,children:[
      {index:true,element:<Todos></Todos>},
    ]}
  ])

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
