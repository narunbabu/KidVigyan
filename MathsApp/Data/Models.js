export const user = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  name: 'TEXT NOT NULL UNIQUE',
  dob: 'TEXT',
  sclass: 'TEXT',
  dor: 'TEXT',
  coins: 'INTEGER',
  ischild: 'BOOLEAN',
  last_accessed: 'BOOLEAN',
};
export const stack = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  user_id: 'INTEGER',
  operation_id: 'INTEGER',
  date: 'TEXT',
  level: 'INTEGER',
  parent_id: 'INTEGER',
  num_problems: 'INTEGER',
};
export const child_stack = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  stack_id: 'INTEGER',
  child_id: 'INTEGER',
  date: 'TEXT',
};
export const score = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  child_id: 'INTEGER',
  subject_id: 'INTEGER',
  operation_id: 'INTEGER',
  level: 'INTEGER',
  date: 'TEXT',
  time_taken: 'INTEGER',
  mistypes: 'INTEGER',
  passed: 'BOOLEAN',
  points: 'INTEGER',
};

export const subjects_operations = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  subject_id: 'INTEGER',
  subject_name: 'TEXT',
  operation_id: 'INTEGER',
  operation_name: 'TEXT',
  operation_symbol: 'TEXT',
  date: 'TEXT',
};
export const progress = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  child_id: 'INTEGER',
  date: 'TEXT',
  gold_coins: 'INTEGER',
  gold_stars: 'INTEGER',
};
export const models = {
  Users: user,
  Stack: stack,
  ChildStack: child_stack,
  Score: score,
  Progress: progress,
  Subjects_Operations: subjects_operations,
};
