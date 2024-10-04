const prompt = require('prompt-sync')();

const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const Customer = require('./models/customer');


//---------------------------------------------------------------------------------

const connect = async() => {

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('\nWelcome to your CRM');
    
    await runQueries();
}

connect();

const runQueries = async() => {
  
    const choice = await userChoice();
    
    if (choice==='1') {
        await createCustomer();
    } else if (choice==='2') {
        await viewCustomers();
    } else if (choice==='3') {
        await updateCustomer();
    } else if (choice==='4') {
        await deleteCustomer();
    } else if (choice==='5') {
        console.log('\n');
        console.log('exiting...');
        await mongoose.connection.close();
        console.log('\n');
        console.log('Disconnected from MongoDB');
        process.exit();
    }
}

const userChoice = () => {
    console.log('\nWhat would you like to do?\n\n  1.  Create a customer\n  2.  View all customers\n  3.  Update a customer\n  4.  Delete a customer\n  5.  quit\n\n')
    const choice = prompt('Number of action to run: ');
    return choice;
}

const createCustomer = async() => {

    console.log('\n');
    const customerName = prompt('Enter Customer name ');
    console.log('\n');
    const customerAge = prompt('Enter Customer age ');
    console.log('\n');
    
    const customerData = {
        name: `${customerName}`,
        age: `${customerAge}`
    };

    const customer = await Customer.create(customerData);

    console.log('Customer created', customer);

    await runQueries();
};

const viewCustomers = async() => {

    const customers = await Customer.find({});

    console.log('\nBelow is a list of customers:\n');

    customers.forEach((customer) => {
        console.log(`id: ${customer.id} -- Name: ${customer.name}, Age: ${customer.age}`);     
    });

    console.log('\n');
      await runQueries();
}

const updateCustomer = async() => {

    const customers = await Customer.find({});

    console.log('\nBelow is a list of customers:\n');

    customers.forEach((customer) => {
        console.log(`id: ${customer.id} -- Name: ${customer.name}, Age: ${customer.age}`);     
    });

    console.log('\n');
    const customerId = prompt('Copy and paste the id of the customer you would like to update here:');
    console.log('\n');
    const customerName = prompt('What is the customers new name?');
    console.log('\n');
    const customerAge = prompt('What is the customers new age?');
    console.log('\n');

    const updatedCustomer = await Customer.findByIdAndUpdate(
        customerId,
        {name: `${customerName}`,
        age: `${customerAge}`},
        {new: true}
    );
    
    console.log('Updated customer:', updatedCustomer);

    await runQueries();
};

const deleteCustomer = async() => {

    const customers = await Customer.find({});

    console.log('\nBelow is a list of customers:\n');

    customers.forEach((customer) => {
        console.log(`id: ${customer.id} -- Name: ${customer.name}, Age: ${customer.age}`);     
    });

    console.log('\n');
    const customerId = prompt('Copy and paste the id of the customer you would like to delete here:');
    console.log('\n');

    const removedCustomer = await Customer.findByIdAndDelete(customerId);

    console.log('Deleted customer:', removedCustomer);

    await runQueries();
}











