// plugins/vuetify.js
import { createVuetify } from "vuetify";
import { VBtn, VCheckbox, VForm, VIcon, VLayout, VList, VListItem, VNavigationDrawer, VProgressCircular, VTextField } from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      VForm,
      VTextField,
      VCheckbox,
      VBtn,
      VIcon,
      VProgressCircular,
      VNavigationDrawer,
      VLayout,
      VList,
      VListItem
    },
    directives,
  });

  nuxtApp.vueApp.use(vuetify);
});
