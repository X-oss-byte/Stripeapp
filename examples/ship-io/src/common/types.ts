export interface LoginContext {
  isLoggedIn: boolean;
  setIsLoggedIn: (state: boolean) => void;
}

export interface ProviderProps {
  children: React.ReactNode;
}

export interface Product {
  name: string;
  image: string;
  selected: boolean;
  quantity: number;
}
