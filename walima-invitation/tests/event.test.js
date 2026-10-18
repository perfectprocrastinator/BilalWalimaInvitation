import test from 'node:test';
import assert from 'node:assert/strict';
import { wedding } from '../src/config/wedding.js';
import { createCalendarEvent, getMapsUrl, getTimeRemaining } from '../src/lib/event.js';

const unfold = (text) => text.replace(/\r\n[ \t]/g, '');

test('the event instant is 7 PM India time, independent of the viewer timezone', () => {
  assert.equal(new Date(wedding.dateISO).toISOString(), '2026-12-27T13:30:00.000Z');
  const calendar = unfold(createCalendarEvent(wedding, new Date('2026-10-16T10:20:30Z')));
  assert.match(calendar, /DTSTART;TZID=Asia\/Kolkata:20261227T190000\r\n/);
  assert.match(calendar, /TZID:Asia\/Kolkata\r\n/);
  assert.match(calendar, /TZOFFSETTO:\+0530\r\n/);
  assert.match(calendar, /DTSTAMP:20261016T102030Z\r\n/);
  assert.doesNotMatch(calendar, /(?:^|\r\n)(?:DTEND|DURATION)[;:]/);
});

test('calendar contains the exact names, location, stable identifier, and valid CRLF', () => {
  const first = createCalendarEvent(wedding, new Date('2026-10-16T10:00:00Z'));
  const second = createCalendarEvent(wedding, new Date('2026-10-17T10:00:00Z'));
  const content = unfold(first);
  assert.match(content, /SUMMARY:Bilal Ahmad & Imama ALI — Walima\r\n/);
  assert.ok(content.includes('LOCATION:Kalyan Mandap\\, Vikas Nagar\\, Lucknow\r\n'));
  assert.equal(content.match(/UID:.+/)[0], unfold(second).match(/UID:.+/)[0]);
  assert.equal(first.replace(/\r\n/g, '').includes('\n'), false);
  assert.ok(first.endsWith('END:VCALENDAR\r\n'));
});

test('calendar escapes punctuation and newlines and folds multibyte content without corrupting it', () => {
  const message = `${'بركة '.repeat(35)}A,B;C\\D\nNext line`;
  const customized = { ...wedding, copy: { ...wedding.copy, message } };
  const calendar = createCalendarEvent(customized);
  const encoder = new TextEncoder();
  for (const line of calendar.split('\r\n')) {
    assert.ok(encoder.encode(line).length <= 75, `Oversized content line: ${line}`);
  }
  const content = unfold(calendar);
  assert.ok(content.includes('بركة '.repeat(35)));
  assert.ok(content.includes('A\\,B\\;C\\\\D\\nNext line'));
  assert.equal(content.includes('\uFFFD'), false);
});

test('directions and calendar use the exact venue link supplied by the couple', () => {
  assert.equal(getMapsUrl(), 'https://maps.app.goo.gl/RUKYfvfYy68rrPFH7');
  assert.ok(unfold(createCalendarEvent()).includes('URL:https://maps.app.goo.gl/RUKYfvfYy68rrPFH7\r\n'));
});

test('directions falls back to the full venue search when no exact map link is configured', () => {
  const url = new URL(getMapsUrl({ ...wedding, venue: { ...wedding.venue, mapsUrl: '' } }));
  assert.equal(url.origin, 'https://www.google.com');
  assert.equal(url.pathname, '/maps/search/');
  assert.equal(url.searchParams.get('api'), '1');
  assert.equal(url.searchParams.get('query'), 'Kalyan Mandap, Vikas Nagar, Lucknow');
  assert.deepEqual([...url.searchParams.keys()], ['api', 'query']);
});

test('countdown separates days, hours, minutes, and seconds at the correct instant', () => {
  const remaining = getTimeRemaining(wedding.dateISO, Date.parse('2026-12-25T10:25:54Z'));
  assert.deepEqual(remaining, {
    days: 2, hours: 3, minutes: 4, seconds: 6,
    totalMilliseconds: 183846000,
    hasStarted: false,
  });
});

test('countdown changes state at the event start and never shows negative time', () => {
  const start = Date.parse(wedding.dateISO);
  assert.equal(getTimeRemaining(wedding.dateISO, start - 1).hasStarted, false);
  for (const instant of [start, start + 1, start + 86400000]) {
    assert.deepEqual(getTimeRemaining(wedding.dateISO, instant), {
      days: 0, hours: 0, minutes: 0, seconds: 0,
      totalMilliseconds: 0,
      hasStarted: true,
    });
  }
});

test('invalid countdown dates fail clearly rather than displaying NaN', () => {
  assert.throws(() => getTimeRemaining('invalid date'), RangeError);
  assert.throws(() => getTimeRemaining(wedding.dateISO, NaN), RangeError);
});
