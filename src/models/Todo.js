import { isSameDay, isSameWeek, endOfWeek, isAfter, parseISO } from 'date-fns';

const date = string => {
  const date = parseISO(string);
  if (date.toString() !== 'Invalid Date') return date;
  return new Date();
};

export default class Todo {
  constructor({
    title,
    description,
    project,
    priority,
    dueDate,
    checked = false,
  }) {
    this.title = title;
    this.priority = priority;
    this.project = project;
    this.description = description;
    this.checked = checked;
    this.dueDate = date(dueDate);
  }

  getInterval() {
    if (isSameDay(this.dueDate, new Date())) return 'today';
    if (isSameWeek(this.dueDate, new Date())) return 'this week';
    if (isAfter(this.dueDate, endOfWeek(new Date()))) return 'upcoming';
    return 'past';
  }
}
