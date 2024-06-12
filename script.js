import fetch from "node-fetch";

const generateCustomerData = () => {
  const customers = [];
  for (let i = 1; i <= 20; i++) {
    customers.push({
      email: `customer${i}@example.com`,
      Name: `Customer${i}`,
      Age: (20 + i).toString(),
      Visit: `2024-06-${i < 10 ? '0' : ''}${i}`,
      BilledAmount: (Math.floor(Math.random() * (15000 - 8000 + 1)) + 8000).toString(),
      NumberOfVisit: (Math.floor(Math.random() * 3) + 1).toString(), // Range from 1 to 3
    });
  }
  return customers;
};

const ingestData = async (customers) => {
  for (const customer of customers) {
    try {
      const response = await fetch('http://localhost:3000/api/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Customer created:', data);
      } else {
        // Attempt to parse the error response as JSON
        try {
          const errorJson = await response.json();
          console.error(`Failed to create customer: ${response.status} ${response.statusText} - ${JSON.stringify(errorJson)}`);
        } catch (jsonError) {
          // Fallback to text if JSON parsing fails
          const errorText = await response.text();
          console.error(`Failed to create customer: ${response.status} ${response.statusText} - ${errorText}`);
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
};

const customers = generateCustomerData();
ingestData(customers);
