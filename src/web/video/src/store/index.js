import { createStore } from 'vuex';

import * as ActionTypes from './action.types';
import * as MutationTypes from './mutation.types';

import userService from '@/services/userService';

export default createStore({
  state: {
    user: null,
    apiKey: null,
    sessionId: null,
    token: null
  },
  getters: {
    isAuthenticated: (currentState) => {
      return currentState.user !== null;
    },
    currentUser: (currentState) => {
      return currentState.user;
    },
    isSessionActive: (currentState) => {
      return currentState.sessionId !== null;
    }
  },
  mutations: {
    [MutationTypes.USER_SAVE](state, user) {
      state.user = user;
    },
    [MutationTypes.USER_CLEAR](state) {
      state.user = null;
    },
    [MutationTypes.SESSION_SAVE](state, { apiKey, token, sessionId }) {
      state.apiKey = apiKey;
      state.sessionId = sessionId;
      state.token = token;
    },
    [MutationTypes.SESSION_CLEAR](state) {
      state.apiKey = null;
      state.sessionId = null;
      state.token = null;
    }
  },
  actions: {
    async [ActionTypes.USER_LOGIN](context, { name }) {
      const response = await userService.getUser(name);
      context.commit(MutationTypes.USER_SAVE, response.data);
    },
    [ActionTypes.USER_LOGOUT](context) {
      context.commit(MutationTypes.USER_CLEAR);
    },
    async [ActionTypes.START_SESSION](context, payload) {
      context.commit(MutationTypes.SESSION_SAVE, payload);
    },
    [ActionTypes.END_SESSION](context) {
      context.commit(MutationTypes.SESSION_CLEAR);
    }
  },
  modules: {
  }
})
