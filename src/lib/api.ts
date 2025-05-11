import {
  ParkingOption,
  ParkingOptionPaginated,
  ParkingSessionPaginated,
  ParkingTaskPaginated,
  PayHistoryPaginated,
  Setting,
  SettingPaginated,
  SubscriptionPaginated,
  Tariff,
  TariffPaginated,
  UserPaginated,
  VehiclePaginated
} from './types';

export async function getUsers(page = 1, size = 50): Promise<UserPaginated> {
  const url = new URL('https://api.projectdevdnkchain.ru/admin/users/');
  url.searchParams.set('page', String(page));
  url.searchParams.set('size', String(size));

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      auth: 'abcd-1234',
      login: 'admin'
    }
  });

  if (!res.ok) throw new Error('Failed to load users');
  return (await res.json()) as UserPaginated;
}

export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(
    `https://api.projectdevdnkchain.ru/admin/users/${id}`,
    {
      method: 'DELETE',
      headers: { auth: 'abcd-1234', login: 'admin' }
    }
  );
  if (!res.ok) throw new Error('Failed to delete user');
}

export async function createTariff(
  body: Omit<Tariff, 'id' | 'create_dttm' | 'update_dttm'>
): Promise<Tariff> {
  const res = await fetch('https://api.projectdevdnkchain.ru/admin/tariffs/', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      auth: 'abcd-1234',
      login: 'admin'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Failed to create tariff');
  return (await res.json()) as Tariff;
}

export async function getTariffs(
  page = 1,
  size = 50
): Promise<TariffPaginated> {
  const url = new URL('https://api.projectdevdnkchain.ru/admin/tariffs/');
  url.searchParams.set('page', String(page));
  url.searchParams.set('size', String(size));

  const res = await fetch(url.toString(), {
    headers: { auth: 'abcd-1234', login: 'admin' }
  });
  if (!res.ok) throw new Error('Failed to load tariffs');
  return (await res.json()) as TariffPaginated;
}

export async function updateTariff(
  id: number,
  body: Omit<Tariff, 'id' | 'create_dttm' | 'update_dttm'>
) {
  const res = await fetch(
    `https://api.projectdevdnkchain.ru/admin/tariffs/${id}`,
    {
      method: 'PUT',
      headers: {
        auth: 'abcd-1234',
        login: 'admin',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  );
  if (!res.ok) throw new Error('Failed to update tariff');
  return (await res.json()) as Tariff;
}

export async function deleteTariff(id: number) {
  const res = await fetch(
    `https://api.projectdevdnkchain.ru/admin/tariffs/${id}`,
    {
      method: 'DELETE',
      headers: { auth: 'abcd-1234', login: 'admin' }
    }
  );
  if (!res.ok) throw new Error('Failed to delete tariff');
}

export async function getSubscriptions(
  page = 1,
  size = 50
): Promise<SubscriptionPaginated> {
  const url = new URL('https://api.projectdevdnkchain.ru/admin/subscription/');
  url.searchParams.set('page', String(page));
  url.searchParams.set('size', String(size));

  const res = await fetch(url.toString(), {
    headers: { auth: 'abcd-1234', login: 'admin' }
  });
  if (!res.ok) throw new Error('Failed to load subscriptions');
  return (await res.json()) as SubscriptionPaginated;
}

export async function getSettings(
  page = 1,
  size = 50
): Promise<SettingPaginated> {
  const url = new URL('https://api.projectdevdnkchain.ru/admin/settings');
  url.searchParams.set('page', String(page));
  url.searchParams.set('size', String(size));
  const res = await fetch(url.toString(), {
    headers: {
      auth: 'abcd-1234',
      login: 'admin',
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to load settings');
  return (await res.json()) as SettingPaginated;
}

export async function updateSetting(
  id: number,
  body: Omit<Setting, 'id' | 'create_dttm' | 'update_dttm'>
): Promise<Setting> {
  const res = await fetch(
    `https://api.projectdevdnkchain.ru/admin/settings/${id}`,
    {
      method: 'PUT',
      headers: {
        auth: 'abcd-1234',
        login: 'admin',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  );
  if (!res.ok) throw new Error('Failed to update setting');
  return (await res.json()) as Setting;
}

export async function deleteSetting(id: number) {
  const res = await fetch(
    `https://api.projectdevdnkchain.ru/admin/settings/${id}`,
    {
      method: 'DELETE',
      headers: {
        auth: 'abcd-1234',
        login: 'admin',
        'Content-Type': 'application/json'
      }
    }
  );
  if (!res.ok) throw new Error('Failed to delete setting');
}

export async function createSetting(
  body: Omit<Setting, 'id' | 'create_dttm' | 'update_dttm'>
): Promise<Setting> {
  const res = await fetch('https://api.projectdevdnkchain.ru/admin/settings/', {
    method: 'POST',
    headers: {
      auth: 'abcd-1234',
      login: 'admin',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Failed to create setting');
  return (await res.json()) as Setting;
}

export async function getPayHistory(
  page = 1,
  size = 50
): Promise<PayHistoryPaginated> {
  const url = new URL('https://api.projectdevdnkchain.ru/admin/payhistory/');
  url.searchParams.set('page', String(page));
  url.searchParams.set('size', String(size));

  const res = await fetch(url.toString(), {
    headers: { auth: 'abcd-1234', login: 'admin' }
  });
  if (!res.ok) throw new Error('Failed to load pay history');
  return (await res.json()) as PayHistoryPaginated;
}

export async function getVehicles(
  page = 1,
  size = 50
): Promise<VehiclePaginated> {
  const url = new URL('https://api.projectdevdnkchain.ru/admin/vehicles/');
  url.searchParams.set('page', String(page));
  url.searchParams.set('size', String(size));

  const res = await fetch(url.toString(), {
    headers: { auth: 'abcd-1234', login: 'admin' }
  });

  if (!res.ok) throw new Error('Failed to load vehicles');
  return (await res.json()) as VehiclePaginated;
}

export async function getParkingOptions(
  page = 1,
  size = 50
): Promise<ParkingOptionPaginated> {
  const url = new URL(
    'https://api.projectdevdnkchain.ru/admin/parking/options'
  );
  url.searchParams.set('page', String(page));
  url.searchParams.set('size', String(size));

  const res = await fetch(url.toString(), {
    headers: {
      auth: 'abcd-1234',
      login: 'admin',
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to load options');
  return (await res.json()) as ParkingOptionPaginated;
}

export async function createParkingOption(
  body: Omit<ParkingOption, 'id' | 'create_dttm' | 'update_dttm'>
): Promise<ParkingOption> {
  const res = await fetch(
    'https://api.projectdevdnkchain.ru/admin/parking/options',
    {
      method: 'POST',
      headers: {
        auth: 'abcd-1234',
        login: 'admin',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  );
  if (!res.ok) throw new Error('Failed to create option');
  return (await res.json()) as ParkingOption;
}

export async function updateParkingOption(
  id: number,
  body: Omit<ParkingOption, 'id' | 'create_dttm' | 'update_dttm'>
): Promise<ParkingOption> {
  const res = await fetch(
    `https://api.projectdevdnkchain.ru/admin/parking/options/${id}`,
    {
      method: 'PUT',
      headers: {
        auth: 'abcd-1234',
        login: 'admin',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  );
  if (!res.ok) throw new Error('Failed to update option');
  return (await res.json()) as ParkingOption;
}

export async function deleteParkingOption(id: number) {
  const res = await fetch(
    `https://api.projectdevdnkchain.ru/admin/parking/options/${id}`,
    {
      method: 'DELETE',
      headers: {
        auth: 'abcd-1234',
        login: 'admin',
        'Content-Type': 'application/json'
      }
    }
  );
  if (!res.ok) throw new Error('Failed to delete option');
}

export async function getParkingSessions(
  page = 1,
  size = 50
): Promise<ParkingSessionPaginated> {
  const url = new URL(
    'https://api.projectdevdnkchain.ru/admin/parking/sessions'
  );
  url.searchParams.set('page', String(page));
  url.searchParams.set('size', String(size));
  const res = await fetch(url.toString(), {
    headers: {
      auth: 'abcd-1234',
      login: 'admin',
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to load sessions');
  return (await res.json()) as ParkingSessionPaginated;
}

export async function getParkingTasks(
  page = 1,
  size = 50
): Promise<ParkingTaskPaginated> {
  const url = new URL('https://api.projectdevdnkchain.ru/admin/parking/tasks');
  url.searchParams.set('page', String(page));
  url.searchParams.set('size', String(size));
  const res = await fetch(url.toString(), {
    headers: {
      auth: 'abcd-1234',
      login: 'admin',
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to load tasks');
  return (await res.json()) as ParkingTaskPaginated;
}
