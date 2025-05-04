import { create } from 'zustand';

interface UserData {
  cpf: string;
  nome: string;
  nascimento: string;
  renda?: string;
  endereco: {
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
  };
}

interface UserStore {
  userData: UserData;
  setUserData: (data: Partial<UserData>) => void;
  setUserEndereco: (endereco: Partial<UserData['endereco']>) => void;
  reset: () => void;
}

const DEFAULT_USER_DATA: UserData = {
  cpf: '',
  nome: '',
  nascimento: '',
  endereco: {
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: ''
  }
};

// Cria uma store para armazenar informações do usuário
export const useUserStore = create<UserStore>((set) => ({
  userData: DEFAULT_USER_DATA,
  
  setUserData: (data) => set((state) => ({
    userData: { ...state.userData, ...data }
  })),
  
  setUserEndereco: (endereco) => set((state) => ({
    userData: {
      ...state.userData,
      endereco: {
        ...state.userData.endereco,
        ...endereco
      }
    }
  })),
  
  reset: () => set({ userData: DEFAULT_USER_DATA })
}));