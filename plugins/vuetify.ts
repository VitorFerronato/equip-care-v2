// plugins/vuetify.js
import { createVuetify } from "vuetify";
import {
  VBreadcrumbs,
  VBtn,
  VCheckbox,
  VDataTable,
  VForm,
  VIcon,
  VLayout,
  VList,
  VListItem,
  VNavigationDrawer,
  VProgressCircular,
  VTextField,
  VCombobox,
  VCard,
  VRow,
  VCol,
  VDialog
} from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      VForm,
      VTextField,
      VCombobox,
      VCheckbox,
      VBtn,
      VIcon,
      VProgressCircular,
      VNavigationDrawer,
      VLayout,
      VList,
      VListItem,
      VDataTable,
      VCard,
      VRow,
      VCol,
      VDialog
    },
    directives,
  });

  nuxtApp.vueApp.use(vuetify);
});
