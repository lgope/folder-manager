const data = {
  id: "001",
  type: "A",
  value: "aaaaa",
  "data:": {},
  children: [
    { id: "002", type: "A", value: "aaaaa", "data:": {}, children: [] },
    {
      id: "003",
      type: "A",
      value: "aaaaa",
      "data:": {},
      children: [{ id: "00001", type: "B", children: [] }],
    },
    {
      id: "004",
      type: "A",
      value: "aaaaa",
      "data:": {},
      children: [
        { id: "005", type: "A", value: "aaaaa", "data:": {}, children: [] },
        {
          id: "005",
          type: "A",
          value: "aaaaa",
          "data:": {},
          children: [{ id: "00002", type: "B", children: [] }],
        },
      ],
    },
    { id: "00003", type: "B", children: [] },
  ],
};

const result = _.cloneDeepWith(data, (value) => {
  const newObj = {
    id: "002",
    type: "A",
    value: "---NEW VALUE FOR 'B' TYPE---",
    "data:": {},
  };
  return value.type === "B" ? { ...value, ...newObj } : _.noop();
});

console.dir(result, { depth: null });
