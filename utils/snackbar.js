import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
/**
 * 
 * @param {String} text 
 * @param {String} type  success / warning / info / error / default
 */
export function snackbar(text, type) {
  toast[type](text, {
    autoClose: 1500,
    position: "bottom-right",
  });
}
