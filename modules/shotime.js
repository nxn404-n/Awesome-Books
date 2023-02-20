/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
export const showTime = document.querySelector('.showTime');

export function currentTime() {
  const dateTime = luxon.DateTime.local();
  return showTime.innerHTML = dateTime.toFormat('MMMM d, yyyy - hh:mm:ss a');
}