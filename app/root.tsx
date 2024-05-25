import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";

import styles from './styles/main.css';
import MainNavigation from "./components/MainNavigation";
import { Link, useCatch } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const links = () => {
  return [{
    rel: 'stylesheet',
    href: styles,
  }]
}

// if any unexpected error happens, this will be rendered
export const ErrorBoundary = ({ error }: { error: any }) => {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
      <header>
        <MainNavigation />
      </header>
      <main className="error">
        <h1>Application Error</h1>
        <pre>{error.message}</pre>
        <p>Back to <Link to="/">home</Link></p>
      </main>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
  )
}

// this catches an error like accessing non existing route
export const CatchBoundary = () => {
  const caughtResponse = useCatch();
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
      <header>
        <MainNavigation />
      </header>
      <main className="error">
        <h1>Application Error</h1>
        <pre>{caughtResponse.data?.message || 'Something went wrong'}</pre>
        <p>Back to <Link to="/">home</Link></p>
      </main>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
  )
}