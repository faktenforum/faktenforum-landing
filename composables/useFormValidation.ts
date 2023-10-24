import { i18n } from "virtual:vuetify-date-configuration";

export default function () {
  const { $i18n } = useNuxtApp();

  return {
    isValidEmail(v: string) {
      return (
        !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || $i18n.t("formRules.email")
      );
    },
    isValidUrl(value: string) {
      if (value.length === 0) return true;
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      if (!!pattern.test(value)) {
        return true;
      } else {
        return $i18n.t("formRules.url");
      }
    },
    isValidPassword(password: string) {
      if (password.length < 8) {
        return $i18n.t("formRules.password.length");
      }
      // Check if the password includes at least one uppercase letter
      if (!/[A-Z]/.test(password)) {
        return $i18n.t("formRules.password.upperCase");
      }

      // Check if the password includes at least one lowercase letter
      if (!/[a-z]/.test(password)) {
        return $i18n.t("formRules.password.lowerCase");
      }

      // Check if the password includes at least one number
      if (!/[0-9]/.test(password)) {
        return $i18n.t("formRules.password.number");
      }

      // Check if the password includes at least one special character
      if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
        return $i18n.t("formRules.password.specialCharacter") + " (!@#$%^&*()_+{}[]:;<>,.?~-)";
      }
      return true;
    }
  };
}
