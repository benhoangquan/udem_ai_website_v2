"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTranslations } from "next-intl";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// Mock Data replaced by internal component logic for translations
// const events = [];

const EventsCalendar: React.FC = () => {
  const [value, onChange] = useState<Value>(new Date());
  // const t = useTranslations("events"); // Would ideally use translations
  const t = useTranslations("events");

  // Dynamic mock data for Weekly Meetings (Fridays)
  // Current date is Jan 2026, so listing upcoming Fridays
  const events = [
    {
      date: new Date(2026, 0, 23), // Friday Jan 23, 2026
      title: t("meeting"),
      location: t("location"),
    },
    {
      date: new Date(2026, 0, 30), // Friday Jan 30, 2026
      title: t("meeting"),
      location: t("location"),
    },
    {
      date: new Date(2026, 1, 6), // Friday Feb 6, 2026
      title: t("meeting"),
      location: t("location"),
    },
  ];

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        // event.date.getMonth() === date.getMonth() &&
        // event.date.getFullYear() === date.getFullYear(),
        // Simple simplified check for recurring concept or exact match
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    );
  };

  return (
    <div className="bg-cream py-16 text-seth-coral">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl font-bold mb-8">{t("title")}</h2>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-lg">
            <Calendar
              onChange={onChange}
              value={value}
              className="w-full border-none font-sans text-seth-coral"
              tileClassName={({ date, view }) => {
                const hasEvent = getEventsForDate(date).length > 0;
                return hasEvent ? "event-tile" : "";
              }}
            />
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">
              Events for {(value as Date).toLocaleDateString()}
            </h3>

            <div className="space-y-4">
              {getEventsForDate(value as Date).length > 0 ? (
                getEventsForDate(value as Date).map((event, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-seth-coral pl-4 py-2"
                  >
                    <p className="font-bold text-xl">{event.title}</p>
                    <p className="text-gray-600">{event.location}</p>
                    <p className="text-sm text-gray-500">
                      {event.date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">{t("noEvents")}</p>
              )}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-2">{t("allEvents")}</h3>
              <ul className="list-disc pl-5">
                {events.map((event, idx) => (
                  <li key={idx} className="mb-1">
                    <span className="font-semibold">
                      {event.date.toLocaleDateString()}
                    </span>{" "}
                    - {event.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsCalendar;
