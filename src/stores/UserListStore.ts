import { defineStore } from "pinia";
import type { IUserData } from "@/domain/IUserData.model";
import { UserList } from "@/domain/UserList.model"

export const userUserStore = defineStore('users', {
  state: () => ({
    userList: new UserList([]),
    user: null as IUserData | null
  }),
  getters: {
    getAllUsers: (state) => {
      return state.userList.userList 
    },
    getUserById: (state) => {
      return (userId: number) => state.userList.userList.find((user) => user.id === userId) as IUserData
    },
    getAllUserIds: (state) => {
      const userIdList = state.userList.userList.map((user) => user.id);
      return userIdList;
    }
  },
  actions: {
    deletSelectedeUser(userId: number) {
      const index = this.userList.userList.findIndex((value) => value.id === userId);
      if (index !== -1) {
        this.userList.userList.splice(index, 1);
      }
    },
    updateUser(user: IUserData){
      const index = this.userList.userList.findIndex(e => e.id === user.id);

      if (index !== -1) {
        this.userList.userList[index] = user;
      } else {
        this.userList.userList.push(user);
      } 
    }
  }
})

