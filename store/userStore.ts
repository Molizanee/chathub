import { create } from 'zustand'

interface UserState {
  user: Object | null
  setUser: (user: Object | null) => void
}

const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: (user: Object | null) => set({ user }),
}))

export default useUserStore
