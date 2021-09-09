s = [
  {
    date: '2021-09-05T21:00:27.452Z',
    id: 1,
    level: 1,
    num_problems: 20,
    operation_id: 0,
    parent_id: 0,
    stack_id: 0,
  },
  {
    date: '2021-09-05T21:00:27.452Z',
    id: 2,
    level: 1,
    num_problems: 20,
    operation_id: 1,
    parent_id: 0,
    stack_id: 0,
  },
  {
    date: '2021-09-05T21:00:27.452Z',
    id: 3,
    level: 1,
    num_problems: 20,
    operation_id: 2,
    parent_id: 0,
    stack_id: 0,
  },
];
operations = [
  {name: 'Addition', operator: '+', id: 0},
  {name: 'Subtraction', operator: '−', id: 1},
  {name: 'Multiplication', operator: '×', id: 2},
];

m = () => {
  var myoperations = [];
  s.map(k => {
    var obj = operations.filter(o => o.id == k.operation_id)[0];
    ['level', 'num_problems'].map(key => {
      obj[key] = k[key];
    });
    myoperations.push(obj);
  });

  console.log(myoperations);
};
m();
