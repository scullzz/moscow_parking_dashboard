export interface User {
  id: number;
  username: string;
  first_name: string;
  create_dttm: string;
  update_dttm: string;
}

export interface UserPaginated {
  items: User[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface Tariff {
  id: number;
  name: string;
  description: string;
  days_count: number;
  price: number;
  filters_count: number;
  create_dttm: string;
  update_dttm: string;
}

export interface TariffPaginated {
  items: Tariff[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface Subscription {
  id: number;
  user_id: number;
  tariff_id: number;
  subscription_end: string;
  create_dttm: string;
  update_dttm: string;
}

export interface SubscriptionPaginated {
  items: Subscription[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface Setting {
  id: number;
  key: string;
  name: string;
  description: string;
  value: string;
  create_dttm: string;
  update_dttm: string;
}
export interface SettingPaginated {
  items: Setting[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface PayHistory {
  id: number;
  user_id: number;
  tariff_id: number;
  price: number;
  successfully: boolean;
  invoice_id: string;
  create_dttm: string;
  update_dttm: string;
}

export interface PayHistoryPaginated {
  items: PayHistory[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface Vehicle {
  id: number;
  user_id: number;
  license_plate: string;
  vehicle_type: 'car' | 'bus' | 'truck' | string;
  create_dttm: string;
  update_dttm: string;
}

export interface VehiclePaginated {
  items: Vehicle[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface ParkingOption {
  id: number;
  zone_id: string;
  name: string;
  rate: number;
  availability: boolean;
  create_dttm: string;
  update_dttm: string;
}
export interface ParkingOptionPaginated {
  items: ParkingOption[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface ParkingSession {
  id: number;
  user_id: number;
  vehicle_id: number;
  option_id: number;
  start_time: string;
  end_time: string;
  type: string;
  status: string;
  create_dttm: string;
  update_dttm: string;
}
export interface ParkingSessionPaginated {
  items: ParkingSession[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface ParkingTask {
  id: number;
  user_id: number;
  action_type: string;
  parameters: string;
  status: string;
  created_at: string;
  updated_at: string;
}
export interface ParkingTaskPaginated {
  items: ParkingTask[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
