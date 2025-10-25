import React, { lazy, Suspense, type JSX } from 'react'
import { useRoutes, type RouteObject } from 'react-router-dom'
import { ErrorBoundary } from '@/pages/ErrorBoundary'
import { Loader } from '@/components/loader'

const RootLayout = lazy(() => import('@/layout/RootLayout'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const MovieDetail = lazy(() => import('@/pages/MovieDetail'))
const FeelGood = lazy(() => import('@/pages/FeelGood'))
const MindBenders = lazy(() => import('@/pages/MindBenders'))
const ActionFix = lazy(() => import('@/pages/ActionFix'))
const Watchlist = lazy(() => import('@/pages/Watchlist'))

const suspense = (node: JSX.Element, fallback?: JSX.Element) => (
    <Suspense fallback={fallback ?? <Loader />}>
        {node}
    </Suspense>
)
const withBoundary = (node: JSX.Element, fallback?: JSX.Element) => (
    <ErrorBoundary fallback={fallback}>{suspense(node, fallback)}</ErrorBoundary>
)

export default function AppRoutes() {
    const routes: RouteObject[] = [
        {
            // outer layout applied to everything inside
            element: withBoundary(<RootLayout />),
            children: [
                { index: true, element: withBoundary(<Dashboard />) },
                { path: "/:id", element: <MovieDetail /> },
                { path: '/feel-good', element: withBoundary(<FeelGood />) },
                { path: '/action-fix', element: withBoundary(<ActionFix />) },
                { path: '/mind-benders', element: withBoundary(<MindBenders />) },
                { path: '/watchlist', element: withBoundary(<Watchlist />) },
            ],
        },
        { path: '*', element: withBoundary(<NotFound />) },
    ]
    return <React.Fragment>{useRoutes(routes)}</React.Fragment>;
}