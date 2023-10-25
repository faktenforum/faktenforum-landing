export default function () {
  const { $i18n, $dayjs } = useNuxtApp();
  const userLocalTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    toLocalDateTime(value: string) {
      const localDateTime = $dayjs(value).tz(userLocalTimezone);
      return $dayjs(localDateTime).locale($i18n.locale.value).format("MMMM DD, YYYY HH:mm");
    },
    toLocalRelativeTime(value: string) {
      const localDateTime = $dayjs(value).tz(userLocalTimezone);
      return $dayjs(localDateTime).locale($i18n.locale.value).fromNow();
    }
  };
}
