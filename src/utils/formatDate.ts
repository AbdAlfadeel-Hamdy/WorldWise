const formatDate = (date: string, weekday = true) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: weekday ? 'long' : undefined,
  }).format(new Date(date));

export default formatDate;
