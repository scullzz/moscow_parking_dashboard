import RequireAuth from '@/pages/auth/signin/components/require_auth';
import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const UsersPage = lazy(() => import('@/pages/users'));
const TariffsPage = lazy(() => import('@/pages/tariffs'));
const SubscriptionsPage = lazy(() => import('@/pages/subscriptions'));
const SettingsPage = lazy(() => import('@/pages/settings'));
const PayHistoryPage = lazy(() => import('@/pages/pay_history'));
const VehiclePage = lazy(() => import('@/pages/vehicle'));
const ParkingOptionPage = lazy(() => import('@/pages/parking'));

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <RequireAuth>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </RequireAuth>
      ),
      children: [
        {
          path: '/users',
          element: <UsersPage />
        },
        {
          path: '/tariffs',
          element: <TariffsPage />
        },
        { path: '/subscriptions', element: <SubscriptionsPage /> },
        { path: '/settings', element: <SettingsPage /> },
        {
          path: '/pay-history',
          element: <PayHistoryPage />
        },
        {
          path: '/vehicles',
          element: <VehiclePage />
        },
        {
          path: '/parking',
          element: <ParkingOptionPage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
