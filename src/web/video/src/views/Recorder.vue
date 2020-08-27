<template>
  <div>User: {{currentUser}}</div>
</template>

<script>
import { mapGetters } from "vuex";
import * as ActionTypes from "@/store/action.types";

export default {
  computed: {
    ...mapGetters(["currentUser", "isSessionActive"]),
  },
  methods: {
    handleError(err) {
      if (error) {
        alert(error.message);
      }
    },
  },
  mounted() {
    if (!this.isSessionActive) {
      this.$store.dispatch(ActionTypes.START_SESSION);
    }
  },
};
</script>