import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import Books from "../pages/AllBooks/AllBooks";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import BookDetails from "../pages/BookDetails/BookDetails";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        // also we can use compoinent  Component:HomePage
      },
      {
        path: "/books",
        element: <Books />
      },
      {
        path: "/bookDetails/:bookId",
        Component: BookDetails,
        loader:()=>fetch("/booksData.json")

      }

    ],
    errorElement: <ErrorPage />


  }
])