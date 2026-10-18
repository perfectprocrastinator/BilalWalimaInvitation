import { wedding } from '../config/wedding.js';

export function getMapsUrl(config = wedding) {
  if (config.venue.mapsUrl) return config.venue.mapsUrl;
  const url = new URL('https://www.google.com/maps/search/');
  url.searchParams.set('api', '1');
  url.searchParams.set('query', config.venue.fullAddress);
  return url.toString();
}

export function getTimeRemaining(targetISO, nowMs = Date.now()) {
  const targetMs = new Date(targetISO).getTime();
  if (!Number.isFinite(targetMs) || !Number.isFinite(nowMs)) {
    throw new RangeError('The countdown requires valid event and current dates.');
  }
  const totalMilliseconds = Math.max(0, targetMs - nowMs);
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    totalMilliseconds,
    hasStarted: nowMs >= targetMs,
  };
}

function escapeCalendarText(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
}

// RFC 5545 limits physical content lines to 75 UTF-8 octets, not characters.
function foldCalendarLine(line) {
  const encoder = new TextEncoder();
  let result = '';
  let byteLength = 0;
  for (const character of line) {
    const characterLength = encoder.encode(character).length;
    if (byteLength + characterLength > 75) {
      result += '\r\n ';
      byteLength = 1;
    }
    result += character;
    byteLength += characterLength;
  }
  return result;
}

function localCalendarDate(date, timezone) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(date).map(({ type, value }) => [type, value]),
  );
  return `${parts.year}${parts.month}${parts.day}T${parts.hour}${parts.minute}${parts.second}`;
}

export function createCalendarEvent(config = wedding, now = new Date()) {
  const start = new Date(config.dateISO);
  const timestamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const description = `${config.copy.message}\n\n${config.dateLabel} · ${config.timeLabel}\n${config.venue.fullAddress}`;
  // India observes the same UTC offset all year; this explicit timezone block
  // keeps 7 PM IST intact when the file is opened in a different local timezone.
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Moonlit Courtyard//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    `X-WR-TIMEZONE:${config.timezone}`,
    'BEGIN:VTIMEZONE',
    `TZID:${config.timezone}`,
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    `TZOFFSETFROM:${config.timezoneOffset}`,
    `TZOFFSETTO:${config.timezoneOffset}`,
    `TZNAME:${config.timezoneAbbreviation}`,
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${escapeCalendarText(config.calendarUid)}`,
    `DTSTAMP:${timestamp}`,
    `DTSTART;TZID=${config.timezone}:${localCalendarDate(start, config.timezone)}`,
    `SUMMARY:${escapeCalendarText(`${config.groom} & ${config.bride} — ${config.occasion}`)}`,
    `LOCATION:${escapeCalendarText(config.venue.fullAddress)}`,
    `DESCRIPTION:${escapeCalendarText(description)}`,
    `URL:${getMapsUrl(config)}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  // No DTEND or DURATION: an end time was not supplied by the couple.
  return `${lines.map(foldCalendarLine).join('\r\n')}\r\n`;
}

export function downloadCalendar(config = wedding) {
  const file = new Blob([createCalendarEvent(config)], {
    type: 'text/calendar;charset=utf-8',
  });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = config.calendarFileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Give mobile browsers time to begin handling the file before releasing it.
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
