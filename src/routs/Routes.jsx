import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import ListedBooks from "../pages/Books/Books";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import BookDetails from "../pages/BookDetails/BookDetails";
import PagesToRead from "../pages/PagesToRead/PagesToRead";
import Dashboard from "../pages/Dashboard/Dashboard";
import Authors from "../pages/Authors/Authors";
import AuthorDetails from "../pages/AuthorDetails/AuthorDetails";

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
                element: <ListedBooks />
            },
            {
                path: "/bookDetails/:bookId",
                Component: BookDetails,
                loader: () => fetch("/booksData.json").then(res => res.json())

            },
            {
                path: "/page-to-read",
                element: <PagesToRead />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/authors",
                element: <Authors />,
                loader: () => fetch("/booksData.json").then(res => res.json())
            },
            {
                path: "/author/:authorName",
                element: <AuthorDetails />,
                loader: () => fetch("/booksData.json").then(res => res.json())
            }

    ],
    errorElement: <ErrorPage />


  }
])