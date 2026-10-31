interface ActivityResponse {
  activity: string;
  type: string;
  participants: number;
  price: number;
}

// Example of using the interface:
const sampleData: ActivityResponse = {
  activity: "Learn a new TypeScript feature",
  type: "education",
  participants: 1,
  price: 0
};

console.log(sampleData.activity);